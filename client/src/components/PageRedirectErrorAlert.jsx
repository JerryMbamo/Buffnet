import React from 'react';
import { useNavigate } from "react-router-dom";
import {Alert, Button} from 'react-bootstrap';

const PageRedirectErrorAlert = (props) => {
    const navigate = useNavigate();

    if(props.show){
        return(
            <React.Fragment>
                <Alert variant="danger">
                    <Alert.Heading>{props.heading}</Alert.Heading>
                    <p>
                    {props.text}
                    </p>
                    <div className="d-flex justify-content-end">
                    <Button onClick={() => navigate(props.redirectLink)} variant="outline-danger">
                        {props.buttonText}
                    </Button>
                    </div>
                </Alert>
            </React.Fragment>
        );
    }

    return null; 
}

export default PageRedirectErrorAlert; 
