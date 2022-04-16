import React from "react";
import { Card } from "react-bootstrap";
import { app } from "../assets/styles/stylesheet";
import { Rating } from "react-simple-star-rating";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { COLORS } from "../constants/Colors";
import {useNavigate} from 'react-router-dom';
const ReviewCard = (props) => {
  const cardStyle = app.reviewCard;
  const reviewText = app.reviewCardText;
  const styles = {
    movie: {
      width: "100%",
      background: "#373B69",
      borderRadius: 3,
      boxShadow: "3px 3px 3px black",
      overflow: "hidden",
      position: "relative",
    },
  };

  return (
    <Card text="white" style={styles.movie}>
      <Card.Body>
        <Container fluid>
          <Row>
            <Col xs={3} style={{ padding: "1%" }}>
                <img
                  style={{
                    borderRadius: "25px",
                    width: "100%",
                    height: "100%",
                  }}
                  src={props.img}
                />
            </Col>
            <Col>
            
              <p style={reviewText}>{props.title}</p>
            
              
              <Rating
                readonly={true}
                ratingValue={props.rating}
                size={30}
                fillColor={"#FFCD3C"}
                emptyColor="gray"
              />
            </Col>
          </Row>
          <p style={{ margin: "1% 0% 0% 0%", display: "inline-block" }}>
            {"Reviewed by"}
          </p>{" "}
          <strong>{props.reviewer}</strong>
        </Container>
      </Card.Body>
    </Card>
  );
};
{
  /* <Card bg="dark" text="white" style={{ width: "100%" }}>
  <Card.Img rounded fluid src={props.movie.poster_path} variant="top" />
  <Card.Title style={{ textAlign: "center" }}>{props.movie.title}</Card.Title>
</Card>; */
}

export default ReviewCard;
