import API from "../api/baseAPI";

const commentsAPI = {
    createComment: async(reviewID, text)=> {
         try {
            const bearerToken = localStorage.getItem('token');
            const res = await API.post('/api/comments/create', {reviewID, text}, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            }); 
            const {success} = res.data; 
            if(success)
                return res.data.comment; 
            return null; 
         } catch (error) {
             return null; 
         }
    },
    getComments: async(reviewID)=> {
        try {
            const bearerToken = localStorage.getItem('token'); 
            const res = await API.get(`/api/comments/getReviewComments/${reviewID}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            });
            const {success} = res.data; 
            if(success)
                return res.data.comments;
            return null; 
        } catch (error) {
            return null; 
        }
    }
}

export default commentsAPI; 