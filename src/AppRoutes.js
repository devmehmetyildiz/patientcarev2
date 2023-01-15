import React, { Component, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from './Common/Spinner'
import PrivateRoute from './Utils/Protectedroutes';

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

const Patienttypes = lazy(() => import('./Containers/Patienttypes/Patienttypes'));
const PatienttypesCreate = lazy(() => import('./Containers/Patienttypes/PatienttypesCreate'));
const PatienttypesEdit = lazy(() => import('./Containers/Patienttypes/PatienttypesEdit'));

const Costumertypes = lazy(() => import('./Containers/Costumertypes/Costumertypes'));
const CostumertypesCreate = lazy(() => import('./Containers/Costumertypes/CostumertypesCreate'));
const CostumertypesEdit = lazy(() => import('./Containers/Costumertypes/CostumertypesEdit'));

const Patientdefines = lazy(() => import('./Containers/Patientdefines/Patientdefines'));
const PatientdefinesCreate = lazy(() => import('./Containers/Patientdefines/PatientdefinesCreate'));
const PatientdefinesEdit = lazy(() => import('./Containers/Patientdefines/PatientdefinesEdit'));

const Patients = lazy(() => import('./Containers/Patients/Patients'));
const PatientsCreate = lazy(() => import('./Containers/Patients/PatientsCreate'));
const PatientsEdit = lazy(() => import('./Containers/Patients/PatientsEdit'));

const Preregistrations = lazy(() => import('./Containers/Preregistrations/Preregistrations'));
const PreregistrationsCreate = lazy(() => import('./Containers/Preregistrations/PreregistrationsCreate'));
const PreregistrationsEdit = lazy(() => import('./Containers/Preregistrations/PreregistrationsEdit'));
const PreregistrationsEditfile = lazy(() => import('./Containers/Preregistrations/PreregistrationsEditfile'));
const PreregistrationsEditstock = lazy(() => import('./Containers/Preregistrations/PreregistrationsEditstock'));

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

    const routes = [
      { exact: true, path: "/Login", auth: false, component: <Login /> },
      { exact: true, path: "/Home", auth: true, component: <Home /> },
      { exact: true, path: "/Roles", auth: true, component: <Roles /> },
      { exact: true, path: "/Roles/Create", auth: true, component: <RolesCreate /> },
      { exact: true, path: "/Roles/:RoleID/Edit", auth: true, component: <RolesEdit /> },
      { exact: true, path: "/Departments", auth: true, component: <Departments /> },
      { exact: true, path: "/Departments/Create", auth: true, component: <DepartmentsCreate /> },
      { exact: true, path: "/Departments/:DepartmentID/Edit", auth: true, component: <DepartmentsEdit /> },
      { exact: true, path: "/Stations", auth: true, component: <Stations /> },
      { exact: true, path: "/Stations/Create", auth: true, component: <StationsCreate /> },
      { exact: true, path: "/Stations/:StationID/Edit", auth: true, component: <StationsEdit /> },
      { exact: true, path: "/Cases", auth: true, component: <Cases /> },
      { exact: true, path: "/Cases/Create", auth: true, component: <CasesCreate /> },
      { exact: true, path: "/Cases/:CaseID/Edit", auth: true, component: <CasesEdit /> },
      { exact: true, path: "/Units", auth: true, component: <Units /> },
      { exact: true, path: "/Units/Create", auth: true, component: <UnitsCreate /> },
      { exact: true, path: "/Units/:UnitID/Edit", auth: true, component: <UnitsEdit /> },
      { exact: true, path: "/Stockdefines", auth: true, component: <Stockdefines /> },
      { exact: true, path: "/Stockdefines/Create", auth: true, component: < StockdefinesCreate /> },
      { exact: true, path: "/Stockdefines/:StockdefineID/Edit", auth: true, component: <StockdefinesEdit /> },
      { exact: true, path: "/Stocks", auth: true, component: <Stocks /> },
      { exact: true, path: "/Stocks/Create", auth: true, component: < StocksCreate /> },
      { exact: true, path: "/Stocks/:StockID/Edit", auth: true, component: <StocksEdit /> },
      { exact: true, path: "/Stockmovements", auth: true, component: < Stocksmovements /> },
      { exact: true, path: "/Stockmovement/:StockmovementID", auth: true, component: <Stockmovementsdetail /> },
      { exact: true, path: "/Stockmovement", auth: true, component: < Stockmovementsdetail /> },
      { exact: true, path: "/Users", auth: true, component: < Users /> },
      { exact: true, path: "/Users/Create", auth: true, component: < UsersCreate /> },
      { exact: true, path: "/Users/:UserID/Edit", auth: true, component: <UsersEdit /> },
      { exact: true, path: "/Files", auth: true, component: <Files /> },
      { exact: true, path: "/Files/Create", auth: true, component: <FilesCreate /> },
      { exact: true, path: "/Files/:FileID/Edit", auth: true, component: <FilesEdit /> },
      { exact: true, path: "/Purchaseorders", auth: true, component: < Purchaseorders /> },
      { exact: true, path: "/Purchaseorders/Create", auth: true, component: <PurchaseordersCreate /> },
      { exact: true, path: "/Purchaseorders/:PurchaseorderID/Edit", auth: true, component: <PurchaseordersEdit /> },
      { exact: true, path: "/Costumertypes", auth: true, component: < Costumertypes /> },
      { exact: true, path: "/Costumertypes/Create", auth: true, component: <CostumertypesCreate /> },
      { exact: true, path: "/Costumertypes/:CostumertypeID/Edit", auth: true, component: <CostumertypesEdit /> },
      { exact: true, path: "/Patienttypes", auth: true, component: <Patienttypes /> },
      { exact: true, path: "/Patienttypes/Create", auth: true, component: <PatienttypesCreate /> },
      { exact: true, path: "/Patienttypes/:PatienttypeID/Edit", auth: true, component: < PatienttypesEdit /> },
      { exact: true, path: "/Patientdefines", auth: true, component: <Patientdefines /> },
      { exact: true, path: "/Patientdefines/Create", auth: true, component: <PatientdefinesCreate /> },
      { exact: true, path: "/Patientdefines/:PatientdefineID/Edit", auth: true, component: <PatientdefinesEdit /> },
      { exact: true, path: "/Patients", auth: true, component: <Patients /> },
      { exact: true, path: "/Patients/Create", auth: true, component: <PatientsCreate /> },
      { exact: true, path: "/Patients/:PatientID/Edit", auth: true, component: <PatientsEdit /> },
      { exact: true, path: "/Preregistrations", auth: true, component: <Preregistrations /> },
      { exact: true, path: "/Preregistrations/Create", auth: true, component: <PreregistrationsCreate /> },
      { exact: true, path: "/Preregistrations/:PatientID/Edit", auth: true, component: <PreregistrationsEdit /> },
      { exact: true, path: "/Preregistrations/:PatientID/Editfile", auth: true, component: <PreregistrationsEditfile /> },
      { exact: true, path: "/Preregistrations/:PatientID/Editstock", auth: true, component: <PreregistrationsEditstock /> },
      { exact: true, path: "/Profile/Edit", auth: true, component: <ProfileEdit /> }
    ]

    return (
      <Suspense fallback={<Spinner />}>
        <Routes>
          {routes.map((route, index) => {
            return route.auth ? <Route key={index} exact={route.exact} path={route.path} element={<PrivateRoute />}>
              <Route key={index} exact={route.exact} path={route.path} element={route.component} />
            </Route> : <Route key={index} exact={route.exact} path={route.path} element={route.component} />
          })}
        </Routes>
      </Suspense>
    );
  }
}

export default AppRoutes;
