import React, {Component, lazy} from "react";
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBNav as Nav,
} from "mdbreact";
import { Link } from "react-router-dom";
import { Switch, Route, withRouter } from "react-router-dom";

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
    }

    togglePills = activeTab => e => {
        this.setState({ activeTab });
    }

    render() {
        return (
            <Container fluid className="p-4 mt-4">
                <Row>
                    <Col md="2">
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