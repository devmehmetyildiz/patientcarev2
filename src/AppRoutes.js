import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from './Common/Spinner'

const Login = lazy(() => import('./Containers/Auth/Login'));
const Roles = lazy(() => import('./Containers/Roles/Roles'));
const RolesCreate = lazy(() => import('./Containers/Roles/RolesCreate'));
const RolesEdit = lazy(() => import('./Containers/Roles/RolesEdit'));

const Home = lazy(() => import('./Pages/Home'));


class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Roles" component={Roles} />
          <Route exact path="/Roles/Create" component={RolesCreate} />
          <Route exact path="/Roles/:RoleID/Edit" component={RolesEdit} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
