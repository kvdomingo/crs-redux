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
      Profile = lazy(() => import("./Profile/Profile"));

const tabs = [
    { path: "/", name: "Home" },
    { path: "/profile", name: "Profile" },
    { path: "/preenlistment", name: "Pre-enlistment" },
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
        return (
            <Container fluid className="p-4 mt-4">
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
                            className="nav-pills flex-column text-md-left text-center"
                            orientation="vertical"
                        >
                            {tabs.map(({ path, name }, i) => (
                                <Link
                                    key={i}
                                    to={path}
                                    onClick={this.togglePills(path)}
                                    className={`nav-link ${(this.state.activeTab === path) ? "active" : null}`}
                                >
                                    {name}
                                </Link>
                            ))}
                        </Nav>
                    </Col>
                    <Col md="10">
                        <Switch>
                            <Route
                                exact path="/"
                                render={() => (
                                    <Home userData={this.props.userData} />
                                )}
                            />
                            <Route
                                exact path="/profile"
                                render={() => (
                                    <Profile userData={this.props.userData} />
                                )}
                            />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(LoggedInView);