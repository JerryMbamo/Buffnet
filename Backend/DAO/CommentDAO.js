const Comment = require('../Models/Comment');

exports.db = {
    findCommentsFromReview: async reviewID => Comment.find({reviewID})
} 

exports.create = async(comment) => {
    try {
        const newComment = new Comment(comment);
        return await newComment.save();  
    } catch (error) {
        console.log(error)
        throw Error('Error in creating comment'); 
    }
}
