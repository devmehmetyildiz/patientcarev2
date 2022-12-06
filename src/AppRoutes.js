import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from './Common/Spinner'

const Login = lazy(() => import('./Containers/Auth/Login'));
const Roles = lazy(() => import('./Containers/Roles/Roles'));
const RolesCreate = lazy(() => import('./Containers/Roles/RolesCreate'));
const RolesEdit = lazy(() => import('./Containers/Roles/RolesEdit'));

const Departments = lazy(() => import('./Containers/Departments/Departments'));
const DepartmentsCreate = lazy(() => import('./Containers/Departments/DepartmentsCreate'));
const DepartmentsEdit = lazy(() => import('./Containers/Departments/DepartmentsEdit'));

const Stations = lazy(() => import('./Containers/Stations/Stations'));
const StationsCreate = lazy(() => import('./Containers/Stations/StationsCreate'));
const StationsEdit = lazy(() => import('./Containers/Stations/StationsEdit'));

const Cases = lazy(() => import('./Containers/Cases/Cases'));
const CasesCreate = lazy(() => import('./Containers/Cases/CasesCreate'));
const CasesEdit = lazy(() => import('./Containers/Cases/CasesEdit'));

const Units = lazy(() => import('./Containers/Units/Units'));
const UnitsCreate = lazy(() => import('./Containers/Units/UnitsCreate'));
const UnitsEdit = lazy(() => import('./Containers/Units/UnitsEdit'));

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
          <Route exact path="/Departments" component={Departments} />
          <Route exact path="/Departments/Create" component={DepartmentsCreate} />
          <Route exact path="/Departments/:DepartmentID/Edit" component={DepartmentsEdit} />
          <Route exact path="/Stations" component={Stations} />
          <Route exact path="/Stations/Create" component={StationsCreate} />
          <Route exact path="/Stations/:StationID/Edit" component={StationsEdit} />
          <Route exact path="/Cases" component={Cases} />
          <Route exact path="/Cases/Create" component={CasesCreate} />
          <Route exact path="/Cases/:CaseID/Edit" component={CasesEdit} />
          <Route exact path="/Units" component={Units} />
          <Route exact path="/Units/Create" component={UnitsCreate} />
          <Route exact path="/Units/:UnitID/Edit" component={UnitsEdit} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
