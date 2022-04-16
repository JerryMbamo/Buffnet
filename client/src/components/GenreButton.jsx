import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { COLORS } from "../constants/Colors";

const GenreButton = (props) => {

  const [selected, setSelected] = useState(false); 

  const selectGenre = () => {
    if (selected)
      props.deleteGenre(props.genreName); 
      
    else
      props.addGenre(props.genreName); 

    setSelected(!selected); 
  }

  const renderButton = () => {
    if(selected){
      return (
        <Button
        style={{
          width: "100%",
          backgroundColor: COLORS.Purple,
        }}
        variant="dark"
        onClick = {selectGenre}
      >
        {props.genreName}
      </Button>
      );
    }
    else {
      return (
        <Button
          style={{
            width: "100%",
            backgroundColor: COLORS.Magenta,
          }}
          variant="dark"
          onClick = {selectGenre}
        >
          {props.genreName}
        </Button>
      );
    }
  }

  return (
    <React.Fragment>
      {renderButton()}
    </React.Fragment>
  );
};
export default GenreButton;
