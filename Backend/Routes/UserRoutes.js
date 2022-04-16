
const express = require('express');
const passport = require('passport');
const router = express.Router();
const PPStrategy = require('../Middleware/passport.js')
PPStrategy(passport);
const userController = require('../Controllers/UserController');
const authMiddleWare = require('../Middleware/auth'); 
const multer = require('multer'); 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/signup', upload.single('profileImage'),userController.signup);
router.get('/checkUsernameEmail/:username/:email', userController.checkUsernameEmail);
router.get('/login/:emailOrUsername/:password', userController.login);
router.get('/logout', userController.logout);
router.get('/getUser', authMiddleWare.authJwt ,userController.retrieveUser); 
router.get('/getRecommendations', authMiddleWare.authJwt, userController.getRecommendations); 
router.get('/recordMovie/:movieID', authMiddleWare.authJwt, userController.recordMovieInterest); 
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/signup' }),
    (req, res) => {
        res.redirect('http://localhost:3000/login');
    }

);

module.exports = router;


