import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";

const LoggedOutView = lazy(() => import("./LoggedOutView/LoggedOutView")),
      LoggedInView = lazy(() => import("./LoggedInView/LoggedInView")),
      Handle404 = lazy(() => import("./Handle404")),
      RegularClassesView = lazy(() => import("./RegularClassesView/RegularClassesView"));

const mapStateToProps = state => ({
    userData: state.userData,
    crsData: state.crsData,
});

function Routes({ crsData, loggedIn, userData }) {
    return (
        <Switch>
            <Route
                path="/regular-classes"
                render={() => (
                    <RegularClassesView
                        currentSemester={crsData.currentSemester}
                    />
                )}
            />
            <Route
                path="/"
                render={() => (
                    (loggedIn)
                        ? <LoggedInView
                            userData={userData.userData}
                            currentSemester={crsData.currentSemester}
                        />
                        : <LoggedOutView />
                )}
            />
            <Route component={Handle404} status={404} />
        </Switch>
    );
}

export default connect(mapStateToProps)(Routes);
