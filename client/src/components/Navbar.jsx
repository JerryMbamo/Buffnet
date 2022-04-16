import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants/Colors";
import {
  Button,
  Row,
  Nav,
  Container,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const styles = {
  nav: {
    background: COLORS.Magenta,
    fontSize: "130%",
    color: "white",
  },
};

function Navigation(props) {
  const navigate = useNavigate();

  const redirectToSearch = () => {
    navigate('/search', {state: {createReview: true}});
  }
  const renderLoginButton = () => {
    if (localStorage.getItem("token")) {
      return null;
    }
    return (
      <Link to="/login">
        <Button variant="dark">{"Login"}</Button>
      </Link>
    );
  };

  const renderSignupButton = () => {
    if (localStorage.getItem("token")) {
      return null;
    }
    return (
      <Link to="/signup">
        <Button variant="dark">{"Signup"}</Button>
      </Link>
    );
  };

  const renderAccountButton = () => {
    if (localStorage.getItem("token")) {
      return (
        <Link to="/userProfile">
          <Button variant="dark">{"Account"}</Button>
        </Link>
      );
    }
    return null;
  };

  const renderLogoutButton = () => {
    if (localStorage.getItem("token")) {
      return (
        <Link to="/">
          <Button
            variant="dark"
            onClick={() => localStorage.removeItem("token")}
          >
            {"Logout"}
          </Button>
        </Link>
      );
    }
    return null;
  };

  const renderReviewFeedLink = () => {
    if(localStorage.getItem('token')) {
      return(
        <Nav.Link style={{ color: "white" }} href="/reviewFeed">
          Feed
        </Nav.Link>
      ); 
    }
    return null; 
  }
  
  const marginLeftIdentifier = () => {
    if (localStorage.getItem('token')) {
      return '60%'; 
    }
    return '70%';
  }

  return (
    <Navbar style={styles.nav} expand="lg" fixed="top">
      <Container style={{ maxWidth: "100%" }}>
        <Navbar.Brand style={styles.nav} href="/">
          Buffnet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link style={{ color: "white" }} href="/search">
                Search
              </Nav.Link>
              {renderReviewFeedLink()}
            
            
          </Nav>
        </Navbar.Collapse>

        <Container style = {{marginLeft: marginLeftIdentifier()}}>
        <Row xs='auto'>
          {renderLoginButton()}
          {renderAccountButton()}
          {renderSignupButton()}
          {renderLogoutButton()}
        </Row>
        </Container>
      </Container>
    </Navbar>
  );
}

export default Navigation;
