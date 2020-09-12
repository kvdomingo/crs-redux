import React, {Component} from "react";
import PropTypes from "prop-types";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBRow as Row,
    MDBCol as Col,
} from "mdbreact";
import TextField from "../Forms/TextField";


export default class PersonalInfo extends Component {
    static propTypes = {
        userData: PropTypes.object.isRequired,
        handleChange: PropTypes.func.isRequired,
    }

    render() {
        let { handleChange, userData } = this.props;
        return (
            <Card className="kill-card-shadow mb-3">
                <CardHeader>Contact Information</CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <TextField
                                value={userData.email}
                                name="email"
                                handleChange={handleChange}
                                label="Primary email"
                                required
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.mobile_number}
                                name="mobile_number"
                                handleChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.telephone_number}
                                name="telephone_number"
                                handleChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <TextField
                        type="textarea"
                        value={userData.present_address}
                        name="present_address"
                        handleChange={handleChange}
                        required
                    />

                    <TextField
                        type="textarea"
                        value={userData.permanent_address}
                        name="permanent_address"
                        handleChange={handleChange}
                        required
                    />
                </CardBody>
            </Card>
        );
    }
}