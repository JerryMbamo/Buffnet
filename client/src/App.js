import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/SignupFlow/Signup";
import AccountInfoEntry from "./screens/SignupFlow/AccountInfoEntry";
import GenresEntry from "./screens/SignupFlow/GenresEntry";
import UserProfile from "./screens/UserProfile";
import ReviewFeed from "./screens/ReviewFeed";
import ViewReview from "./screens/ViewReview";
import CreateReview from "./screens/CreateReview";
import Search from "./screens/Search";
import MovieInfo from "./screens/MovieInfo";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/enterGenres" element={<GenresEntry />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/accountInfoEntry" element={<AccountInfoEntry />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/reviewFeed" element={<ReviewFeed />} />
          <Route path="/viewReview" element={<ViewReview />} />
          <Route path="/createReview" element={<CreateReview />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movieInfo" element={<MovieInfo />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
