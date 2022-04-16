import React, { useCallback, useEffect, useState } from "react";
import { app } from "../assets/styles/stylesheet";
import { COLORS } from "../constants/Colors";
import Navigation from "../components/Navbar";
import Movie from "../components/Movie";
import Footer from "../components/Footer";
import moviesAPI from "../api/moviesAPI";
import Loading from '../components/Loading'; 
import { useLocation, useNavigate} from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap'; 

const styles = {
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
  movieContainer: {
    display: "flex",
    flexWrap: "wrap",
    color: "white",
    justifyContent: "center",
  },
  search: {
    background: "white",
    borderRadius: 50,
    border: "3px solid white",
    width: "50%",
    color: COLORS.Magenta,
    fontFamily: "inherit",
    fontSize: "150%",
    margin: "3% 25% ",
    padding: "1% 2%",
    outline: "none",
  },
};

function Search() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null); 
  const navigate = useNavigate();
  const location = useLocation();

  const retrieveFeaturedMovies = useCallback(async () => {
    const retrievedMovies = await moviesAPI.getFeaturedMovies();
    await setMovies(retrievedMovies);
    await setLoading(!loading);
  }, []); 

  

  const handleOnSubmit = async(e) => {
    await setLoading(true); 
    e.preventDefault();

    if (searchTerm) {
      const retrievedMovies = await moviesAPI.searchMovies(
        searchTerm.split(" ").join("")
      );
      console.log(retrievedMovies);

      await setMovies(retrievedMovies);
      await setSearchTerm("");
    }

    await setLoading(false);
  };

  useEffect(() => {
    retrieveFeaturedMovies();
  }, [retrieveFeaturedMovies]);

  const clicked = useCallback(async (movie) => {
    if(localStorage.getItem('token')){
      await setMovieSelected(movie); 
      await setShowModal(true);
    }
    else{
      navigate('/movieInfo', { state: { movie } });
    }  
  }, []);

  const renderModal = () => {
    return(
      <React.Fragment>

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Choose Your Next Step!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to review the movie or look at more movie information?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => navigate('/createReview', { state: {movie: movieSelected}}) }>
          Review
        </Button>
        <Button variant="primary" onClick={() => navigate('/movieInfo', { state: {movie: movieSelected}})}>
          More Info
        </Button>
      </Modal.Footer>
    </Modal>
  </React.Fragment>
    ); 
  }

  const renderPage = () => {
    return (
      <React.Fragment>
        <Navigation />
        {renderModal()}
        <div style={app.pageStyle}>
          <header>
            <form onSubmit={handleOnSubmit}>
              <input
                style={styles.search}
                className="search"
                type="search"
                placeholder="Search Movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </header>
          <div style={styles.movieContainer}>
            {movies.length > 0 &&
              movies.map((movie) => (
                <Movie key={movie.id} movieInfo={movie} onClick={clicked} />
              ))}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  };

  return loading ? <Loading /> : renderPage();
}

export default Search;
