import React, { Component, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Loading from "./Loading";
import Navigation from "./Navigation";
import Routes from "./Routes";


export default class App extends Component {
    state = {
        loggedIn: false,
    }

    render() {
        return (
            <Router>
                <Navigation />
                <Suspense fallback={<Loading />}>
                    {Routes}
                </Suspense>
            </Router>
        );
    }
}