# Frontend Dev Practices

**Please read the following to understand file structure and development practices for the Frontend or just as a reference tool**

## Intro

You will notice that this folder has the following folder structure. We will maintain this folder structure for the length of this project. If we need functionality that surpasses these folders then we will add more folders. But these are the most essential base folders for this project. The files inside the Controllers, DAO, Models, and Routes directories are for demonstration purposes. **Please note that this is the src folder of the frontend**

```
.
├── api
│   ├── UserAPI.js
│   └── baseAPI.js
├── assets
│   ├── images
│   	├── buffnetLogo.png
│   	└── homeBackground.png
│   └── styles
│   	└── stylesheet.js
├── components
│   ├── card.jsx
│   └── form.jsx
├── constants
│   └── Colors.js
├── screens
│   ├── Home.jsx
│   └── Signup.jsx
├── Dockerfile
├── index.js
└── App.js
```

## General Practices

- use useState and useEffect as much as you can!
- use async and await whenever you are dealing with any API calls or asynchronous requests

## api Folder

The api folder contains files that pertain to the types of API calls we are making.
For example, in our program we store and retrieve users therefore we have a UserAPI file. If we wanted to store and retrieve events then we will have an
EventAPI file.

We also have a baseAPI file which contains some axios functionality that will make it easier for you to call backend functions. Here's how our baseAPI file looks like.

```
import  axios  from  'axios'

const  API  =  axios.create({
baseURL: `http://${location.hostname}:8080/`,
responseType: 'json',
});

export  default  API;
```

Our UserAPI contains functions that calls the API variable from the baseAPI to make Axios API calls. Here's an example!

```
import API from './baseAPI.js'

exports.createUser = async(userObject){
	try {
		const response = await API.post('/api/users/', userObject);
	}
	catch(error) {
		if(error.message){
			return { error };
		}
		return { error: 'Unable to create new user' }
	}
}
```

## assets/images Folder

Any images that we use for this project have to go here!

## assets/styles Folder

This contains a stylesheet javascript file that holds styling objects that are commonly used throughout the application.

For example, if we have styling that is common between many React card components then in the stylesheet javascript file we can write the following..

```
export const card = {
	title: {
		color: '02#FF',
		fontSize: 20,
		flex: 5
	},
	body: { flex: 5 }
}
```

## components folder

The components folder contains the files for components that are used in more than one page of our application. A good example for a component would be a Navbar. Please make sure that any styling that is specific to this component has to be located on the bottom of the file as shown below.

```
const styles = {
	title: {
		color: '02#FF',
		fontSize: 20,
		flex: 5
	},
	body: { flex: 5 }
}
```

## constants folder

The constants folder contains any files to store constant values that are used throughout the application. For example, if we know that our titles of various different pages are going to be of the same color then we can make an object
like the one shown below. This will will help maintain color uniformity and any other style themes that we decide to implement across the application,

```
export default {
	titleText: '#ox222',
	# add any other constant values onto this object
}
```

## screens Folder

Contains react code for all the screens that we are building. In our example folder structure we have home.jsx and signup.jsx. Like with the component files please make a styles object at the bottom of the file for any styling that is specific to that screen.
