import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { app } from "../assets/styles/stylesheet";
import { COLORS } from "../constants/Colors";

const Comment = (props) => {
  const cardStyle = app.comment;
  const commenterPicture = props.commenterPicture;
  const commentText = props.commentText;
  const commenter = props.commenter;

  const styles = {
    cardImage: {
      objectFit: "contain",
      borderRadius: 55,
      height: "40%",
    },
  };

  // const commentExample = {
  //   commenter: "Bricson",
  //   commentText: "this is a comment",
  //   commentDate: "12 2 3",
  //   commenterPicture: avatarImg,
  // };

  return (
    <Row>
      <Col xs={2} style={{ padding: "1%" }}>
        <img
          style={{
            //margin:"0 0 0",
            borderRadius: "50%",
            width: "90%",
            height: "90%",
          }}
          src={commenterPicture}
        />
      </Col>
      <Col>
        <Card style={cardStyle}>
          <Card.Header
            style={{
              fontFamily: "sans-seriff",
              color: "white",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "24px" }}>
              {commenter}{" "}
            </span>
            <span style={{ display: "block" }}>{commentText}</span>
          </Card.Header>
        </Card>
      </Col>
    </Row>
  );
};

export default Comment;
