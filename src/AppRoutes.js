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

const Users = lazy(() => import('./Containers/Users/Users'));
const UsersCreate = lazy(() => import('./Containers/Users/UsersCreate'));
const UsersEdit = lazy(() => import('./Containers/Users/UsersEdit'));

const Stockdefines = lazy(() => import('./Containers/Stockdefines/Stockdefines'));
const StockdefinesCreate = lazy(() => import('./Containers/Stockdefines/StockdefinesCreate'));
const StockdefinesEdit = lazy(() => import('./Containers/Stockdefines/StockdefinesEdit'));

const Files = lazy(() => import('./Containers/Files/Files'));
const FilesCreate = lazy(() => import('./Containers/Files/FilesCreate'));
const FilesEdit = lazy(() => import('./Containers/Files/FilesEdit'));

const Purchaseorders = lazy(() => import('./Containers/Purchaseorders/Purchaseorders'));
const PurchaseordersCreate = lazy(() => import('./Containers/Purchaseorders/PurchaseordersCreate'));
const PurchaseordersEdit = lazy(() => import('./Containers/Purchaseorders/PurchaseordersEdit'));

const Stocks = lazy(() => import('./Containers/Stocks/Stocks'));
const StocksCreate = lazy(() => import('./Containers/Stocks/StocksCreate'));
const StocksEdit = lazy(() => import('./Containers/Stocks/StocksEdit'));
const Stocksmovements = lazy(() => import('./Containers/Stocks/Stockmovements'));
const Stockmovementsdetail = lazy(() => import('./Containers/Stocks/Stockmovementsdetail'));

const PasswordChange = lazy(() => import('./Pages/Home'));
const ProfileEdit = lazy(() => import('./Containers/Auth/ProfileEdit'));
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
          <Route exact path="/Stockdefines" component={Stockdefines} />
          <Route exact path="/Stockdefines/Create" component={StockdefinesCreate} />
          <Route exact path="/Stockdefines/:StockdefineID/Edit" component={StockdefinesEdit} />
          <Route exact path="/Stocks" component={Stocks} />
          <Route exact path="/Stocks/Create" component={StocksCreate} />
          <Route exact path="/Stocks/:StockID/Edit" component={StocksEdit} />
          <Route exact path="/Stockmovements" component={Stocksmovements} />
          <Route exact path="/Stockmovement/:StockmovementID" component={Stockmovementsdetail} />
          <Route exact path="/Stockmovement" component={Stockmovementsdetail} />
          <Route exact path="/Users" component={Users} />
          <Route exact path="/Users/Create" component={UsersCreate} />
          <Route exact path="/Users/:UserID/Edit" component={UsersEdit} />
          <Route exact path="/Files" component={Files} />
          <Route exact path="/Files/Create" component={FilesCreate} />
          <Route exact path="/Files/:FileID/Edit" component={FilesEdit} />
          <Route exact path="/Purchaseorders" component={Purchaseorders} />
          <Route exact path="/Purchaseorders/Create" component={PurchaseordersCreate} />
          <Route exact path="/Purchaseorders/:PurchaseorderID/Edit" component={PurchaseordersEdit} />
          <Route exact path="/Profile/Edit" component={ProfileEdit} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
