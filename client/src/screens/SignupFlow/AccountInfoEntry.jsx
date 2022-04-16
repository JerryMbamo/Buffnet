import React, { useState } from 'react';
import Navigation from "../../components/Navbar";
import UploadAndDisplayImage from '../../components/UploadAndDisplayImage'; 
import {Form, Button, Row, Col, Container} from 'react-bootstrap'; 
import { useLocation, useNavigate} from 'react-router-dom';
import Footer from '../../components/Footer'; 
import { app } from '../../assets/styles/stylesheet';
import BasicCard from '../../components/BasicCard';

function AccountInfoEntry() {
  const [profileCharacterCount, setProfCharCount] = useState(0)
  const [profileBio, setProfileBio] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favMovie, setFavMovie] = useState(''); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  
  const changeProfileBio = (bio) => {
    setProfileBio(bio);
    setProfCharCount(bio.length); 
  }

  const submit = () => {
    let {user} = location.state; 
    user.profileBio = profileBio; 
    user.birthday = birthday; 
    user.favMovie = favMovie;
    user.profileImage = selectedImage; 
    navigate('/enterGenres', {state: {user}}); 
  }

  return (
    <React.Fragment>
      <div style={app.pageStyle}>
        <Navigation />
        <Container>
        <Row className="mt-5"></Row>
        <Row>
          <Col></Col>
          <Col xs={8} className="mt-5">

            <BasicCard 
              rounded = {true}
              body = {
                <Form>
                  <h1 style={{fontWeight: 'bold'}}>
                    First, let's create your profile!
                  </h1>
                  <p style={{ color: "white" }}></p>
                  <Row>
                    <Col>
                      <div>
                        <UploadAndDisplayImage 
                          selectedImage = {selectedImage}
                          setSelectedImage = {setSelectedImage}
                        />
                      </div>
                    </Col>
                    <Col style={{ marginTop: "5%" }}>
                      <Form.Control
                        placeholder="Edit Profile Bio"
                        as="textarea"
                        rows={8}
                        onChange={(e) => changeProfileBio(e.target.value)}
                      />
                      <p style={{ marginLeft: "80%" }}>{profileCharacterCount}/250</p>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Form.Control 
                        placeholder="Birthday (MM/DD/YYYY)" 
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Form.Control 
                        placeholder="Favorite Movie"
                        onChange={(e) => setFavMovie(e.target.value)} />
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
                          Continue
                        </Button>
                    </Col>
                    <Col></Col>
                  </Row>
                </Form>
              }
            />   
          </Col>
          <Col></Col>
        </Row>
      </Container>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default AccountInfoEntry;
