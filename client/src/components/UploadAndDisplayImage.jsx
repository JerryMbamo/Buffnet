import React from "react";
import { Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const UploadAndDisplayImage = (props) => {
  

  return (
    <React.Fragment>
      {props.selectedImage && (
        <div>
          <Image
            alt="Not Found"
            width={"350px"}
            rounded
            fluid
            src={URL.createObjectURL(props.selectedImage)}
          />
          <br />
        </div>
      )}
      <br />

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control
          type="file"
          onChange={(event) => {
            props.setSelectedImage(event.target.files[0]);
          }}
        />
      </Form.Group>
    </React.Fragment>
  );
};

export default UploadAndDisplayImage;
