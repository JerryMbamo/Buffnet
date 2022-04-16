# Backend Dev Practices

**Please read the following to understand file structure and development practices for the Backend or just as a reference tool**

## Intro

You will notice that this folder has the following folder structure. We will maintain this folder structure for the length of this project. If we need functionality that surpasses these folders then we will add more folders. But these are the most essential base folders for this project. The files inside the Controllers, DAO, Models, and Routes directories are for demonstration purposes.

```

.

├── Controllers
│ ├── UserController.js
│ └── EventController.js
├── DAO
│ ├── UserDAO.js
│ └── EventDAO.js
├── Models
│ ├── User.js
│ └── Event.js
├── Routes
│ ├── UserRoutes.js
│ └── EventRoutes.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── index.js
├── package-lock.json
├── package.json
└── README.md

```

## How To Create A Model

1. We navigate to the models folder

2. We create a file called User.js and add the following code inside

```

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    name: {

        type: String,

        required: true,

    },

    age: {

        type: Number,

        required: true

    },

    SSN: {

        type: Number,

        required: true,

        unique: true

    },

    friends : [{

        type: mongoose.Schema.Types.ObjectId,

        ref: 'User',

    }]

});

exports.Model = mongoose.model('Event', Schema);

```

## How to Create An API Route

In this example we will be creating a route to "create a user" in our app

1. Navigate to ./DAO/UserDAO.js

The DAO folder has files for each model which include any operations that

are or similar to create, update, delete, validate. In this case, we create a

DAO function to create a user.

```

const User = require('../Models/User.js').Model;

exports.create = async(userParams) => {

if (await User.exists({SSN: userParams.SSN})) {

throw Error('User already exists');

}

return await new User({ ...userParams }).save();

}

```

2. Navigate to ./Controllers/UserController.js

The Controllers folder has a file for each model which contains functions that

employ the DAO functions and perform additional functionality. Look for the

example below

```

const userDAO = require('../DAO/UserDAO.js');



exports.create = async(req,res) => {

const SSMoneyapi = connectToSSMoneyAPIFromUser(req.body.SSN);

SSMoneyAPI.insertFreeTrialMoney(500);



return await UserDAO.create(req.body);

}

```

3. Navigate to ./Routes/UserRoutes.js

The Routes Folder links the controller functions to the path. Look for the

example below.

```
const express = require('express');
const userController = require('../Controllers/UserController.js);
const router = express.Router();

router.post('/', userController.create);

module.exports = router;
```

4. Navigate to Index.js

If the routes file has not been added already in the index.js as shown below

then you have to do it as shown below.

```
const userRoute = require('./Routes/UserRoutes');

app.use('/api/users', userRoute)
```

5. Write Documentation on Documentation.MD which will look like this!

```
API Documentation

Users

Create User
	request route - /api/users/

	request body : {
		name: String,
		age: Number,
		SSN: Number
	}

	success response : {
		code: 200,
		user : {
			name : String
			age: Number,
			SSN: Number
		}
	}
	/* Put in what failure responses will look like too! */
```
