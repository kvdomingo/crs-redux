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

    render() {
        return (
            <Card style={{ boxShadow: "none", border: "1px solid #ddd" }}>
                <CardHeader>Login</CardHeader>
                <CardBody>
                    <form className="form">
                        <Input
                            label="Username"
                            type="email"
                            icon="user"
                            group
                            validate
                        />
                        <Input
                            label="Password"
                            type="password"
                            icon="lock"
                            group
                            validate
                        />
                        <input
                            type="submit"
                            value="Login"
                            className="btn btn-primary"
                        />
                    </form>
                </CardBody>
            </Card>
        );
    }
}