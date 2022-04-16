import React from 'react';
import {app} from '../assets/styles/stylesheet';
import Footer from './Footer'
import Navigation from './Navbar';
import {Spinner} from 'react-bootstrap';

const Loading = () => {

    return(
        <React.Fragment>
        <div style={app.pageStyle}>
            <Navigation />
            <Spinner style = {{marginLeft: '50%', marginTop: '10%'}} animation="border" variant="success" />
            
        </div>
        <Footer />
        </React.Fragment>
    ); 
}

export default Loading;