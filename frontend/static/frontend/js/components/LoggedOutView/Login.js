import React, {Component} from "react";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBInput as Input,
} from "mdbreact";


export default class Login extends Component {
    state = {
        username: "",
        password: "",
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
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("token", res.token);
                this.props.loginChangeView(res.user);
            });
    }

    render() {
        return (
            <Card className="kill-card-shadow">
                <CardHeader>Login</CardHeader>
                <CardBody>
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