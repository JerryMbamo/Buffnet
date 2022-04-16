import React, { useState, useEffect, useCallback } from "react";
import { app } from "../assets/styles/stylesheet";
import Footer from "../components/Footer";
import Navigation from "../components/Navbar";
import BasicCard from "../components/BasicCard";
import Comment from "../components/Comment";
import userAPI from "../api/userAPI";
import Loading from "../components/Loading";
import ReviewCard from "../components/ReviewCard";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import avatarImg from "../assets/images/avatar3.jpg";
import IndianaJonesImg from "../assets/images/indianaJones.jpg";
import { Rating } from "react-simple-star-rating";
import { COLORS } from "../constants/Colors";
import commentsAPI from "../api/commentsAPI";
import { useLocation, useNavigate } from "react-router-dom";

const ViewReview = () => {
  const [review, setReview] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const rating = 80;
  var commentsList;
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();  
  const style = app.createReviewCard;

  const retrieveUser = useCallback(async () => {
    await setReview(location.state.review);
    const commentsData = await commentsAPI.getComments(location.state.review.reviewID); 
    await setComments(commentsData); 
    await setLoading(!loading);
  }, []);

  const clicked = () => {
    navigate('/movieInfo', {state: {movie: review.movie}}); 
  }
  const postComment = async() => {
    const {username, profileImageURL, text} = await commentsAPI.createComment(review.reviewID, commentText);

    const exampleComment = {
      username, profileImageURL, text
    };
    comments.push(exampleComment);
    setCommentText('');
    setUpdate(true);
  };

  const displayComments = () => {
    if (update) {
      //get comment array again from backend
      setUpdate(false);
    }

    commentsList = comments.map((comment) => (
      <Comment
        commenter={comment.username}
        commenterPicture={comment.profileImageURL}
        commentText={comment.text}
      />
    ));
    return commentsList;
  };


  useEffect(() => {
    retrieveUser();
  }, [retrieveUser]);

  const renderPage = () => {
    return (
      <React.Fragment>
        <div style={app.pageStyle}>
          <Navigation />

          <BasicCard
            body={
              <Container>
                <Row>
                  <Col xs="auto">
                    <a
                      style={{ cursor: "pointer", margin: "1%" }}
                      onClick={() => clicked(review)}
                    >
                    <h1 style={style.heading}>{review.movie.title}</h1>
                    </a>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {"Reviewed by "}{review.username}
                    </span>
                  </Col>
                  <Col className="my-2">
                    <Rating
                      allowHalfIcon
                      readonly={true}
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
                  <Card
                    style={{
                      fontFamily: "sans-serif",
                      border: "none",
                      background: "#373B69",
                      color: "white",
                      marginTop: '2%',
                      marginBottom: '2%'
                    }}
                  >
                    {review.text}
                  </Card>
                  <h1 style={style.heading}> Comments</h1>
                </Form>
                <Row>
                  <Col xs="9">
                    <Form.Control
                      as="textarea"
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={1}
                      className="mb-2"
                      value={commentText}
                      placeholder="Type your comment here"
                    ></Form.Control>
                  </Col>
                  <Col xs="3">
                    <Button
                      variant="dark"
                      onClick={postComment}
                      type="submit"
                      className="mt-2"
                    >
                      Post Comment
                    </Button>
                  </Col>
                </Row>
                {displayComments()}
              </Container>
            }
          ></BasicCard>
        </div>
        <Footer />
      </React.Fragment>
    );
  };

  return loading ? <Loading /> : renderPage();
};

export default ViewReview;
