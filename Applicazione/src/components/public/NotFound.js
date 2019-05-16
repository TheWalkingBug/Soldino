import React from 'react';
import gilberto from '../../img/gilberto.gif';
import {Button} from "react-bootstrap";
import {Link} from "react-router";

const NotFound = () => {
    return (
        <div style={{textAlign: 'center', marginTop: '8em'}}>
            <img alt="Not found" src={gilberto} style={{marginBottom: '1em'}}/>
            <h1>404</h1>
            <h3 style={{marginTop: '1em'}}>Sorry, page not found</h3>
            <Link to="/">
                <Button variant="dark" size="lg">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;
