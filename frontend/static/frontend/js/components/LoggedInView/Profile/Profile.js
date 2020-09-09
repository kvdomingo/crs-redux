import React, {Component} from "react";
import {
    MDBCard as Card,
    MDBCardBody as CardBody,
} from "mdbreact";
import PersonalInfo from "./Sections/PersonalInfo";
import ContactInfo from "./Sections/ContactInfo";
import FamilyInfo from "./Sections/FamilyInfo";


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
                            <section>
                                <PersonalInfo
                                    userData={userData}
                                    handleChange={this.handleChange}
                                    toggleCheck={this.toggleCheck}
                                />
                            </section>

                            <section>
                                <ContactInfo userData={userData} handleChange={this.handleChange} />
                            </section>

                            <section>
                                <FamilyInfo userData={userData} handleChange={this.handleChange} />
                            </section>

                            <section>
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
                            </section>
                        </form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}