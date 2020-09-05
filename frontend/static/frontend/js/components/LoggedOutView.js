import React, { Component } from "react";
import {
    MDBRow as Row,
    MDBCol as Col,
    MDBContainer as Container,
} from "mdbreact";
import Login from "./LoginForms/Login";


export default class LoggedOutView extends Component {
    render() {
        return (
            <Container fluid className="p-5">
                <Row className="flex-row-reverse">
                    <Col md="4">
                        <Login />
                    </Col>
                    <Col md="8">
                        Announcements
                    </Col>
                </Row>
            </Container>
        );
    }
}