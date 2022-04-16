import React, { useState } from 'react';
import { app } from "../assets/styles/stylesheet";
import Footer from "../components/Footer";
import Navigation from "../components/Navbar";
import { COLORS } from "../constants/Colors";
import BasicCard from "../components/BasicCard";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import userAPI from '../api/userAPI';
import DismissibleErrorAlert from '../components/DismissibleErrorAlert';
import { GoogleButton } from 'react-google-button';

import { useEffect, useCallback } from 'react';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [showLoginError, setShowLoginError] = useState(false);
  const navigate = useNavigate(); 

  const submit = async() => {
    const userToken = await userAPI.login(emailOrUsername, password); 
    if(userToken){
      localStorage.setItem('token', userToken);
      navigate('/userProfile'); 
    } 
    else
      setShowLoginError(true); 
    
  }

  const googleAuth = (ev) => {
    ev.preventDefault();
    window.open("http://localhost:8080/api/user/auth/google", "_self");
  }
  
  const googleToken = useCallback(async () => {
    const userToken = await userAPI.googleUser();
    if (userToken) {
        await localStorage.setItem('token', userToken);
        navigate('/userProfile');
    }
    

}, []);

useEffect(() => {
    googleToken();
}, [googleToken]);

  return (
    <React.Fragment>
      <div style={app.pageStyle}>
        <Navigation />
        <Container fluid>
          <DismissibleErrorAlert 
            show = {showLoginError}
            setShow = {setShowLoginError}
            heading = {'Please Try again!'}  
            text = {'Your login credentials are invalid. Please try again!'}        
          />
          <Row></Row>
          <Row>
            <Col></Col>
            <Col xs={8} className="mt-5">
              <BasicCard
                body={
                  <Form>
                    <h1 style={{ fontWeight: "bold" }}>Login</h1>
                    <p style={{ color: COLORS.white }}>
                      New to Buffnet? Click here to create an account.
                    </p>

                    <Row className="mt-3">
                      <Col>
                        <Form.Control 
                          placeholder="Email / Username" 
                          onChange={(e)=>setEmailOrUsername(e.target.value)}  
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Form.Control 
                        placeholder="Password" 
                        type='password'
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col xs={8}>
                        <Button
                          style={{ width: "100%" }}
                          className="my-3"
                          variant="dark"
                          onClick={submit}
                        >
                          Login
                        </Button>
                      </Col>
                      <Col></Col>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col xs={8}>
                        <GoogleButton
                            style={{ width: "100%" }}
                            className="my-3"
                            variant="dark"
                            onClick={googleAuth}
                          />
                        </Col>
                        <Col></Col>
                      </Row>
                  </Form>
                }
                rounded={true}
              />
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Login;
