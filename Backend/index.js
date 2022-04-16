require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');

const UserDAO = require('./DAO/UserDAO');
const Auth = require('./Middleware/auth');


require('./Middleware/passport')(passport);

var corsOptions = {
  origin: 'http://localhost:3000',// allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // allow session cookie from browser to pass through
}
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const apiPort = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI;

/* API Routers */
const usersRouter = require('./Routes/UserRoutes.js');
const moviesRouter = require('./Routes/MovieRoutes'); 
const reviewsRouter = require('./Routes/ReviewRoutes'); 
const commentsRouter = require('./Routes/CommentRoutes') ; 

mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

const connection = mongoose.connection;
connection.once("open", () => console.log("You are connected to MongoDB"));

// To Serve any static files and more in PRODUCTION mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  })
}

// Setting up session for Google login
app.set('view engine', 'ejs');
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'SEC/%movie@lover}',
  cookie: {maxAge: 6000}
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// Import routes
app.use('/api/user', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);  
app.use('/api/comments', commentsRouter);

// Verify that user is authenticated
const authCheck = (req, res, next) => {
  if (!req.user) {
      console.log('user has not been authenticated');
      res.status(401).json({
          authenticated: false,
          message: "user has not been authenticated"
      });
  } else {
      next();
  }
};


// If user is authenticated create a token and return to app
app.get("/auth/user", authCheck, async (req, res) => {
  const user = await UserDAO.db.findUserId(req.user._id);
  console.log(user);
  if (user) {
      const token = await Auth.getToken(user);
      console.log(token);
      res.status(200).send({
          success: true,
          token: token,
      })
  } else{
    res.status(200).send({
      success: false,
      message: "Please Signup with Google"
    })
  }

});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));