import React, { Component } from "react";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBInput as Input,
    MDBBtn as Button,
} from "mdbreact";
import axiosInstance from "../axios/axiosDefault";
import { connect } from "react-redux";
import { fetchCurrentUserSuccess } from "../redux/userData/userDataActions";


const mapDispatchToProps = dispatch => ({
    fetchCurrentUserSuccess: data => dispatch(fetchCurrentUserSuccess(data)),
});

class Login extends Component {
    state = {
        username: "",
        password: "",
        loading: false,
        error: "",
    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        let { username, password } = this.state;
        axiosInstance.post(
            "/auth/token/obtain",
            { username, password },
        )
            .then(res => {
                let { data } = res;
                localStorage.setItem("token", data.token);
                axiosInstance.defaults.headers["Authorization"] = `JWT ${data.token}`;
                this.props.fetchCurrentUserSuccess(data.user);
            })
            .catch(err => {
               let error = err.message;
               this.setState({ error });
            });
    }

    render() {
        return (
            <Card className="kill-card-shadow">
                <CardHeader>Login</CardHeader>
                <CardBody>
                    {(this.state.error)
                        && <div className="note note-danger">
                            {this.state.error}
                        </div>
                    }
                    <form className="form" onSubmit={this.handleSubmit}>
                        <Input
                            label="Username"
                            type="text"
                            name="username"
                            group
                            validate
                            autoFocus
                            onChange={this.handleChange}
                            value={this.state.username}
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            group
                            validate
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                        {(!this.state.loading)
                            ? <input
                                type="submit"
                                value="Login"
                                className="ml-0 btn btn-primary kill-shadow"
                                disabled={!(this.state.username && this.state.password.length >= 8)}
                            />
                            : <Button
                                className="ml-0 kill-shadow"
                                color="primary"
                                disabled
                            >
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </Button>
                        }
                    </form>
                </CardBody>
            </Card>
        );
    }
}

export default connect(null, mapDispatchToProps)(Login);
