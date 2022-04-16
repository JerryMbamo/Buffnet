import React, { useState, useEffect, useCallback } from "react";
import { app } from "../assets/styles/stylesheet";
import Footer from "../components/Footer";
import Navigation from "../components/Navbar";
import Loading from "../components/Loading";
import ReviewCard from "../components/ReviewCard";
import { Container } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'; 
import reviewsAPI from "../api/reviewsAPI";

const ReviewFeed = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(null); 
  const navigate = useNavigate();

  const retrieveUser = useCallback(async () => {
    const reviews = await reviewsAPI.getReviews(); 
    await setReviews(reviews); 
    await setLoading(!loading);
  }, []);

  const clicked = async(review) => {
    navigate('/viewReview', {state: {review}})
  }

  const renderReviews = () => {

    return reviews.map((review) => {
      return (
        <a
          style={{ cursor: "pointer", margin: "1%" }}
          onClick={() => clicked(review)}
        >
          <ReviewCard
            key={review.reviewID}
            title={review.movie.title}
            rating={review.rating}
            reviewer={review.username}
            img={review.movie.poster_path}
          />
        </a>
      );
    });
  };

  useEffect(() => {
    retrieveUser();
  }, [retrieveUser]);

  const renderPage = () => {
    return (
      <React.Fragment>
        <div style={app.pageStyle}>
          <Navigation />
          <div style={{ margin: "8% 0% 0% 0%" }} class="main-body">
            <Container>
              <h1
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  letterSpacing: "2px",
                }}
              >
                Movie Review Feed
              </h1>
              {renderReviews()}
            </Container>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  };

  return loading ? <Loading /> : renderPage();
};

export default ReviewFeed;
