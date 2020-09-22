import React, {Component} from "react";
import Helmet from "react-helmet";
import {
    MDBCard as Card,
    MDBCardBody as CardBody,
} from "mdbreact";
import { connect } from "react-redux";
import PersonalInfo from "./Sections/PersonalInfo";
import ContactInfo from "./Sections/ContactInfo";
import FamilyInfo from "./Sections/FamilyInfo";
import { fetchCurrentUserSuccess } from "../../redux/userData/userDataActions";
import axiosInstance from "../../axios/axiosDefault";


const mapStateToProps = state => ({ ...state.userData });

const mapDispatchToProps = dispatch => ({
    fetchCurrentUserSuccess: data => dispatch(fetchCurrentUserSuccess(data)),
});

class Profile extends Component {
    state = {
        userData: [],
        updateSuccessful: false,
        updateFailed: false,
    }

    componentDidMount() {
        let { userData } = this.props || [];
        this.setState({ userData });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userData !== prevProps.userData) {
            this.setState({ userData: this.props.userData });
        }
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
        axiosInstance.patch("/auth/user/update", userData)
            .then(res => {
                let { data } = res;
                this.props.fetchCurrentUserSuccess(data);
                this.setState({ updateSuccessful: true });
                this.notifTimeout = setTimeout(() => this.setState({ updateSuccessful: false }), 5000);
            })
            .catch(err => {
                console.log(err.message);
                this.setState({ updateFailed: true });
                this.notifTimeout = setTimeout(() => this.setState({ updateFailed: false }), 5000);
            });
    }

    render() {
        let { userData } = this.state;

        return (
            <div>
                <Helmet>
                    <title>Profile | UP Computerized Registration System</title>
                </Helmet>

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
                                {(this.state.updateSuccessful)
                                    && <div className="note note-success mt-4">
                                        Changes saved successfully.
                                    </div>
                                }
                                {(this.state.updateFailed)
                                    && <div className="note note-danger mt-4">
                                        An error occurred. Please try again later.
                                    </div>
                                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
