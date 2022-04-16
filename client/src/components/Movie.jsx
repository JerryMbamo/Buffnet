import React, { Component } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { COLORS } from "../constants/Colors";

const styles = {
  movie: {
    width: 300,
    margin: "1%",
    background: "#373B69",
    borderRadius: 3,
    boxShadow: "3px 3px 3px black",
    overflow: "hidden",
    position: "relative",
  },

  image: {
    maxWidth: "100%",
  },

  movieInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
  },

  movieInfoH3: {
    margin: 0,
  },

  overview: {
    background: COLORS.Purple,
    padding: "1%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    transform: "translateY(100%)",
    hover: "translateY(0%)",
  },

  tag: {
    background: COLORS.Navy,
    fontWeight: "bold",
    borderRadius: 5,
    padding: "4%",
    margin: "1%",
  },
};

const Movie = (props) => {
  function posterCheck() {
    if (props.movieInfo.poster_path.includes("null")) {
      return "https://freepikpsd.com/file/2019/10/image-not-found-png-4-Transparent-Images.png";
    }
    return props.movieInfo.poster_path;
  }

  return (
    <div style={styles.movie} onClick={() => props.onClick(props.movieInfo)}>
      <img
        style={styles.image}
        src={posterCheck()}
        alt={props.movieInfo.title}
      />
      <div style={styles.movieInfo}>
        <h3>{props.movieInfo.title}</h3>
        <span style={styles.tag}>{props.movieInfo.vote_average}</span>
      </div>
      {/* <div style={styles.overview}>
        <h2>Overview:</h2>
        <p>{overview}</p>
      </div> */}
    </div>
  );
};

export default Movie;
