import React, { Component } from "react";
import {
    MDBContainer as Container,
} from "mdbreact";


export default class LoggedOutView extends Component {
    render() {
        return (
            <Container fluid className="m-4">
                <img
                    src="https://upload.wikimedia.org/wikipedia/en/3/3d/University_of_The_Philippines_seal.svg"
                    height={100}
                    alt="UP logo"
                />
            </Container>
        );
    }
}