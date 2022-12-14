import { combineReducers } from "@reduxjs/toolkit";
import CaseReducer from "./CaseReducer";
import DepartmentReducer from "./DepartmentReducer";
import ProfileReducer from "./ProfileReducer";
import RoleReducer from "./RoleReducer";
import StationReducer from "./StationReducer";
import UnitReducer from "./UnitReducer";
import StockdefinesReducer from "./StockdefineReducer"
import StockReducer from "./StockReducer"
import StockmovementsReducer from "./StockmovementReducer";
import UserReducer from "./UserReducer";
import FileReducer from "./FileReducer";
import PurchaseorderReducer from "./PurchaseorderReducer"
import PatienttypeReducer from "./PatienttypeReducer"
import CostumertypeReducer from "./CostumertypeReducer"
import PatientdefineReducer from "./PatientdefineReducer"
import PatientReducer from "./PatientReducer";

const reducers = combineReducers({
    Units: UnitReducer,
    Profile: ProfileReducer,
    Roles: RoleReducer,
    Departments: DepartmentReducer,
    Stations: StationReducer,
    Cases: CaseReducer,
    Stockdefines: StockdefinesReducer,
    Stocks: StockReducer,
    Stockmovements: StockmovementsReducer,
    Users: UserReducer,
    Files: FileReducer,
    Purchaseorders: PurchaseorderReducer,
    Costumertypes: CostumertypeReducer,
    Patienttypes: PatienttypeReducer,
    Patientdefines: PatientdefineReducer,
    Patients:PatientReducer
});

export default reducers;