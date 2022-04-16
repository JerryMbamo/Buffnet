const UserDAO = require('../DAO/UserDAO.js');
const bcrypt = require('bcryptjs');
const Auth = require('../Middleware/auth.js');
const storage = require('../firebaseConfig'); 
const { ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
/* Connecting to User Data Access Object (DAO) to Register User */

const getRandomValue = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const parseDate = (date) => {
    const months = ["January", "February", "March", 
            "April", "May", "June", 
            "July", "August", "September", 
            "October", "November", "December"];
    const dateObj = new Date(date); 
    const month =  months[dateObj.getMonth()];
    const day = dateObj.getDay().toString();
    const year = dateObj.getFullYear().toString();
    return [month, day, year]; 
}

exports.signup = async(req, res)=>{
    try {
        const {
            firstName, 
            lastName, 
            username, 
            email, 
            password, 
            profileBio, 
            birthday, 
            favMovie,
            genres} = req.body;
        const file = req.file;

        const memberSince = new Date();

        const fileName = `${new Date().getTime()}_${username}_${uuidv4()}.jpg`;
        const storageRef = ref(
            storage, 
            `/images/profilePictures/${fileName}`
        ); 
        const uploadTask = await uploadBytesResumable(storageRef, file.buffer);
        const profileImageURL = await getDownloadURL(uploadTask.ref); 
        const user = {
            firstName, 
            lastName, 
            email, 
            username, 
            password,
            profileBio,
            birthday,
            favMovie,
            genres: genres.split(','),
            memberSince,
            profileImageURL,
            moviesSeen: []
        };
        const newUser = await UserDAO.create(user);
        const token = await Auth.getToken(newUser);
        res.status(201).json({success: true, token});
    } catch (error) {
        const {emailExists, usernameExists, userCreationErr} = error.cause;
        
        res.status(500).json(
            {success: false, 
             emailExists,
             usernameExists,
             userCreationErr,
             token: null,
            }
        );
    }
}

exports.checkUsernameEmail = async(req,res) => {
    try {
        const {username, email} = req.params; 
        const usernameExists = await UserDAO.db.findUsername(username) !== null;
        const emailExists = await UserDAO.db.findEmail(email) !== null; 
        const usernameEmailIntersect = await UserDAO.db.findEmail(username) !== null;
        const emailUsernameIntersect = await UserDAO.db.findUsername(email) !== null;  
            
        res.status(200).json(
            {
                success: true, 
                emailExists,
                usernameExists,
                intersectExists: usernameEmailIntersect || emailUsernameIntersect
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false, 
                emailExists: false, 
                usernameExists: false,  
                intersectExists: false
            }
        );
    }
}

exports.login = async(req, res) => {
    try {
        const {emailOrUsername, password} = req.params;
        var user = await UserDAO.db.findUsername(emailOrUsername);
        if(!user) 
            user = await UserDAO.db.findEmail(emailOrUsername); 
        if(user){
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){
                const token = await Auth.getToken(user); 
                return res.status(200).send({
                    success: true,
                    token
                });
            }  
        }
        return res.status(404).send({success:false, token: null});
    } catch (error) {
        return res.status(500).send({success:false, token: null})
    }
};

exports.retrieveUser = async(req,res) => { 
    try {
        const user = await UserDAO.db.findUserId(req.userID); 
        if (user) { 
            let {
                firstName, 
                lastName,
                email, 
                username, 
                profileBio, 
                birthday, 
                favMovie, 
                genres, 
                memberSince,
                profileImageURL,
                moviesSeen
            } = user;
            memberSince = parseDate(memberSince); 
            birthday = parseDate(birthday); 
            
            return res.status(200).send({ 
                success: true,  
                user: {
                    firstName, 
                    lastName,
                    email, 
                    username, 
                    profileBio, 
                    birthday, 
                    favMovie, 
                    genres, 
                    memberSince,
                    profileImageURL,
                    moviesSeen
                }
            }); 
        }  
        return res.status(404).send({success: false, user: null});
    } catch (error) {
        return res.status(400).send({success: false, user: null}); 
    }
}

exports.getRecommendations = async(req,res) => {
    try {
        const user = await UserDAO.db.findUserId(req.userID);
        const {moviesSeen} = user; 

        if(moviesSeen.length === 0){
            const {genres} = user; 
            genre = getRandomValue(genres); 
            genreNumber = null; 
            let params = new URLSearchParams({
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US'
            }); 
            const genresData = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?${params}`);
            let genresMap = new Map(); 
            genresData.data.genres.forEach(item => genresMap.set(item['id'], item['name']));  
            
            genresData.data.genres.forEach(
                function(item){
                    if(item['name'] == genre)
                        genreNumber = item['id']
                }
            ); 
            params = new URLSearchParams({
                api_key: process.env.TMDB_API_KEY,
                with_genres: `${genreNumber}`
            });
            const movieResults = await axios.get(`https://api.themoviedb.org/3/discover/movie?${params}`); 
            let movies = [] 

            movieResults.data.results.forEach(
                function(item){
                    let {id, title, poster_path, overview, release_date, genre_ids} = item; 
                    const genresList = [] 
                    genre_ids.forEach(item => genresList.push(genresMap.get(item)));
                    poster_path = `https://image.tmdb.org/t/p/w500${poster_path}`; 
                    movies.push({id, title, poster_path, overview, release_date, genres: genresList}); 
                }
            );
            const result = { success: true, movies} 
            return res.status(200).send(result); 
        }
        const movieID = getRandomValue(moviesSeen); 
        const recommendations = await axios.post(`http://mlbackend:5000/queryModel`, {movieID}); 
        const movieIDs = recommendations.data.movieRecommendations; 
        const movies = []; 
        params = new URLSearchParams({
            api_key: process.env.TMDB_API_KEY,
        }); 
        for(let a = 0; a < movieIDs.length; a++){
            const item  = movieIDs[a]; 
            const movie = await axios.get(`https://api.themoviedb.org/3/movie/${item}?`+params); 
            let {id, title, poster_path, overview, release_date, genres, vote_average} = movie.data; 
            poster_path = 'https://image.tmdb.org/t/p/w500' + poster_path;
            const genresList = [] 
            genres.forEach(item => genresList.push(item['name'])); 
            movies.push({id, title, poster_path, overview, release_date, genres: genresList, vote_average}); 
        }
        return res.status(200).send({ success: true, movies});
    } catch (error) {
        console.log(error);
        return res.status(400).send({success: false});
    }
    
}

exports.recordMovieInterest = async(req,res) => {
    try {
        const maxMovieSeenLen = 30; 
        const user = await UserDAO.db.findUserId(req.userID);
        let {moviesSeen} = user; 
        const {movieID} = req.params; 
        for(let a = 0; a < moviesSeen.length; a++){
            if(moviesSeen[a] === parseInt(movieID)){
                return res.status(200).send({success: true, duplicateExists: true}); 
            }
        }
        if(moviesSeen.length < maxMovieSeenLen){
            moviesSeen.push(parseInt(movieID)); 
            await user.set({moviesSeen}); 
            await user.save(); 
            return res.status(200).send({success: true})
        } 
        else if(moviesSeen.length === maxMovieSeenLen){
            moviesSeen.push(parseInt(movieID));
            moviesSeen.shift(); 
            await user.set({moviesSeen}); 
            await user.save(); 
            return res.status(200).send({success: true}); 
        }
        return res.status(400).send({success: false}); 
    } catch (error) {
        return res.status(400).send({success: false}); 
    }
}

// Logout
exports.logout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
};