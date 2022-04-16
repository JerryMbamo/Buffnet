const jwt = require("jsonwebtoken");
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config;

// DIff
const authJwt = (req, res, next) =>{
    
    try {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1]; 
            const payload = jwt.verify(bearerToken, process.env.JWT_SECRET); 
            req.userID = payload.id; 
            next();
            return;  
        }
        else{
            return res.status(403).send('Access Denied');
        }
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
    next();
};


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
//opts.issuer = 'accounts.';
//opts.audience = 'buffnet.com'




const getToken = async(user) => {
    return await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
const getRefreshToken = async(user) =>{
    return await jwt.sign({id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}


//module.exports = authJwt;
module.exports = {
    authJwt,
    getToken,
    getRefreshToken,  
};