import React, {Component} from "react";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBInput as Input,
    MDBListGroup as ListGroup,
    MDBListGroupItem as ListGroupItem,
    MDBRow as Row,
    MDBCol as Col,
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
                                                value={this.state.first_name}
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
                                                value={this.state.middle_name}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}