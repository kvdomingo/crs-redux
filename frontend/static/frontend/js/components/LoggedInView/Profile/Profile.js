import React, {Component} from "react";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBRow as Row,
    MDBCol as Col,
} from "mdbreact";


export default class Profile extends Component {
    state = {
        userData: [],
        updateSuccessful: false,
        updateFailed: false,
    }

    componentDidMount() {
        fetch("/api/auth/user/current", {
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
            },
        })
            .then(res => res.json())
            .then(userData => this.setState({ userData }));
    }

    componentWillUnmount() {
        clearTimeout(this.notifTimeout);
    }

    handleChange = e => {
        let { name, value } = e.target,
            { userData } = this.state;
        userData[name] = value;
        this.setState({ userData });
    }

    toggleCheck = e => {
        let { name, checked } = e.target,
            { userData } = this.state;
        userData[name] = checked;
        if (!userData.disability) {
            userData.disability_type = "N/A";
            userData.disability_details = "";
        }
        this.setState({ userData });
    }

    handleSubmit = e => {
        e.preventDefault();
        let { userData } = this.state;
        fetch("/api/auth/user/update", {
            method: "PATCH",
            headers: {
                "Authorization": `JWT ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then(res => [res.status, res.json()])
            .then(res => {
                let [status, userData] = res;
                if (status === 202) {
                    this.setState({ userData, updateSuccessful: true });
                    this.notifTimeout = setTimeout(() => this.setState({ updateSuccessful: false }), 5000);
                } else {
                    this.setState({ updateFailed: true });
                    this.notifTimeout = setTimeout(() => this.setState({ updateFailed: false }), 5000);
                }
            });
    }

    render() {
        let { userData } = this.state;

        return (
            <div>
                <Card className="kill-card-shadow">
                    <CardBody>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <Card className="kill-card-shadow mb-3">
                                <CardHeader>Student information</CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col className="form-group">
                                            <label
                                                htmlFor="first_name"
                                                className="font-weight-bold"
                                            >
                                                First name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="first_name"
                                                value={userData.first_name}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                        <Col className="form-group">
                                            <label htmlFor="middle_name">Middle name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="middle_name"
                                                value={userData.middle_name}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                        <Col className="form-group">
                                            <label
                                                htmlFor="last_name"
                                                className="font-weight-bold"
                                            >
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="last_name"
                                                value={userData.last_name}
                                                onChange={this.handleChange}
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
                                            onChange={this.toggleCheck}
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
                                            onChange={this.handleChange}
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

                                    <div className="form-group">
                                        <label htmlFor="disability_details">Disability details</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="disability_details"
                                            value={userData.disability_details}
                                            onChange={this.handleChange}
                                            disabled={!userData.disability}
                                        />
                                    </div>
                                </CardBody>
                            </Card>

                            <Card className="kill-card-shadow mb-3">
                                <CardHeader>Contact information</CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col className="form-group">
                                            <label
                                                htmlFor="mobile_number"
                                                className="font-weight-bold"
                                            >
                                                Mobile number
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="mobile_number"
                                                value={userData.mobile_number}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <div className="note note-success mt-4" hidden={!this.state.updateSuccessful}>
                                Changes saved successfully.
                            </div>
                            <div className="note note-danger mt-4" hidden={!this.state.updateFailed}>
                                An error occurred. Please try again later.
                            </div>

                            <div className="text-center">
                                <input
                                    className="btn btn-primary kill-shadow ml-0 mt-4"
                                    type="submit"
                                    value="Submit"
                                />
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}