import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    MDBRow as Row,
    MDBCol as Col,
    MDBContainer as Container,
    MDBTypography as Type,
} from "mdbreact";
import Login from "./Login";
import Announcements from "./Announcements";


export default class LoggedOutView extends Component {
    static propTypes = {
        handleLogin: PropTypes.func.isRequired,
    }

    render() {
        return (
            <Container fluid className="p-5">
                <Row className="flex-row-reverse">
                    <Col md="4">
                        <Login handleLogin={this.props.handleLogin} />

                        <Type tag="h3" variant="h5-responsive" className="mt-4">
                            Sign in problems?
                        </Type>
                        <hr />
                        <p>
                            For the site to work properly, your browser must have JavaScript and cookies enabled.
                        </p>

                        <Type tag="h3" variant="h5-responsive" className="mt-4">
                            Forgot your password?
                        </Type>
                        <hr />
                        <p>
                            For DILNET users, you may reset your password through this facility: <a href="https://accounts.upd.edu.ph/lostpass" target="_blank" rel="noopener noreferrer">https://accounts.upd.edu.ph/lostpass</a>.
                        </p>

                        <Type tag="h3" variant="h5-responsive" className="mt-4">
                            Inquiries?
                        </Type>
                        <hr />
                        <p>
                            If you have problems or concerns, please read our <a href="https://crs.upd.edu.ph/faq">Frequently Asked Questions (FAQ)</a>. You may email us at <a href="mailto:support@crs.upd.edu.ph">support@crs.upd.edu.ph</a> or you may visit the AIS Section at the 3rd floor of the OUR building. You may also join the <a href="http://www.facebook.com/groups/134746139953068/" target="_blank" rel="noopener noreferrer">UP Diliman CRS Official Facebook Group</a>.
                        </p>
                    </Col>
                    <Col md="8">
                        <Announcements />
                    </Col>
                </Row>
            </Container>
        );
    }
}