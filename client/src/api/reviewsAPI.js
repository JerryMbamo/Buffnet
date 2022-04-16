import API from "../api/baseAPI";

const reviewsAPI = {
    createReview: async(movieID, text, rating) => {
        try {
            const bearerToken = localStorage.getItem('token'); 
            const res = await API.post('/api/reviews/create', {movieID, text, rating} ,{
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            });
            const {success} = res.data;
            if(success)
                return true; 
            return false;  
        } catch (error) {
            console.log(error); 
            return false; 
        }
    },
    getReviews: async() => {
        try {
            const bearerToken = localStorage.getItem('token'); 
            const res = await API.get('/api/reviews/getReviews',{
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            }); 
            const {success} = res.data;
            if(success)
                return res.data.reviews
            else 
                return null; 
        } catch (error) {
            return null; 
        }
    }

}

export default reviewsAPI; 