import { COLORS } from "../../constants/Colors";

export const app = {
  fontFamily: "sans-serif",
  pageStyle: {
    backgroundColor: COLORS.Navy,
    minHeight: "100vh",
    height: "auto",
    padding: "5% 0% 5%",
  },
  card: {
    backgroundColor: COLORS.Magenta,
    border: COLORS.Navy,
    borderStyle: "solid",
    borderWidth: "thick",
    margin: "15% 5%",
  },
  comment: {
    overflowWrap: "break-word",
    display: "inline-block",
    backgroundColor: COLORS.Navy,
    border: "none",
    margin: "1% 0% 0% 0%",
    width: "100%",
  },
  cardRound: {
    backgroundColor: COLORS.Magenta,
    border: COLORS.Navy,
    borderStyle: "solid",
    borderWidth: "thick",
    borderRadius: "25px",
    margin: "15% 0% 15%",
  },
  reviewCard: {
    backgroundColor: COLORS.lightGrey,
    border: COLORS.black,
    borderStyle: "solid",
    borderWidth: "thick",
    margin: "1% 0% 1%",
  },
  reviewCardRound: {
    backgroundColor: COLORS.plum,
    margin: "1% 0% 1%",
  },
  reviewCardText: {
    display: "block",
    letterSpacing: "1px",
    textShadow: "1px 1px 5px black",
    fontSize: "40px",
    margin: "0% 0% 0%",
  },
  cardV2: {
    backgroundColor: COLORS.LightPurple,
    border: COLORS.Navy,
    borderStyle: "solid",
    borderWidth: 10,
    borderRadius: 50,
    margin: "2% 0%",
    color: "white",
  },
  cardV3: {
    backgroundColor: COLORS.Blue,
    display: "inline-flex",
    border: COLORS.Navy,
    borderStyle: "solid",
    borderRadius: "50%",
    justifyContent: "center",
    position: "relative",
    minWidth: "100%",
    margin: "2% 0%",
  },
  footer: {
    background: COLORS.Magenta,
    fontSize: "100%",
    minheight: "2.5%",
    width: "100%",
    textAlign: "center",
    position: "fixed",
    bottom: "0",
    color: "white",
  },

  //createReview
  createReviewCard: {
    heading: {
      display: "inline-block",
      fontFamily: "sans-serif",
      color: COLORS.white,
      fontWeight: "bold",
      textAlign: "left",
      margin: "0",
      padding: "0",
    },
    form: {
      width: "100%",
    },
  },
};
