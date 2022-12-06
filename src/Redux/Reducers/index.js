import { combineReducers } from "@reduxjs/toolkit";
import CaseReducer from "./CaseReducer";
import DepartmentReducer from "./DepartmentReducer";
import ProfileReducer from "./ProfileReducer";
import RoleReducer from "./RoleReducer";
import StationReducer from "./StationReducer";
import UnitReducer from "./UnitReducer";


const reducers = combineReducers({
    Units: UnitReducer,
    Profile: ProfileReducer,
    Roles: RoleReducer,
    Departments: DepartmentReducer,
    Stations: StationReducer,
    Cases:CaseReducer
});

export default reducers;