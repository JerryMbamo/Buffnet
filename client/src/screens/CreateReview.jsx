import React, { useState, useCallback, useEffect } from "react";
import { app } from "../assets/styles/stylesheet";
import Footer from "../components/Footer";
import Navigation from "../components/Navbar";
import BasicCard from "../components/BasicCard";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useLocation, useNavigate} from 'react-router-dom';
import reviewsAPI from "../api/reviewsAPI";
import userAPI from '../api/userAPI';
import DismissibleErrorAlert from "../components/DismissibleErrorAlert";
import Loading from '../components/Loading';
const CreateReview = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeading, setAlertHeading] = useState('');
  const [alertText, setAlertText] = useState(''); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation();
  

  const style = app.createReviewCard;

  const handleRating = (rate) => {
    setRating(rate);
  };

  const initOperations = useCallback(async () => {
    const {movie} = location.state; 
    await userAPI.recordMovieInterest(movie.id);
    await setSelectedMovie(movie); 
    await setLoading(false); 
  }, [])

  useEffect(() => {
    initOperations(); 
  }, [initOperations]);

  const submit = async() => {
    if(reviewText.length < 30){
      setShowAlert(true); 
      setAlertHeading('Please Write A Review!');
      setAlertText('Your review should be atleast 30 characters long.');  
    } 
    const success = await reviewsAPI.createReview(selectedMovie.id, reviewText, rating);
    if(success)
      setShowModal(true);

    else {
      setShowAlert(true); 
      setAlertHeading('We encountered an issue');
      setAlertText('We were unable to process your request');  
    }
  };


  const renderModal = () => {
    return(
      <React.Fragment>

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Your Review Has Been Posted :)</Modal.Title>
      </Modal.Header>
      <Modal.Body>Thank you so much for contributing to our community!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => navigate('/userProfile')}>
          Go To Profile
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
          <BasicCard
            body={
              <Container>
                <DismissibleErrorAlert 
                  show = {showAlert}
                  setShow = {setShowAlert}
                  heading = {alertHeading}
                  text = {alertText}
                />
                <Row>
                  <Col xs="auto" className="mb-2">
                    <h1 style={style.heading}>{selectedMovie.title} Review</h1>
                  </Col>
                  <Col className="mt-2">
                    <Rating
                      allowHalfIcon
                      onClick={handleRating}
                      ratingValue={rating}
                      size={30}
                      label
                      transition
                      fillColor={"#FFCD3C"}
                      emptyColor="gray"
                    />
                  </Col>
                </Row>
                <Form style={style.form}>
                  <Row>
                    <Form.Control
                      as="textarea"
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={10}
                      className="mb-2"
                      placeholder="Type Your Review Here"
                    ></Form.Control>
  
                    <Col className="d-grid gap-2" xs={{ span: 5, offset: 1 }}>
                      <Button variant="danger" onClick = {() => navigate('/search')}>
                        Cancel
                      </Button>
                    </Col>
                    <Col className="d-grid gap-2" xs={{ span: 5, offset: 0 }}>
                      <Button
                        onClick={() => submit()}
                        variant="success"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
            }
          ></BasicCard>
        </div>
        <Footer />
      </React.Fragment>
    );

  }

  return loading ? <Loading /> : renderPage();

  
};

export default CreateReview;
