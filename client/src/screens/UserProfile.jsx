import React, { useState, useEffect, useCallback } from "react";
import { app } from "../assets/styles/stylesheet";
import Footer from "../components/Footer";
import Navigation from "../components/Navbar";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import userAPI from "../api/userAPI";
import Loading from "../components/Loading";
import Image from "react-bootstrap/Image";
import Movie from "../components/Movie";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null); 
  const navigate = useNavigate();

  const retrieveUser = useCallback(async () => {
    const retrievedUser = await userAPI.retrieveUser();
    await setUser(retrievedUser);
  }, []);

  const getRecommendations = useCallback(async () => {
    const moviesRecommended = await userAPI.getRecommendations();
    const movieCards = moviesRecommended.map((movie) => (
      <div style={{ padding: "1%" }}>
        <Movie key={movie} movieInfo={movie} onClick={clicked} />
      </div>
    ));
    await setRecommendations(movieCards);
    await setLoading(!loading);
  }, []);

  useEffect(() => {
    retrieveUser();
    getRecommendations();
  }, [retrieveUser, getRecommendations]);

  const clicked = useCallback(async (movie) => {
    if(localStorage.getItem('token')){
      await setMovieSelected(movie); 
      await setShowModal(true);
    }
    else{
      navigate('/movieInfo', { state: { movie } });
    }  
  }, []);

  const renderModal = () => {
    return(
      <React.Fragment>

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Choose Your Next Step!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to review the movie or look at more movie information?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => navigate('/createReview', { state: {movie: movieSelected}}) }>
          Review
        </Button>
        <Button variant="primary" onClick={() => navigate('/movieInfo', { state: {movie: movieSelected}})}>
          More Info
        </Button>
      </Modal.Footer>
    </Modal>
  </React.Fragment>
    ); 
  }

  const renderPage = () => {
    return (
      <React.Fragment>
        <div style={app.pageStyle}>
          <Navigation />
          {renderModal()}
          <div
            style={{ maxWidth: "95%", marginLeft: "2.5%" }}
            class="main-body"
          >
            <div class="row" style={{ marginLeft: "2%", marginRight: "2%" }}>
              <div class="col-lg-4">
                <Card style={app.cardV2}>
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <div>
                        <Image
                          alt="Not Found"
                          width={"250px"}
                          rounded
                          fluid
                          src={user.profileImageURL}
                        />
                        <br />
                      </div>
                      <div class="mt-3">
                        <h4 style={{ margin: "1%", fontSize: 30 }}>
                          {user.username}
                        </h4>
                        <p
                          style={{ margin: "1%", fontSize: 20 }}
                          class="font-size-sm"
                        >
                          Member Since {user.memberSince[0]}{" "}
                          {user.memberSince[2]}
                        </p>
                        <p
                          style={{ margin: "1%", fontSize: 15 }}
                          class="font-size-sm"
                        >
                          Favorite Movie: {user.favMovie}
                        </p>
                      </div>

                      <hr class="my-4" />
                      <div class="mt-1" style={{}}>
                        <p>{user.profileBio}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div class="col-lg-8">
                <div class="row">
                  <div class="col-sm-12">
                    <Card style={app.cardV2}>
                      <div class="card-body">
                        <h5
                          style={{ margin: "1%", fontSize: 30 }}
                          class="d-flex align-items-center mb-3"
                        >
                          Movie Recommendations:
                        </h5>
                        <Row
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          <Col>{recommendations.slice(0, 2)}</Col>
                          <Col>{recommendations.slice(2, 4)}</Col>
                          <Col>{recommendations.slice(6, 8)}</Col>
                          <Col>{recommendations.slice(8, 10)}</Col>
                        </Row>
                      </div>
                    </Card>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <Card style={app.cardV2}>
                      <div class="card-body">
                        <h5
                          style={{ margin: "1%", fontSize: 30 }}
                          class="d-flex align-items-center mb-3"
                        >
                          Posted Reviews
                        </h5>
                      </div>
                      <div
                        class="card-body"
                        style={{ paddingBottom: 400 }}
                      ></div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  };

  return loading ? <Loading /> : renderPage();
};

export default UserProfile;
