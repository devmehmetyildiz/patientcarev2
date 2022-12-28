import { ROUTES } from "../../Utils/Constants";
import { axiosErrorHelper } from "../../Utils/ErrorHelper";
import Popup from "../../Utils/Popup";
import instanse from "./axios"
import cookies from 'universal-cookie';
import axios from "axios";

export const ACTION_TYPES = {
    GET_FILES_INIT: 'GET_FILES_INIT',
    GET_FILES_SUCCESS: 'GET_FILES_SUCCESS',
    GET_FILES_ERROR: 'GET_FILES_ERROR',

    GET_FILE_INIT: 'GET_FILE_INIT',
    GET_FILE_SUCCESS: 'GET_FILE_SUCCESS',
    GET_FILE_ERROR: 'GET_FILE_ERROR',

    ADD_FILE_INIT: 'ADD_FILE_INIT',
    ADD_FILE_SUCCESS: 'ADD_FILE_SUCCESS',
    ADD_FILE_ERROR: 'ADD_FILE_ERROR',

    EDIT_FILE_INIT: 'EDIT_FILE_INIT',
    EDIT_FILE_SUCCESS: 'EDIT_FILE_SUCCESS',
    EDIT_FILE_ERROR: 'EDIT_FILE_ERROR',

    DELETE_FILE_INIT: 'DELETE_FILE_INIT',
    DELETE_FILE_SUCCESS: 'DELETE_FILE_SUCCESS',
    DELETE_FILE_ERROR: 'DELETE_FILE_ERROR',

    REMOVE_SELECTED_FILE: 'REMOVE_SELECTED_FILE',

    FILL_FILES_NOTIFICATION: 'FILL_FILES_NOTIFICATION',
    REMOVE_FILES_NOTIFICATION: 'REMOVE_FILES_NOTIFICATION',
}

export const GetFiles = () => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_FILES_INIT })
    await instanse.get(ROUTES.FILE + "/GetAll")
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_FILES_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_FILES_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_FILES_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const GetFile = (guid) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_FILE_INIT })
    await instanse.get(ROUTES.FILE + `/Getselected?guid=${guid}`)
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_FILE_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_FILES_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_FILE_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const AddFiles = (data, historypusher) => async (dispatch, getState) => {
    const localcookies = new cookies();
    dispatch({ type: ACTION_TYPES.ADD_FILE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/Add`,
        headers: { Authorization: "Bearer  " + localcookies.get('patientcare'), contentType: 'multipart/form-data' },
        data: data
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.ADD_FILE_SUCCESS })
            historypusher.push("/Files")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_FILES_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.ADD_FILE_ERROR, payload: error })
        })
}

export const EditFiles = (data, historypusher) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.EDIT_FILE_INIT })
    await instanse.post(ROUTES.FILE + "/Update", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.EDIT_FILE_SUCCESS, payload: response.data })
                historypusher.push('/Files')
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_FILES_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.EDIT_FILE_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const DeleteFiles = (data) => async (dispatch, getState) => {
    delete data['edit']
    delete data['delete']
    dispatch({ type: ACTION_TYPES.DELETE_FILE_INIT })
    await instanse.post(ROUTES.FILE + "/Files", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.DELETE_FILE_SUCCESS, payload: response.data })
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_FILES_NOTIFICATION, payload: axiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.DELETE_FILE_ERROR, payload: axiosErrorHelper(error) })
        })
}

export const RemoveSelectedFile = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.REMOVE_SELECTED_FILE, payload })
    }
}

export const fillFilenotification = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.FILL_FILES_NOTIFICATION, payload })
    }
}

export const removeFilenotification = () => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.REMOVE_FILES_NOTIFICATION })
    }
}
