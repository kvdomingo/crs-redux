import React, {Component, lazy} from "react";
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBNav as Nav,
} from "mdbreact";
import { Link } from "react-router-dom";
import { Switch, Route, withRouter } from "react-router-dom";
import dateFormat from "dateformat";

const Home = lazy(() => import("./Home/Home")),
      Profile = lazy(() => import("./Profile/Profile")),
      Handle404 = lazy(() => import("../Handle404"));

const studentTabs = [
    { path: "/", name: "Home" },
    { path: "/profile", name: "Profile" },
    { path: "/preenlistment", name: "Pre-enlistment" },
    { path: "/loa", name: "Leave of Absence" },
    { path: "/dropping", name: "Dropping" },
    { path: "/grades-viewing", name: "Grades Viewing" },
    { path: "/payment", name: "Payment History" },
    { path: "/clearance", name: "University Clearance" },
    { path: "/set", name: "Student Evaluation of Teaching" },
];

const adminStudentTabs = [
    { path: "/", name: "Home" },
    { path: "/profile", name: "Profile" },
    { path: "/preenlistment", name: "Pre-enlistment" },
    { path: "/enlistment", name: "Enlistment" },
    { path: "/loa", name: "Leave of Absence" },
    { path: "/dropping", name: "Dropping" },
    { path: "/grades-submission", name: "Grades Submission" },
    { path: "/grades-viewing", name: "Grades Viewing" },
    { path: "/payment", name: "Payment History" },
    { path: "/clearance", name: "University Clearance" },
    { path: "/set", name: "Student Evaluation of Teaching" },
];

const adminTabs = [
    { path: "/", name: "Home" },
    { path: "/profile", name: "Profile" },
    { path: "/enlistment", name: "Enlistment" },
    { path: "/grades-submission", name: "Grades Submission" },
];


class LoggedInView extends Component {
    state = {
        activeTab: window.location.pathname,
        time: dateFormat(new Date(), "h:MM tt"),
        userData: [],
    }

    componentDidMount() {
        this.timeId = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    togglePills = activeTab => e => {
        this.setState({ activeTab });
    }

    tick = () => {
        this.setState({ time: dateFormat(new Date(), "h:MM tt") })
    }

    render() {
        let { userData } = this.props,
            userStatus = userData.user_status || [];

        return (
            <Container fluid className="p-0 p-md-4 mt-4">
                <Row>
                    <Col md="2">
                        <div className="text-center mb-3">
                            <small>
                                {dateFormat(new Date(), "dddd, d mmmm yyyy")} <br />
                                {this.state.time}
                            </small>
                        </div>
                        <Nav
                            tag="div"
                            className="nav-pills flex-column text-md-left text-center mb-5"
                            orientation="vertical"
                        >
                            {userStatus.is_crs_admin && ["Senior Faculty", "Staff"].includes(userStatus.user_status)
                                && adminTabs.map(({path, name}, i) => (
                                    <Link
                                        key={i}
                                        to={path}
                                        onClick={this.togglePills(path)}
                                        className={`nav-link ${(this.state.activeTab === path) ? "active" : null}`}
                                    >
                                        {name}
                                    </Link>
                                ))
                            }
                            {userStatus.is_crs_admin && userStatus.user_status === "Junior Faculty"
                                && adminStudentTabs.map(({path, name}, i) => (
                                    <Link
                                        key={i}
                                        to={path}
                                        onClick={this.togglePills(path)}
                                        className={`nav-link ${(this.state.activeTab === path) ? "active" : null}`}
                                    >
                                        {name}
                                    </Link>
                                ))
                            }
                            {userStatus.user_status === "Student"
                                && studentTabs.map(({ path, name }, i) => (
                                    <Link
                                        key={i}
                                        to={path}
                                        onClick={this.togglePills(path)}
                                        className={`nav-link ${(this.state.activeTab === path) ? "active" : null}`}
                                    >
                                        {name}
                                    </Link>
                                ))
                            }
                        </Nav>
                    </Col>
                    <Col md="10">
                        <Switch>
                            <Route
                                exact path="/"
                                render={() => (
                                    <Home userData={userData} />
                                )}
                            />
                            <Route
                                exact path="/profile"
                                render={() => (
                                    <Profile userData={userData} />
                                )}
                            />

                            <Route component={Handle404} status={404} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(LoggedInView);