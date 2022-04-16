const CommentDAO = require('../DAO/CommentDAO');
const UserDAO = require('../DAO/UserDAO'); 

exports.createComment = async(req, res) => {
    try {
        const {reviewID, text} = req.body; 
        const comment = {
            reviewID,
            text,
            userID: req.userID
        }
        await CommentDAO.create(comment); 
        const user = await UserDAO.db.findUserId(req.userID);
        const {username, profileImageURL} = user; 
        return res.status(201).send({success: true, comment: {username, profileImageURL, text, userID: req.userID}}); 
    } catch (error) {
        console.log(error); 
        return res.status(500).send({success: false});  
    }
} 

exports.getReviewComments = async(req,  res) => {
    try {
        const {reviewID} = req.params; 
        const results = await CommentDAO.db.findCommentsFromReview(reviewID);
        const comments = [];
        for(let a = 0; a < results.length; a++){
            const {_id, userID, text} = results[a]; 
            const user = await UserDAO.db.findUserId(userID); 
            const {profileImageURL, username} = user;
            const comment = {_id, text, profileImageURL, userID, username}
            comments.push(comment); 
        }
        return res.status(200).send({success: true, comments}); 
    } catch (error) {
        return res.status(400).send({success: false}); 
    }
}
