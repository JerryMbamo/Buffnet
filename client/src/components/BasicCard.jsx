import React from "react";
import { Card } from "react-bootstrap";
import { app } from "../assets/styles/stylesheet";

const BasicCard = (props) => {
  const cardStyle = props.rounded ? app.cardRound : app.card;

  return (
    <Card style={cardStyle}>
      <Card.Body>{props.body}</Card.Body>
    </Card>
  );
};

export default BasicCard;
