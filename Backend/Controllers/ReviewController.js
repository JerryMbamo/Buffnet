const ReviewDAO = require('../DAO/ReviewDAO');
const UserDAO = require('../DAO/UserDAO'); 
const axios = require('axios');

exports.createReview = async(req, res) => {

    try {
        const {
            movieID, 
            text, 
            rating 
        } = req.body;
         
        const review = {
            movieID, 
            userID: req.userID, 
            text, 
            rating,
        }
     
        await ReviewDAO.create(review);
        return res.status(201).send({success: true}); 
        
    } catch (error) {
        console.log(error); 
        res.status(500).send({success: false});    
    }
}

exports.getUserReviews = async(req, res) => {
    try {
        const id = req.userID; 
        const reviews = await ReviewDAO.db.findReviewsFromUser(id)
        return res.status(200).send({success: true, reviews}); 
    } catch (error) {
        return res.status(500).send({success: false}); 
    }
}

exports.getReviews = async(req, res) => {
    try {
        const id = req.userID; 
        const results = await ReviewDAO.db.getAllReviews(); 
        const reviews = []; 
        for(let a = 0; a < results.length; a++){
            const {userID} = results[a]; 
            if(id !== userID){
                const {_id,movieID, rating, text} = results[a]; 
                const {username} = await UserDAO.db.findUserId(userID)
                let params = new URLSearchParams({
                    api_key: process.env.TMDB_API_KEY,
                    language: 'en-US'
                }); 
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?${params}`); 
                let {id, title, poster_path, overview, release_date, genres, vote_average} = movie.data; 
                poster_path = `https://image.tmdb.org/t/p/w500${poster_path}`; 
                genreList = []; 
                genres.forEach(genre => genreList.push(genre['name']))

                const movieInfo = {
                    id,
                    title, 
                    poster_path, 
                    overview, 
                    release_date, 
                    genres: genreList,
                    vote_average 
                }

                reviews.push({reviewID: _id, movie: movieInfo,rating, text, username});
            }
        }
        return res.status(200).send({success: true, reviews});     
    } catch (error) { 
        return res.status(500).send({success: false}); 
    }
}