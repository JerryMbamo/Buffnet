const express = require('express');
const router = express.Router();
const authMiddleWare = require('../Middleware/auth'); 
const reviewController = require('../Controllers/ReviewController'); 

router.post('/create', authMiddleWare.authJwt, reviewController.createReview); 
router.get('/getUserReviews', authMiddleWare.authJwt, reviewController.getUserReviews); 
router.get('/getReviews', authMiddleWare.authJwt, reviewController.getReviews); 


module.exports = router;