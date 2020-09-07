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
    render() {
        let { userData } = this.props,
            priorityChoices = {
                LOW: "Low",
                REG: "Regular",
                FST: "Freshman",
                GRD: "Graduating",
                CCO: "Cadet Officer",
            };

        return (
            <div>
                <Type tag="h1" variant="h2-responsive" className="mb-4">
                    Student homepage for {userData.username}
                </Type>
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
                                            {(userData.registration_status)
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
                                                {priorityChoices[userData.preenlistment_priority]}
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
                                                {priorityChoices[userData.registration_priority]}
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
                                            {(userData.academic_eligibility)
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
                                            {(userData.accountability_status)
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
                                            {(userData.deficiencies)
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