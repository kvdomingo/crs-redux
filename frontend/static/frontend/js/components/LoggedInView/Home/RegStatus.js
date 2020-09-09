import React, {Component} from "react";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBTypography as Type,
    MDBListGroup as ListGroup,
    MDBListGroupItem as ListGroupItem,
    MDBBadge as Badge,
    MDBRow as Row,
    MDBCol as Col,
} from "mdbreact";


export default class RegStatus extends Component {
    state = {
        delinquencies: false,
        status: {
            registration_status: "",
            preenlistment_priority: "",
            registration_priority: "",
            academic_eligibility: "",
            accountability_status: "",
        },
    }

    componentDidMount() {
        fetch("/api/delinquencies", {
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
            },
        })
            .then(res => res.json())
            .then(res => (res.length > 0) ? this.setState({ delinquencies: true }) : null);

        fetch("/api/user-status", {
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
            },
        })
            .then(res => res.json())
            .then(status => this.setState({ status }));
    }

    render() {
        let { userData } = this.props,
            { status } = this.state;

        return (
            <div>
                <Card className="kill-card-shadow">
                    <CardHeader className="text-uppercase font-weight-bold">
                        First Semester AY 2020-2021
                    </CardHeader>
                    <CardBody>
                        <ListGroup>
                            <ListGroupItem>
                                <Row className="d-flex align-items-center">
                                    <Col>Registration status</Col>
                                    <Col className="text-md-right text-left">
                                        <h4>
                                            {(status.registration_status)
                                                ? <Badge
                                                    color="success"
                                                    className="ml-3 kill-shadow"
                                                >
                                                    Enrolled
                                                </Badge>
                                                : <Badge
                                                    color="danger"
                                                    className="ml-3 kill-shadow"
                                                >
                                                    Not enrolled
                                                </Badge>
                                            }
                                        </h4>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row className="d-flex align-items-center">
                                    <Col>Preenlistment priority</Col>
                                    <Col className="text-md-right text-left">
                                        <h4>
                                            <Badge
                                                color="info"
                                                className="ml-3 kill-shadow"
                                            >
                                                {status.preenlistment_priority}
                                            </Badge>
                                        </h4>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row className="d-flex align-items-center">
                                    <Col>Registration priority</Col>
                                    <Col className="text-md-right text-left">
                                        <h4>
                                            <Badge
                                                color="info"
                                                className="ml-3 kill-shadow"
                                            >
                                                {status.registration_priority}
                                            </Badge>
                                        </h4>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row className="d-flex align-items-center">
                                    <Col>Academic eligibility</Col>
                                    <Col className="text-md-right text-left">
                                        <h4>
                                            {(status.academic_eligibility)
                                                ? <Badge
                                                    color="success"
                                                    className="ml-3 kill-shadow"
                                                >
                                                    Eligible
                                                </Badge>
                                                : <Badge
                                                    color="danger"
                                                    className="ml-3 kill-shadow"
                                                >
                                                    Ineligible (view details in Delinquencies tab)
                                                </Badge>
                                            }
                                        </h4>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row className="d-flex align-items-center">
                                    <Col>Accountability status</Col>
                                    <Col className="text-md-right text-left">
                                        <h4>
                                            {(status.accountability_status)
                                                ? <Badge
                                                    color="success"
                                                    className="ml-3 kill-shadow"
                                                >
                                                    Cleared
                                                </Badge>
                                                : <Badge
                                                    color="danger"
                                                    className="ml-3 kill-shadow"
                                                >
                                                    Not cleared (view details in Delinquencies tab)
                                                </Badge>
                                            }
                                        </h4>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row className="d-flex align-items-center">
                                    <Col>Deficiencies</Col>
                                    <Col className="text-md-right text-left">
                                        <h4>
                                            {(this.state.delinquencies)
                                                ? <Badge
                                                    color="danger"
                                                    className="ml-3 kill-shadow"
                                                >
                                                    With deficiencies (view details in Deficiencies tab)
                                                </Badge>
                                                : <Badge
                                                    color="success"
                                                    className="ml-3 kill-shadow"
                                                >
                                                    No deficiencies
                                                </Badge>
                                            }
                                        </h4>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row className="d-flex align-items-center">
                                    <Col>Scholarship / STFAP / ST status</Col>
                                    <Col className="text-md-right text-left">
                                        <h4>
                                            {(userData.scholarship)
                                                ? <Badge
                                                    color="success"
                                                    className="ml-3 kill-shadow"
                                                >
                                                    {userData.scholarship}
                                                </Badge>
                                                : <Badge
                                                    color="info"
                                                    className="ml-3 kill-shadow"
                                                >
                                                    No scholarships assigned
                                                </Badge>
                                            }
                                        </h4>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>
                    </CardBody>
                </Card>

                <div className="note note-info mt-4">
                    <ul>
                        <li>
                            For inquiries regarding priority status, please directly contact your home college.
                        </li>
                        <li>
                            The scholarship status of <Badge color="danger" className="kill-shadow">For confirmation</Badge> requires the student to visit / contact the Office Student Services and Scholarships (OSSS) or the STFAP office. Failure to do so would mean that the assigned scholarship will not be applied to your tuition fee assessment.
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}