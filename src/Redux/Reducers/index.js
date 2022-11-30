import { combineReducers } from "@reduxjs/toolkit";
import ProfileReducer from "./ProfileReducer";
import RoleReducer from "./RoleReducer";
import { UnitReducer } from "./UnitReducer";

const reducers = combineReducers({
    Units: UnitReducer,
    Profile: ProfileReducer,
    Roles: RoleReducer
});

export default reducers;