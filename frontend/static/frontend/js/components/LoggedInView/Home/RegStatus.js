import React from "react";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBListGroup as ListGroup,
    MDBListGroupItem as ListGroupItem,
    MDBBadge as Badge,
    MDBRow as Row,
    MDBCol as Col,
} from "mdbreact";
import { connect } from "react-redux";


const mapStateToProps = state => ({
    userData: state.userData,
    crsData: state.crsData
});

function RegStatus({ userData, crsData }) {
    userData = userData.userData || [];
    let status = userData.user_status || [],
        delinquencies = userData.delinquency || [],
        { currentSemester } = crsData || [];

    return (
        <div>
            <Card className="kill-card-shadow">
                <CardHeader className="text-uppercase font-weight-bold">
                    {currentSemester.semester}, A.Y. {currentSemester.start_year}-{currentSemester.start_year + 1}
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
                                        {(delinquencies.length > 0)
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
                                        <Badge
                                            color="info"
                                            className="ml-3 kill-shadow"
                                        >
                                            {status.scholarship ? status.scholarship : "No scholarships assigned"}
                                        </Badge>
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

export default connect(mapStateToProps)(RegStatus);
