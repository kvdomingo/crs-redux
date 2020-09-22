import React, {Component, Suspense} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Loading from "./Loading";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Routes from "./Routes";
import axiosInstance from "./axios/axiosDefault";
import GlobalStateListener from "./GlobalStateListener";


export default class App extends Component {
    state = {
        loggedIn: !!(localStorage.getItem("token")),
        currentSemester: [],
    }

    componentDidMount() {
        axiosInstance.get("/academic-years")
            .then(res => {
                this.setState({ currentSemester: res.data[2] });
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
                    <GlobalStateListener />
                    <Navigation logoutChangeView={this.logoutChangeView} />
                    <main>
                        <Suspense fallback={<Loading />}>
                            <Routes
                                { ...this.state }
                                loginChangeView={this.loginChangeView}
                            />
                        </Suspense>
                    </main>
                    <Footer />
                </Router>
            </Provider>
        );
    }
}
