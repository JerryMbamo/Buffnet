const Review = require('../Models/Review');

exports.db = {
    findReviewsFromUser: async userID => Review.find({userID}),
    getAllReviews: async() => Review.find(),
}

exports.create = async(review) => {
    try {
        const newReview = new Review(review); 
        return await newReview.save();  
    } catch (error) {
        throw Error('Error with creating review');    
    }
};