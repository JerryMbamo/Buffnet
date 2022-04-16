import React from "react";
import Card from "react-bootstrap/Card";
import { COLORS } from "../constants/Colors";

const styles = {
  card: {
    background: COLORS.maroon,
    color: COLORS.black,
    width: "50%",
    marginLeft: "2%",
    marginRight: "2%",
  },

  cardImg: {
    width: "100%",
    height: "50%",
    objectFit: "fill",
  },
};

const TopReviewCard = (props) => {
  const { title, image, body, time } = props;
  return (
    <React.Fragment>
      <Card style={styles.card}>
        <Card.Img style={styles.cardImg} variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{body}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated {time} mins ago</small>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export default TopReviewCard;
