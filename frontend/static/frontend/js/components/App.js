import React, {Component, lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Loading from "./Loading";
import Navigation from "./Navigation";
import Footer from "./Footer";
import RegularClassesView from "./RegularClassesView/RegularClassesView";

const LoggedOutView = lazy(() => import("./LoggedOutView/LoggedOutView")),
      LoggedInView = lazy(() => import("./LoggedInView/LoggedInView")),
      Handle404 = lazy(() => import("./Handle404"));


export default class App extends Component {
    state = {
        loggedIn: !!(localStorage.getItem("token")),
        userData: [],
        currentSemester: [],
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

        fetch("/api/academic-years")
            .then(res => res.json())
            .then(res => {
                this.setState({ currentSemester: res[2] });
            });
    }

    loginChangeView = userData => {
        this.setState({ loggedIn: true, userData });
    }

    logoutChangeView = () => {
        this.setState({ loggedIn: false, userData: [] });
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Navigation logoutChangeView={this.logoutChangeView} userData={this.state.userData} />
                    <main>
                        <Suspense fallback={<Loading />}>
                            <Switch>
                                <Route
                                    path="/regular-classes"
                                    render={() => (
                                        <RegularClassesView
                                            currentSemester={this.state.currentSemester}
                                        />
                                    )}
                                />
                                <Route
                                    path="/"
                                    render={() => (
                                        (this.state.loggedIn)
                                            ? <LoggedInView
                                                userData={this.state.userData}
                                                currentSemester={this.state.currentSemester}
                                            />
                                            : <LoggedOutView
                                                loginChangeView={this.loginChangeView}
                                            />
                                    )}
                                />
                                <Route component={Handle404} status={404} />
                            </Switch>
                        </Suspense>
                    </main>
                    <Footer />
                </Router>
            </Provider>
        );
    }
}
