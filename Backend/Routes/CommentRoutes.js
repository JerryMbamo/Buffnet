const express = require('express');
const router = express.Router();
const authMiddleWare = require('../Middleware/auth');
const commentController = require('../Controllers/CommentController');  

router.post('/create', authMiddleWare.authJwt, commentController.createComment);
router.get('/getReviewComments/:reviewID', authMiddleWare.authJwt, commentController.getReviewComments);
     

module.exports = router; 