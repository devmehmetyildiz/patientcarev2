import { ROUTES } from "../../Utils/Constants";
import AxiosErrorHelper from "../../Utils/AxiosErrorHelper";
import Popup from "../../Utils/Popup";
import instanse from "./axios"

export const ACTION_TYPES = {
    GET_STOCKMOVEMENTS_INIT: 'GET_STOCKMOVEMENTS_INIT',
    GET_STOCKMOVEMENTS_SUCCESS: 'GET_STOCKMOVEMENTS_SUCCESS',
    GET_STOCKMOVEMENTS_ERROR: 'GET_STOCKMOVEMENTS_ERROR',

    GET_STOCKMOVEMENT_INIT: 'GET_STOCKMOVEMENT_INIT',
    GET_STOCKMOVEMENT_SUCCESS: 'GET_STOCKMOVEMENT_SUCCESS',
    GET_STOCKMOVEMENT_ERROR: 'GET_STOCKMOVEMENT_ERROR',

    REMOVE_SELECTED_STOCKMOVEMENT: 'REMOVE_SELECTED_STOCKMOVEMENT',

    FILL_STOCKMOVEMENT_NOTIFICATION: 'FILL_STOCKMOVEMENT_NOTIFICATION',
    REMOVE_STOCKMOVEMENT_NOTIFICATION: 'REMOVE_STOCKMOVEMENT_NOTIFICATION',
}

export const GetStockmovements = () => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_STOCKMOVEMENTS_INIT })
    await instanse.get(ROUTES.STOCKMOVEMENT + "/GetAll")
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_STOCKMOVEMENTS_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_STOCKMOVEMENT_NOTIFICATION, payload: AxiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_STOCKMOVEMENTS_ERROR, payload: AxiosErrorHelper(error) })
        })
}

export const GetStockmovement = (guid) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_STOCKMOVEMENT_INIT })
    await instanse.get(ROUTES.STOCKMOVEMENT + `/Getselected?guid=${guid}`)
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_STOCKMOVEMENT_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_STOCKMOVEMENT_NOTIFICATION, payload: AxiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_STOCKMOVEMENT_ERROR, payload: AxiosErrorHelper(error) })
        })
}

export const RemoveSelectedStockmovement = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.REMOVE_SELECTED_STOCKMOVEMENT, payload })
    }
}

export const fillStockmovementnotification = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.FILL_STOCKMOVEMENT_NOTIFICATION, payload })
    }
}

export const removeStockmovementnotification = () => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.REMOVE_STOCKMOVEMENT_NOTIFICATION })
    }
}



