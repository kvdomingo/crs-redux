import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const LoggedOutView = lazy(() => import('./LoggedOutView/LoggedOutView'));

const routes = [
    { path: "/", Component: LoggedOutView },
]

export default (
    <Switch>
        {routes.map(({ path, Component }, i) => (
            <Route exact path={path} component={Component} key={i} />
        ))}
    </Switch>
);