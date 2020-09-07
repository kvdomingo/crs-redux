import React, {Component} from "react";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBInput as Input,
    MDBListGroup as ListGroup,
    MDBListGroupItem as ListGroupItem,
} from "mdbreact";


export default class Profile extends Component {
    state = {
        ...this.props.userData,
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userData !== this.props.userData) this.setState({ ...this.props.userData });
    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Card className="kill-card-shadow">
                    <CardHeader>Student Profile</CardHeader>
                    <CardBody>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <ListGroup>
                                <ListGroupItem>
                                    <Input
                                        label="First name"
                                        name="first_name"
                                        type="text"
                                        value={this.state.first_name}
                                        onChange={this.handleChange}
                                        validate
                                    />
                                    <Input
                                        label="Middle name (optional)"
                                        name="middle_name"
                                        type="text"
                                        value={this.state.middle_name}
                                        onChange={this.handleChange}
                                    />
                                    <Input
                                        label="Last name"
                                        name="last_name"
                                        type="text"
                                        value={this.state.last_name}
                                        onChange={this.handleChange}
                                        validate
                                    />
                                </ListGroupItem>
                            </ListGroup>
                        </form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}