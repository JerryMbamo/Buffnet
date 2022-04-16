/*
    User Data Access Object Operations
    It operates as the database management
    
*/
const User = require('../Models/User.js');
const bcrypt = require('bcryptjs');

/* Hashing password to be saved in database */
const Hashing = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// db access the database function when perform in other apis
exports.db = {
    findUserId: async id => User.findById(id),
    findUserAuthID: async authID => User.findOne({ authID }),
    findEmail: async email => User.findOne({ email }),
    findUsername: async username => User.findOne({ username }),
    userUpdate: async id => User.findOneAndUpdate(id)
}

/* Creating new User in Data Access Object */
exports.create = async(user)=>{

    try {
        let emailExists = await User.findOne({email:user.email}) !== null;
        let usernameExists = await User.findOne({username:user.username}) !== null;
        if(emailExists || usernameExists)
            throw Error('Duplicate email/username', {cause: {emailExists, usernameExists}});
        user.password = await Hashing(user.password);
        const newUser = new User(user);
        return await newUser.save();
    } catch (error) {
        const {emailExists, usernameExists} = error.cause; 
        if(emailExists || usernameExists)
            throw Error(error.mesage, {cause: {emailExists, usernameExists, userCreationErr: false}}); 
        
        throw Error('Error with creating user', {cause: {emailExists, usernameExists, userCreationErr: true }});
    }
    
};

/* Updating Existing User info in database */
exports.update = async (user) => {
    //User.findOneAndUpdate({})
}


/* Deleting Existing User in database  */
exports.remove = async(user) =>{
    //let user = req.body;
    User.findOneAndRemove({user, function(err, user) {
        if (err){
            res.status(400).send('error: User could not be removed.')
        } else{
            res.send(user);
        }
    }});
};