import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBInput as Input,
    MDBBtn as Button,
} from "mdbreact";


export default class Login extends Component {
    static propTypes = {
        loginChangeView: PropTypes.func.isRequired,
    }

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
        fetch("/api/auth/token/obtain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then(async res => [res.ok, await res.json()])
            .then(res => {
                let [ok, data] = res;
                if (!ok) {
                    let err = data.non_field_errors || data.details;
                    this.setState({ error: err[0], loading: false });
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
