import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Loading from "./Loading";

const LoggedOutView = lazy(() => import("./LoggedOutView"));


export default class App extends Component {
    state = {
        loggedIn: false
    }

    render() {
        return (
            <Router>
                <Suspense fallback={<Loading />}>
                    <LoggedOutView />
                </Suspense>
            </Router>
        );
    }
}