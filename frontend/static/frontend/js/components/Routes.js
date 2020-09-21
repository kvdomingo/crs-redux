import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";

const LoggedOutView = lazy(() => import("./LoggedOutView/LoggedOutView")),
      LoggedInView = lazy(() => import("./LoggedInView/LoggedInView")),
      Handle404 = lazy(() => import("./Handle404")),
      RegularClassesView = lazy(() => import("./RegularClassesView/RegularClassesView"));

const mapStateToProps = state => ({
    userData: state.userData.userData,
});

function Routes(props) {
    return (
        <Switch>
            <Route
                path="/regular-classes"
                render={() => (
                    <RegularClassesView
                        currentSemester={props.currentSemester}
                    />
                )}
            />
            <Route
                path="/"
                render={() => (
                    (props.loggedIn)
                        ? <LoggedInView
                            userData={props.userData}
                            currentSemester={props.currentSemester}
                        />
                        : <LoggedOutView
                            loginChangeView={props.loginChangeView}
                        />
                )}
            />
            <Route component={Handle404} status={404} />
        </Switch>
    );
}

export default connect(mapStateToProps)(Routes);
