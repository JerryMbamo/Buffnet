import React, { useState } from "react";
import { app } from "../../assets/styles/stylesheet";
import Navigation from "../../components/Navbar";
import Footer from "../../components/Footer";
import BasicCard from "../../components/BasicCard";
import { COLORS } from "../../constants/Colors";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import userAPI from "../../api/userAPI";
import DismissibleErrorAlert from "../../components/DismissibleErrorAlert";

import { GoogleLogin } from 'react-google-login'
import { GoogleButton } from 'react-google-button';

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); 
  const [alertHeading, setAlertHeading] = useState('');
  const [alertText, setAlertText] = useState('');  
  const navigate = useNavigate();

  const submit = async() => {
    try {
      const isUniqueUsernameEmail = await userAPI.checkEmailUsername(email, username); 
      if(isUniqueUsernameEmail === null){
        setShowAlert(true);
        setAlertHeading('Something went wrong!');
        setAlertText('We had an issue with processing your request. Please try again');    
      }

      else if(!isUniqueUsernameEmail){
        setShowAlert(true); 
        setAlertHeading('Issue with username or email'); 
        setAlertText('Your username or email is already associated with an account'); 
      }

      else if(password !== confirmPassword){
        setShowAlert(true);
        setAlertHeading('Please confirm your password again!');
        setAlertText('Please enter the same password in both password fields.');
      }
      else{
        const user = { firstName, lastName, username, email, password };
        navigate("/accountInfoEntry", { state: { user } });
      }  
    } catch (error) {
      setShowAlert(true);
      setAlertHeading('Something went wrong!');
      setAlertText('We had an issue with processing your request. Please try again');
    }
  };

  const googleSuccess = async (res) => {
    try {

        console.log(res);
        const result = res?.profileObj;
        console.log(result);

        if (result !== 'null') {
            const googleUser = res.profileObj;
            const user = {
                firstName: googleUser.givenName,
                lastName: googleUser.familyName,
                username: googleUser.email.split('@')[0],
                email: googleUser.email,
                password: googleUser.googleId
            };

            console.log(user);
            console.log(username);
            console.log(email);
            const isUniqueUsernameEmail = await userAPI.checkEmailUsername(user.username, user.email); 
            if (!isUniqueUsernameEmail) {
              setShowAlert(true);
              setAlertHeading('Issue with Google email/username');
              setAlertText('Your Google email or username is already associated with an account. Please try login!'); 
            } 
            else{
              navigate("/accountInfoEntry", { state: { user } });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try again later');
}

  return (
    <React.Fragment>
      <div style={app.pageStyle}>
        <Navigation />
        <Container>
          <DismissibleErrorAlert 
            show = {showAlert}
            setShow = {setShowAlert}
            heading = {alertHeading}
            text = {alertText}
          />
          <Row></Row>
          <Row>
            <Col></Col>
            <Col xs={8}>
              <BasicCard
                body={
                  <Form>
                    <h1 style={{ fontWeight: "bold" }}>Sign Up</h1>
                    <p style={{ color: COLORS.white }}>
                      Already Registered? Click here to sign in
                    </p>
                    <Row>
                      <Col>
                        <Form.Control
                          placeholder="First name"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          placeholder="Last name"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Form.Control
                          placeholder="Username"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Form.Control
                          placeholder="Email Address"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Form.Control
                          placeholder="Password"
                          type='password'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Form.Control
                          placeholder="Confirm Password"
                          type='password'
                          onChange={(e) => setConfirmPassword(e.target.value)}
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
                          Register
                        </Button>
                      </Col>
                      <Col></Col>
                    </Row>
                    <GoogleLogin
                      clientId="958508103117-arenslq6komfvg67sfuqajrgu676luip.apps.googleusercontent.com"
                      render={(renderProps) => (
                        <Row>
                          <Col></Col>
                            <Col xs={8}>
                                <GoogleButton
                                  style={{ width: "100%" }}
                                  label='Sign up with Google'
                                  className="my-3"
                                  variant="dark"
                                  onClick={renderProps.onClick}
                                  disabled={renderProps.disabled}
                                />
                              </Col>
                            <Col></Col>
                          </Row>
                        )}

                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    
                    />
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

export default SignUp;
