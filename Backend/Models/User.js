const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    /* User information for signup */
    authID:{
        type: String,
    },

    firstName:{
        type: String,
        required: 'Please enter your first name!'
    },

    lastName:{
        type: String,
        required: 'Please enter your last name!'
    },

    email:{
        type: String,
        required: 'Please enter your email!',
        trim: true,
        unique: true
    },

    username:{
        type: String,
        required: 'Please enter a username',
        trim: true,
        unique: true
    },

    password:{
        type: String,
        required: 'Please enter your password'
    },
    profileBio:{
        type: String,
        required: 'Please tell us something about you!'
    },
    birthday:{
        type: Date,
        required: 'Please enter your birthday!'
    },
    favMovie:{
        type: String,
        required: 'Please tell us something about you!'
    },
    genres: [{
        type: String
    }],
    memberSince: {
        type: Date, 
        required: 'Date you joined this site has to be included'
    },
    profileImageURL: {
        type: String, 
        required: 'Please enter a profile image'
    },
    moviesSeen: Array
});

// Removing refresh Token from response to client
UserSchema.set('toJson', {
    transform: function(doc, ret, options){
        delete ret.refreshToken;
        return ret;
    },
});

module.exports = User = mongoose.model("User", UserSchema);