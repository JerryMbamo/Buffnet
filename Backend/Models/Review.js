const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    
    movieID: {
        type: Number, 
        required: true
    },

    userID: {
        type: String, 
        required: true 
    },

    text: {
        type: String, 
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

});

module.exports = Review = mongoose.model('Review', ReviewSchema); 