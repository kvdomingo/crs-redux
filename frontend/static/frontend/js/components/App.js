import React, {Component, lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Loading from "./Loading";
import Navigation from "./Navigation";

const LoggedOutView = lazy(() => import('./LoggedOutView/LoggedOutView'));


export default class App extends Component {
    state = {
        loggedIn: !!(localStorage.getItem('token')),
        userData: "",
    }

    handleLogin = data => {
        let { username, password } = data;
        fetch("/api/auth/token-auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password})
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("token", data.token);
                this.setState({
                    userData: data,
                    loggedIn: true,
                });
            });
    }

    handleLogout = () => {
        localStorage.removeItem("token");
        this.setState({ loggedIn: false, userData: "" });
    }

    render() {
        return (
            <Router>
                <Navigation />
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route
                            exact path="/"
                            render={() => (
                                <LoggedOutView
                                    handleLogin={this.handleLogin}
                                />
                            )}
                        />
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}