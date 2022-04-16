require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const UserDAO = require('../DAO/UserDAO.js');
const User = require('../Models/User.js');

/* Passport Strategy for Google Authentication */
passport.serializeUser((user,done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) => done(err, user));
});


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
//opts.issuer = 'accounts.';
//opts.audience = 'buffnet.com'


/* Google Auth */
//const GoogleStrategy = require('passport-google-oauth2').Strategy;
//const GoogleStrategy = require('passport-google-oauth2').OAuth2Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;


module.exports = function (passport) {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.sub }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // could create a user
            }
        });
    }));


    // Creating new User using Google Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/user/auth/google/callback',
        },
        async(accessToken, refreshToken, profile, done)=>{
            const googleUser = {
                authID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                username: profile.emails[0].value,
                password: profile.name.familyName
            }

            try {
                // Find User that already register using google email
                let user = await UserDAO.db.findEmail(googleUser.email);
                if (user){
                    return done(null, user);
                } else {
                    // User does not exist
                    return done(null, false);
                }
            } catch (err) {
                console.error(err);
            }
            return done(null, profile);
        }
    ));

}
