import { ROUTES } from "../../Utils/Constants";
import { axiosErrorHelper } from "../../Utils/ErrorHelper";
import Popup from "../../Utils/Popup";
import instanse from "./axios"

export const ACTION_TYPES = {
    GET_PATIENTTYPES_INIT: 'GET_PATIENTTYPES_INIT',
    GET_PATIENTTYPES_SUCCESS: 'GET_PATIENTTYPES_SUCCESS',
    GET_PATIENTTYPES_ERROR: 'GET_PATIENTTYPES_ERROR',

    GET_ALLPATIENTTYPES_INIT: 'GET_ALLPATIENTTYPES_INIT',
    GET_ALLPATIENTTYPES_SUCCESS: 'GET_ALLPATIENTTYPES_SUCCESS',
    GET_ALLPATIENTTYPES_ERROR: 'GET_ALLPATIENTTYPES_ERROR',

    GET_PATIENTTYPE_INIT: 'GET_PATIENTTYPE_INIT',
    GET_PATIENTTYPE_SUCCESS: 'GET_PATIENTTYPE_SUCCESS',
    GET_PATIENTTYPE_ERROR: 'GET_PATIENTTYPE_ERROR',

    ADD_PATIENTTYPE_INIT: 'ADD_PATIENTTYPE_INIT',
    ADD_PATIENTTYPE_SUCCESS: 'ADD_PATIENTTYPE_SUCCESS',
    ADD_PATIENTTYPE_ERROR: 'ADD_PATIENTTYPE_ERROR',

    EDIT_PATIENTTYPE_INIT: 'EDIT_PATIENTTYPE_INIT',
    EDIT_PATIENTTYPE_SUCCESS: 'EDIT_PATIENTTYPE_SUCCESS',
    EDIT_PATIENTTYPE_ERROR: 'EDIT_PATIENTTYPE_ERROR',

    DELETE_PATIENTTYPE_INIT: 'DELETE_PATIENTTYPE_INIT',
    DELETE_PATIENTTYPE_SUCCESS: 'DELETE_PATIENTTYPE_SUCCESS',
    DELETE_PATIENTTYPE_ERROR: 'DELETE_PATIENTTYPE_ERROR',

    REMOVE_SELECTED_PATIENTTYPE: 'REMOVE_SELECTED_PATIENTTYPE',

    FILL_PATIENTTYPES_NOTIFICATION: 'FILL_PATIENTTYPES_NOTIFICATION',
    REMOVE_PATIENTTYPES_NOTIFICATION: 'REMOVE_PATIENTTYPES_NOTIFICATION',
}

export const GetPatienttypes = () => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_PATIENTTYPES_INIT })
    await instanse.get(ROUTES.PATIENTTYPE + "/GetAll")
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_PATIENTTYPES_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_PATIENTTYPES_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_PATIENTTYPES_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const GetPatienttype = (guid) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_PATIENTTYPE_INIT })
    await instanse.get(ROUTES.PATIENTTYPE + `/Getselected?guid=${guid}`)
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_PATIENTTYPE_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_PATIENTTYPES_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_PATIENTTYPE_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const AddPatienttypes = (data, historypusher) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.ADD_PATIENTTYPE_INIT })
    await instanse.post(ROUTES.PATIENTTYPE + "/Add", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.ADD_PATIENTTYPE_SUCCESS, payload: response.data })
                historypusher.push('/Patienttypes')
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_PATIENTTYPES_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.ADD_PATIENTTYPE_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const EditPatienttypes = (data, historypusher) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.EDIT_PATIENTTYPE_INIT })
    await instanse.post(ROUTES.PATIENTTYPE + "/Update", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.EDIT_PATIENTTYPE_SUCCESS, payload: response.data })
                historypusher.push('/Patienttypes')
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_PATIENTTYPES_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.EDIT_PATIENTTYPE_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const DeletePatienttypes = (data) => async (dispatch, getState) => {
    delete data['edit']
    delete data['delete']
    dispatch({ type: ACTION_TYPES.DELETE_PATIENTTYPE_INIT })
    await instanse.post(ROUTES.PATIENTTYPE + "/Delete", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.DELETE_PATIENTTYPE_SUCCESS, payload: response.data })
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_PATIENTTYPES_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.DELETE_PATIENTTYPE_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const RemoveSelectedPatienttype = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.REMOVE_SELECTED_PATIENTTYPE, payload })
    }
}

export const fillPatienttypenotification = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.FILL_PATIENTTYPES_NOTIFICATION, payload })
    }
}

export const removePatienttypenotification = () => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.REMOVE_PATIENTTYPES_NOTIFICATION })
    }
}
