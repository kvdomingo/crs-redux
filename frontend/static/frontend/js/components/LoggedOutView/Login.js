import React, {Component} from "react";
import PropTypes from "prop-types";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBInput as Input,
} from "mdbreact";


export default class Login extends Component {
    static propTypes = {
        loginChangeView: PropTypes.func.isRequired,
    }

    state = {
        username: "",
        password: "",
        loginError: "",
    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        let { username, password } = this.state;
        fetch("/api/auth/token/obtain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then(async res => [res.status, await res.json()])
            .then(res => {
                let [status, data] = res;
                if (status === 400) {
                    let err = data.non_field_errors || data.details;
                    this.setState({ loginError: err[0] });
                } else {
                    localStorage.setItem("token", data.token);
                    this.props.loginChangeView(data.user);
                }
            });
    }

    render() {
        return (
            <Card className="kill-card-shadow">
                <CardHeader>Login</CardHeader>
                <CardBody>
                    {(this.state.loginError)
                        && <div className="note note-danger">
                            {this.state.loginError}
                        </div>
                    }
                    <form className="form" onSubmit={this.handleSubmit}>
                        <Input
                            label="Username"
                            type="text"
                            name="username"
                            group
                            validate
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
                        <input
                            type="submit"
                            value="Login"
                            className="ml-0 btn btn-primary kill-shadow"
                        />
                    </form>
                </CardBody>
            </Card>
        );
    }
}