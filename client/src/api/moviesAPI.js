import API from "../api/baseAPI";

const moviesAPI = {
    getFeaturedMovies: async() => {
        try {
            const res = await API.get('/api/movies/getFeaturedMovies'); 
            const {success, movies} = res.data; 
            if(success)
                return movies 
            return null; 
        } catch (error) {
            return null; 
        }
    }, 
    searchMovies: async(query) => {
        try {
            const res = await API.get(`/api/movies/search/${query}`); 
            const {success, movies} = res.data; 
            if(success)
                return movies 
            return null;
        } catch (error) {
            return null; 
        }
    }
}

export default moviesAPI; 