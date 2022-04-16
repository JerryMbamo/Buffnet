const express = require('express');
const router = express.Router();
const movieController = require('../Controllers/MovieController'); 

router.get('/getFeaturedMovies', movieController.getFeaturedMovies); 
router.get('/search/:searchQuery', movieController.searchMovies); 

module.exports = router;