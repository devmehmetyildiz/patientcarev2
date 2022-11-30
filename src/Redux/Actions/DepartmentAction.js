import { ROUTES } from "../../Utils/Constants";
import { axiosErrorHelper } from "../../Utils/ErrorHelper";
import Popup from "../../Utils/Popup";
import instanse from "./axios"

export const ACTION_TYPES = {
    GET_DEPARTMENTS_INIT: 'GET_DEPARTMENTS_INIT',
    GET_DEPARTMENTS_SUCCESS: 'GET_DEPARTMENTS_SUCCESS',
    GET_DEPARTMENTS_ERROR: 'GET_DEPARTMENTS_ERROR',

    GET_ALLDEPARTMENTS_INIT: 'GET_ALLDEPARTMENTS_INIT',
    GET_ALLDEPARTMENTS_SUCCESS: 'GET_ALLDEPARTMENTS_SUCCESS',
    GET_ALLDEPARTMENTS_ERROR: 'GET_ALLDEPARTMENTS_ERROR',

    GET_ALLSTATIONS_INIT: 'GET_ALLSTATIONS_INIT',
    GET_ALLSTATIONS_SUCCESS: 'GET_ALLSTATIONS_SUCCESS',
    GET_ALLSTATIONS_ERROR: 'GET_ALLSTATIONS_ERROR',

    GET_DEPARTMENT_INIT: 'GET_DEPARTMENT_INIT',
    GET_DEPARTMENT_SUCCESS: 'GET_DEPARTMENT_SUCCESS',
    GET_DEPARTMENT_ERROR: 'GET_DEPARTMENT_ERROR',

    ADD_DEPARTMENT_INIT: 'ADD_DEPARTMENT_INIT',
    ADD_DEPARTMENT_SUCCESS: 'ADD_DEPARTMENT_SUCCESS',
    ADD_DEPARTMENT_ERROR: 'ADD_DEPARTMENT_ERROR',

    EDIT_DEPARTMENT_INIT: 'EDIT_DEPARTMENT_INIT',
    EDIT_DEPARTMENT_SUCCESS: 'EDIT_DEPARTMENT_SUCCESS',
    EDIT_DEPARTMENT_ERROR: 'EDIT_DEPARTMENT_ERROR',

    DELETE_DEPARTMENT_INIT: 'DELETE_DEPARTMENT_INIT',
    DELETE_DEPARTMENT_SUCCESS: 'DELETE_DEPARTMENT_SUCCESS',
    DELETE_DEPARTMENT_ERROR: 'DELETE_DEPARTMENT_ERROR',

    REMOVE_SELECTED_DEPARTMENT: 'REMOVE_SELECTED_DEPARTMENT',

    FILL_DEPARTMENTS_NOTIFICATION: 'FILL_DEPARTMENTS_NOTIFICATION',
    REMOVE_DEPARTMENTS_NOTIFICATION: 'REMOVE_DEPARTMENTS_NOTIFICATION',
}

export const GetDepartments = () => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_DEPARTMENTS_INIT })
    await instanse.get(ROUTES.DEPARTMENT + "/GetAll")
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_DEPARTMENTS_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_DEPARTMENTS_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_DEPARTMENTS_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const GetDepartment = (guid) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_DEPARTMENT_INIT })
    await instanse.get(ROUTES.DEPARTMENT + `/Getselected?guid=${guid}`)
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_DEPARTMENT_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_DEPARTMENTS_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_DEPARTMENT_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const GetStations = () => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_ALLSTATIONS_INIT })
    await instanse.get(ROUTES.DEPARTMENT + "/GetAllStations")
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_ALLSTATIONS_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_DEPARTMENTS_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_ALLSTATIONS_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const AddDepartments = (data, historypusher) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.ADD_DEPARTMENT_INIT })
    await instanse.post(ROUTES.DEPARTMENT + "/Add", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.ADD_DEPARTMENT_SUCCESS, payload: response.data })
                historypusher.push('/Departments')
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_DEPARTMENTS_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.ADD_DEPARTMENT_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const EditDepartments = (data, historypusher) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.EDIT_DEPARTMENT_INIT })
    await instanse.post(ROUTES.DEPARTMENT + "/Update", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.EDIT_DEPARTMENT_SUCCESS, payload: response.data })
                historypusher.push('/Departments')
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_DEPARTMENTS_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.EDIT_DEPARTMENT_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const DeleteDepartments = (data) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.DELETE_DEPARTMENT_INIT })
    await instanse.post(ROUTES.DEPARTMENT + "/Delete", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.DELETE_DEPARTMENT_SUCCESS, payload: response.data })
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_DEPARTMENTS_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.DELETE_DEPARTMENT_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const RemoveSelected = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.REMOVE_SELECTED_DEPARTMENT, payload })
    }
}

export const fillnotification = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.FILL_DEPARTMENTS_NOTIFICATION, payload })
    }
}

export const removenotification = () => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.REMOVE_DEPARTMENTS_NOTIFICATION })
    }
}
