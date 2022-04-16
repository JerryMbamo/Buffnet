import React, { useCallback, useEffect, useState } from "react";
import { app } from "../assets/styles/stylesheet";
import { COLORS } from "../constants/Colors";
import Navigation from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import userAPI from "../api/userAPI";

const styles = {
  info: {
    background: COLORS.Magenta,
    maxWidth: "60%",
    margin: "auto",
    display: "flex",
    borderRadius: 25,
  },
  cast: {
    background: COLORS.Purple,
    maxWidth: "58%",
    height: "100%",
    margin: "auto",
    borderRadius: 25,
  },

  left: {
    margin: "2%",
    width: "80%",
    height: 500,
    justifyContent: "center",
    borderRadius: 25,
  },
  right: {
    background: COLORS.LightPurple,
    color: "white",
    margin: "2%",
    width: "100%",
    justifyContent: "center",
    borderRadius: 25,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
    borderRadius: "20px",
  },
  body: {
    borderRadius: 5,
    margin: "1%",
    padding: "1%",
  },
  tag: {
    background: COLORS.Purple,
    fontWeight: "bold",
    borderRadius: 5,
    padding: "2%",
    margin: "1.5%",
    color: "white",
  },
};

const MovieInfo = () => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const setMovieState = useCallback(async () => {
    const { movie } = location.state;
    await userAPI.recordMovieInterest(movie.id); 
    await setMovieInfo(movie);
    await setLoading(false);
  }, []);

  useEffect(() => {
    setMovieState();
  }, [setMovieState]);

  function details() {
    if (movieInfo.overview.length > 350) {
      return movieInfo.overview.substr(0, 350) + "...";
    }
    return movieInfo.overview;
  }

  const renderPage = () => {
    return (
      <div>
        <Navigation />
        <div style={app.pageStyle}>
          <div>
            <div style={styles.info}>
              <div style={styles.left}>
                <img style={styles.image} src={movieInfo.poster_path} />
              </div>
              <div style={styles.right}>
                <div style={{ margin: "1%" }}>
                  {/* <h2>Movie Details</h2> */}
                  <div style={styles.body}>
                    <div>
                      <h1>{movieInfo.title}</h1>
                      <small
                        style={{
                          fontSize: 15,
                          paddingTop: 20,
                        }}
                      >
                        Released Date: {movieInfo.release_date}
                      </small>
                    </div>
                    <h4
                      style={{
                        paddingTop: 15,
                      }}
                    >
                      Rating: {movieInfo.vote_average} / 10
                    </h4>
                    <p
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        paddingTop: 20,
                      }}
                    >
                      {details()}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "5%",
                    }}
                  >
                    {movieInfo.genres &&
                      movieInfo.genres.map((g) => (
                        <span style={styles.tag}>{g}</span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  return loading ? <Loading /> : renderPage();
};

export default MovieInfo;
