const axios = require('axios');

exports.getFeaturedMovies = async (req,res) => {

    try {
        let params = new URLSearchParams({
            api_key: process.env.TMDB_API_KEY,
            language: 'en-US'
        }); 
        const genresData = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?${params}`);
        let genresMap = new Map(); 
        genresData.data.genres.forEach(item => genresMap.set(item['id'], item['name']));

        params = new URLSearchParams({
            api_key: process.env.TMDB_API_KEY,
            language: 'en-US',
            sort_by: 'popularity.desc',
            include_adult: 'false',
            include_video: 'false',
            page: '1', 
            with_watch_monetization_types: 'flatrate' 
        }); 
        const movieResults = await axios.get(`https://api.themoviedb.org/3/discover/movie?${params}`);
        let movies = []
        movieResults.data.results.forEach(
            function(item){
                let {id, title, poster_path, overview, release_date, genre_ids, vote_average} = item; 
                const genresList = [] 
                genre_ids.forEach(item => genresList.push(genresMap.get(item)));
                poster_path = `https://image.tmdb.org/t/p/w500${poster_path}`; 
                movies.push({id, title, poster_path, overview, release_date, genres: genresList, vote_average});
            }
        ); 

        return res.status(200).send({success: true, movies}); 
    } catch (error) {
        return res.status(400).send({success: false})
    }   
    
}

exports.searchMovies = async(req,res) => {
    try {

        const {searchQuery} = req.params; 

        let params = new URLSearchParams({
            api_key: process.env.TMDB_API_KEY,
            language: 'en-US'
        }); 
        const genresData = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?${params}`);
        let genresMap = new Map(); 
        genresData.data.genres.forEach(item => genresMap.set(item['id'], item['name']));

        params = new URLSearchParams({
            api_key: process.env.TMDB_API_KEY,
            language: 'en-US', 
            query: searchQuery
        }); 

        const movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?${params}`); 
        let movies = []
        movieResults.data.results.forEach(
            function(item){
                let {id, title, poster_path, overview, release_date, genre_ids, vote_average} = item; 
                const genresList = [] 
                genre_ids.forEach(item => genresList.push(genresMap.get(item)));
                poster_path = `https://image.tmdb.org/t/p/w500${poster_path}`; 
                movies.push({id, title, poster_path, overview, release_date, genres: genresList, vote_average});
            }
        ); 

        return res.status(200).send({success: true, movies});  
    } catch (error) {
        return res.status(400).send({success: false})
    }
}


/*
const axios = require('axios');

const tmdb_key = process.env.TMDB_API_KEY;
const includeAdult = false;

// Function for getting movies via search input
exports.getMoviesSearch = async (req, res) => {
    try {
        const query = req.body.query;
        let page = 1;
        let params = new URLSearchParams({
            api_key: process.env.TMDB_API_KEY,
            language: 'en-US'
        })

        let data, total_pages, total_results;
        let element = [], movies = [];

        const genresData = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?${params}`);
        let genresMap = new Map();
        genresData.data.genres.forEach(item => genresMap.set(item['id'], item['name']));

        //console.log(genresdat.data);
        do {
            let response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_key}&language=en-US&page=${page}&include_adult=${includeAdult}&query=${query}`
            );
            //let data = await response.json();
            data = response.data;
            total_pages = data.total_pages;
            total_results = data.total_results;



            if (page == total_pages) {
                for (let index = 0; index < ((total_pages * 20) - total_results); index++) {
                    element = data['results'][index];
                    const genre_list = [];
                    let genre_ids = element['genre_ids'];
                    genre_ids.forEach(element => genre_list.push(genresMap.get(element)));

                    movies.push({
                        id: element['id'], title: element['title'], poster_path: 'https://image.tmdb.org/t/p/w500' + element['poster_path'],
                        overview: element['overview'], release_date: element['release_date'], genres: genre_list
                    });
                    //console.log(element);
                }
            } else {
                for (let index = 0; index < 20; index++) {
                    element = data['results'][index];

                    const genre_list = [];
                    let genre_ids = element['genre_ids'];
                    genre_ids.forEach(element => genre_list.push(genresMap.get(element)));

                    movies.push({
                        id: element['id'], title: element['title'], poster_path: 'https://image.tmdb.org/t/p/w500' + element['poster_path'],
                        overview: element['overview'], release_date: element['release_date'], genres: genre_list
                    });
                }
            }
            page = page + 1;

        } while (page <= total_pages);


        console.log(total_pages);
        console.log(total_results);
        //console.log(movies);
        //return res.status(200).send({success: true, response: data});
        return res.status(200).send({ success: true, movies });
    } catch (error) {

    }

}
*/