import React, {Component} from "react";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBRow as Row,
    MDBCol as Col,
} from "mdbreact";
import TextField from "../Forms/TextField";


export default class PersonalInfo extends Component {
    render() {
        let { handleChange, toggleCheck, userData } = this.props;
        return (
            <Card className="kill-card-shadow mb-3">
                <CardHeader>Personal Information</CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <TextField
                                value={userData.first_name}
                                name="first_name"
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.middle_name}
                                name="middle_name"
                                handleChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                value={userData.last_name}
                                name="last_name"
                                handleChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>

                    <div className="form-group custom-control custom-checkbox">
                        <input
                            className="custom-control-input"
                            name="disability"
                            id="disability"
                            type="checkbox"
                            checked={userData.disability}
                            value={userData.disability}
                            onChange={toggleCheck}
                        />
                        <label
                            htmlFor="disability"
                            className="custom-control-label"
                        >
                            With disabilities
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="disability_type">Disability type</label>
                        <select
                            className="browser-default custom-select"
                            name="disability_type"
                            value={userData.disability_type}
                            onChange={handleChange}
                            placeholder="Disability type"
                            disabled={!userData.disability}
                        >
                            <option value="N/A">None</option>
                            <option value="VIS">Visual</option>
                            <option value="AUD">Auditory</option>
                            <option value="PSY">Psychological</option>
                            <option value="PHY">Physical</option>
                        </select>
                    </div>

                    <TextField
                        value={userData.disability_details}
                        name="disability_details"
                        handleChange={handleChange}
                    />
                </CardBody>
            </Card>
        );
    }
}
