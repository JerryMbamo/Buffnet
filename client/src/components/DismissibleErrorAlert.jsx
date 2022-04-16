import React from 'react';
import {Alert} from 'react-bootstrap'; 


const DismissibleErrorAlert = (props) => {
    if(props.show){
        return (
            <Alert variant="danger" onClose={() => props.setShow(false)} dismissible>
              <Alert.Heading>{props.heading}</Alert.Heading>
              <p>
                {props.text}
              </p>
            </Alert>
        );
    }
    return null; 
}

export default DismissibleErrorAlert; 
