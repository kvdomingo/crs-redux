import React, {Component, lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Loading from "./Loading";
import Navigation from "./Navigation";
import Footer from "./Footer";

const LoggedOutView = lazy(() => import("./LoggedOutView/LoggedOutView")),
      LoggedInView = lazy(() => import("./LoggedInView/LoggedInView"));


export default class App extends Component {
    state = {
        loggedIn: !!(localStorage.getItem("token")),
        userData: [],
    }

    componentDidMount() {
        if (this.state.loggedIn) {
            fetch("/api/auth/user/current", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("token")}`,
                },
            })
                .then(res => res.json())
                .then(res => {
                    if (res.detail) {
                        localStorage.removeItem("token");
                        this.setState({ loggedIn: false, userData: [] });
                    } else {
                        this.setState({
                            loggedIn: true,
                            userData: res,
                        })
                    }
                });
        }
    }

    loginChangeView = userData => {
        this.setState({ loggedIn: true, userData });
    }

    logoutChangeView = () => {
        this.setState({ loggedIn: false, userData: [] });
    }

    render() {
        return (
            <Router>
                <Navigation logoutChangeView={this.logoutChangeView} userData={this.state.userData} />
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route
                            path="/"
                            render={() => (
                                (this.state.loggedIn)
                                    ? <LoggedInView userData={this.state.userData} />
                                    : <LoggedOutView loginChangeView={this.loginChangeView} />
                            )}
                        />
                    </Switch>
                </Suspense>
                <Footer />
            </Router>
        );
    }
}