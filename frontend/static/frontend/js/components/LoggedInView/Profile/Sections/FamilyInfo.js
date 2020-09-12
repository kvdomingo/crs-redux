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


export default class FamilyInfo extends Component {
    static propTypes = {
        userData: PropTypes.object.isRequired,
        handleChange: PropTypes.func.isRequired,
    }

    render() {
        let { handleChange, userData } = this.props;
        return (
            <Card className="kill-card-shadow mb-3">
                <CardHeader>Family Information</CardHeader>
                <CardBody>
                    <div className="form-group">
                        <label htmlFor="father_status">Father Status</label>
                        <select
                            className="browser-default custom-select"
                            name="father_status"
                            value={userData.father_status}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>---</option>
                            <option value="A">Alive</option>
                            <option value="D">Deceased</option>
                            <option value="U">Unknown</option>
                        </select>
                    </div>
                    <Row>
                        <Col>
                            <TextField
                                value={userData.father_first_name}
                                name="father_first_name"
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.father_middle_name}
                                name="father_middle_name"
                                handleChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.father_last_name}
                                name="father_last_name"
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextField
                                value={userData.father_email}
                                name="father_email"
                                handleChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.father_contact_number}
                                name="father_contact_number"
                                handleChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <hr />

                    <div className="form-group">
                        <label htmlFor="father_status">Mother Status</label>
                        <select
                            className="browser-default custom-select"
                            name="mother_status"
                            value={userData.mother_status}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>---</option>
                            <option value="A">Alive</option>
                            <option value="D">Deceased</option>
                            <option value="U">Unknown</option>
                        </select>
                    </div>
                    <Row>
                        <Col>
                            <TextField
                                value={userData.mother_first_name}
                                name="mother_first_name"
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.mother_maiden_middle_name}
                                name="mother_maiden_middle_name"
                                handleChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.mother_maiden_last_name}
                                name="mother_maiden_last_name"
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextField
                                value={userData.mother_email}
                                name="mother_email"
                                handleChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.mother_contact_number}
                                name="mother_contact_number"
                                handleChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <TextField
                                value={userData.guardian_first_name}
                                name="guardian_first_name"
                                handleChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.guardian_middle_name}
                                name="guardian_middle_name"
                                handleChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.guardian_last_name}
                                name="guardian_last_name"
                                handleChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextField
                                value={userData.guardian_email}
                                name="guardian_email"
                                handleChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.guardian_contact_number}
                                name="guardian_contact_number"
                                handleChange={handleChange}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}