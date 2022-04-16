# API Documentation

## User API

### Signup User

**Purpose**: To Sign the user up and generate a JWT Token.

**Method** : Post

**Route**: http://localhost:8080/api/user/signup

```
FormData:{
	firstName: String,
	lastName: String,
	email: String,
	username: String,
	password: String,
	profileBio: String,
	birthday: Date,
	favMovie: String,
	genres: [String],
	profileImage: Image
}



success response:{
	success: true,
	token: String
}
```

### Login User

**Purpose** To Login a user and generate a JWT token.

**Method**: Get

**Route**: http://localhost:8080/api/user/login/:emailOrUsername/:password

```
request body:{
	username: String,
	password: String
}


success response:{
	success: true,
	token: String
}
```

### Check if User With Email Or Username Exists

**Purpose**: To Check if the email and username a user entered are unique to our database or not.

**Method**: Get

**Route**: http://localhost:8080/api/user/checkUsernameEmail/:username/:email

```
success response: {
	success: true,
	emailExists: false,
	usernameExists: false,
	intersectExists: false
}
```

### Retrieve User

**Purpose**: To retrieve logged in user information

**Method**: Get

**Route**: http://localhost:8080/api/user/getUser

**Headers**: Authorization: 'Bearer ${bearerToken}'

```
success response: {
	success: true,
	user: {
		firstName: String,
		lastName: String,
		email: String,
		username: String,
		profileBio: String,
		birthday: ['${month}', '${day}', '${year}'],
		favMovie: String,
		genres: [String],
		memberSince: ['${month}', '${day}', '${year}'],
		profileImageURL: String,
		moviesSeen: [ Number ]
	}
}
```

### Recommend Movies to User

**Purpose**: To return movie Recommendations to user

**Method**: Get

**Route**: http://localhost:8080/api/user/getRecommendations

**Headers**: Authorization: 'Bearer ${bearerToken}'

```
success response: {
	success: true,
	movies: [
		{
			id: Number,
			title: String,
			poster_path: String,
			overview: String,
			release_date: String,
			genres: [ String ],
			vote_average: Number
		}
	]
}
```

### Record Movie Interest in User

**Purpose**: To insert a movie id into user's movieSeen property when they go through a movie review or look at movie details.

**Method**: Put

**Route**: http://localhost:8080/api/user/recordMovie/:movieID

**Headers**: Authorization: 'Bearer ${bearerToken}'

```
success response: {
	success: true
}

failure response: {
	success: false
}

```

### Get Featured Movies

**Purpose**: To get the newest most popular movies.

**Method**: Get

**Route**: http://localhost:8080/api/movies/getFeaturedMovies

```
success response: {
	success: true,
	movies: [
		{
			id: Number,
			title: String,
			poster_path: String,
			overview: String,
			release_date: String,
			genres: [ String ],
			vote_average: Number
		}
	]
}
```

### Search Movies

**Purpose**: To search for movies using a search query

**Method**: Get

**Route**: http://localhost:8080/api/movies/search/:searchQuery

```
success response: {
	success: true,
	movies: [
		{
			id: Number,
			title: String,
			poster_path: String,
			overview: String,
			release_date: String,
			genres: [ String ],
			vote_average: Number
		}
	]
}
```

## Google Authentication Oauth2

**Method**: Get

**Route**: http://localhost:8080/api/user/auth/google

```
request body:{
	google_email: String,
	password: String
}

success response:{
	_id: String,
	firstName: String,
	lastName: String,
	email: String,
	username: String,
	password: String,
	token: String,
	__v: 0
}
```
