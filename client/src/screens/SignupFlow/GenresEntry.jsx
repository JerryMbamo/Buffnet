import React, { useState } from "react";

import Navigation from "../../components/Navbar";
import { Row, Col, Container, Button } from "react-bootstrap";
import { app } from "../../assets/styles/stylesheet";
import GenreButton from "../../components/GenreButton";
import BasicCard from "../../components/BasicCard";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import userAPI from '../../api/userAPI'; 
import PageRedirectErrorAlert from "../../components/PageRedirectErrorAlert";
import DismissibleErrorAlert from "../../components/DismissibleErrorAlert";

const GenresEntry = () => {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western"
  ];

  const [genresSelected, setGenresSelected] = useState([]);
  const [showGenresError, setShowGenresError] = useState(false); 
  const [showSignupError, setShowSignupError] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const addGenre = (genre) => {
    let genres = genresSelected;
    genres.push(genre);
    setGenresSelected(genres);
    console.log(genres);
  };

  const deleteGenre = (genre) => {
    let genres = [];
    for (const item of genresSelected) {
      if (item !== genre) genres.push(item);
    }
    setGenresSelected(genres);
    console.log(genres);
  };

  const genreButtons = genres.map((genre) => (
    <Row style={{ margin: "2% 2% 2%" }}>
      <GenreButton
        genreName={genre}
        addGenre={addGenre}
        deleteGenre={deleteGenre}
      />
    </Row>
  ));

  const submit = async () => {
    if(genresSelected.length < 2){
      setShowGenresError(true);
    }
    else{
      let { user } = location.state;
      user.genres = genresSelected;
      const userToken = await userAPI.signup(user);
      if(userToken){
        await localStorage.setItem('token', userToken);
        navigate('/userProfile'); 
      }
      else
        setShowSignupError(true);
      
    }
    
  };

  return (
    <React.Fragment>
      <div style={app.pageStyle}>
        <Navigation />
        <Container>
          <PageRedirectErrorAlert 
            show = {showSignupError}
            heading = {'Signup Error'}
            text = {'We had an issue with your signup. Please navigate to the signup page and try again!'}
            redirectLink = {'/signup'}
            buttonText = {'Go to Signup Page'}
          />
          <DismissibleErrorAlert 
            show = {showGenresError}
            setShow = {setShowGenresError}
            heading = {'Select atleast two genres!'}
            text = {'You need to tell us atleast two genres that you are interested in to signup'}
          />
          <Row>
            <BasicCard
              body={
                <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
                  Next, select two or more genres that you like 
                </h1>
              }
              rounded={false}
            />
          </Row>
          <Row>
            <Col>{genreButtons.slice(0, 4)}</Col>
            <Col>{genreButtons.slice(4, 8)}</Col>
            <Col>{genreButtons.slice(8, 12)}</Col>
            <Col>{genreButtons.slice(12,16)}</Col>
            <Col>{genreButtons.slice(16,19)}</Col>
          </Row>
          <Row style={{ textAlign: "center" }}>
            <BasicCard
              body={
                <Button
                  style={{ width: "60%" }}
                  className="my-3"
                  variant="dark"
                  onClick={submit}
                >
                  Finish
                </Button>
              }
              rounded={false}
            />
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default GenresEntry;
