import React from 'react';
import {Card} from 'react-bootstrap'; 

const MovieCard = (props) => {
    return (
        <Card
            bg = 'dark'
            text = 'white'
            style = {{width: '100%'}}
        >
            <Card.Img
                rounded
                fluid
                src = {props.movie.poster_path}
                variant = 'top'
            />
            <Card.Title style = {{textAlign: 'center'}}>{props.movie.title}</Card.Title>

        </Card>
    ); 
}

export default MovieCard;