import { ROUTES } from "../../Utils/Constants";
import AxiosErrorHelper from "../../Utils/AxiosErrorHelper";
import Popup from "../../Utils/Popup";
import instanse from "./axios"

export const ACTION_TYPES = {
    GET_PURCHASEORDERSTOCKMOVEMENTS_INIT: 'GET_PURCHASEORDERSTOCKMOVEMENTS_INIT',
    GET_PURCHASEORDERSTOCKMOVEMENTS_SUCCESS: 'GET_PURCHASEORDERSTOCKMOVEMENTS_SUCCESS',
    GET_PURCHASEORDERSTOCKMOVEMENTS_ERROR: 'GET_PURCHASEORDERSTOCKMOVEMENTS_ERROR',

    GET_ALLPURCHASEORDERSTOCKMOVEMENTS_INIT: 'GET_ALLPURCHASEORDERSTOCKMOVEMENTS_INIT',
    GET_ALLPURCHASEORDERSTOCKMOVEMENTS_SUCCESS: 'GET_ALLPURCHASEORDERSTOCKMOVEMENTS_SUCCESS',
    GET_ALLPURCHASEORDERSTOCKMOVEMENTS_ERROR: 'GET_ALLPURCHASEORDERSTOCKMOVEMENTS_ERROR',

    GET_PURCHASEORDERSTOCKMOVEMENT_INIT: 'GET_PURCHASEORDERSTOCKMOVEMENT_INIT',
    GET_PURCHASEORDERSTOCKMOVEMENT_SUCCESS: 'GET_PURCHASEORDERSTOCKMOVEMENT_SUCCESS',
    GET_PURCHASEORDERSTOCKMOVEMENT_ERROR: 'GET_PURCHASEORDERSTOCKMOVEMENT_ERROR',

    ADD_PURCHASEORDERSTOCKMOVEMENT_INIT: 'ADD_PURCHASEORDERSTOCKMOVEMENT_INIT',
    ADD_PURCHASEORDERSTOCKMOVEMENT_SUCCESS: 'ADD_PURCHASEORDERSTOCKMOVEMENT_SUCCESS',
    ADD_PURCHASEORDERSTOCKMOVEMENT_ERROR: 'ADD_PURCHASEORDERSTOCKMOVEMENT_ERROR',

    EDIT_PURCHASEORDERSTOCKMOVEMENT_INIT: 'EDIT_PURCHASEORDERSTOCKMOVEMENT_INIT',
    EDIT_PURCHASEORDERSTOCKMOVEMENT_SUCCESS: 'EDIT_PURCHASEORDERSTOCKMOVEMENT_SUCCESS',
    EDIT_PURCHASEORDERSTOCKMOVEMENT_ERROR: 'EDIT_PURCHASEORDERSTOCKMOVEMENT_ERROR',

    DELETE_PURCHASEORDERSTOCKMOVEMENT_INIT: 'DELETE_PURCHASEORDERSTOCKMOVEMENT_INIT',
    DELETE_PURCHASEORDERSTOCKMOVEMENT_SUCCESS: 'DELETE_PURCHASEORDERSTOCKMOVEMENT_SUCCESS',
    DELETE_PURCHASEORDERSTOCKMOVEMENT_ERROR: 'DELETE_PURCHASEORDERSTOCKMOVEMENT_ERROR',

    REMOVE_SELECTED_PURCHASEORDERSTOCKMOVEMENT: 'REMOVE_SELECTED_PURCHASEORDERSTOCKMOVEMENT',

    FILL_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION: 'FILL_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION',
    REMOVE_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION: 'REMOVE_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION',
}

export const GetPurchaseorderstockmovements = () => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_PURCHASEORDERSTOCKMOVEMENTS_INIT })
    await instanse.get(ROUTES.PURCHASEORDERSTOCKMOVEMENT + "/GetAll")
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_PURCHASEORDERSTOCKMOVEMENTS_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION, payload: AxiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_PURCHASEORDERSTOCKMOVEMENTS_ERROR, payload: AxiosErrorHelper(error) })
        })
}

export const GetPurchaseorderstockmovement = (guid) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.GET_PURCHASEORDERSTOCKMOVEMENT_INIT })
    await instanse.get(ROUTES.PURCHASEORDERSTOCKMOVEMENT + `/Getselected?guid=${guid}`)
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_PURCHASEORDERSTOCKMOVEMENT_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION, payload: AxiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.GET_PURCHASEORDERSTOCKMOVEMENT_ERROR, payload: AxiosErrorHelper(error) })
        })
}

export const AddPurchaseorderstockmovements = (data, historypusher) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.ADD_PURCHASEORDERSTOCKMOVEMENT_INIT })
    await instanse.post(ROUTES.PURCHASEORDERSTOCKMOVEMENT + "/Add", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.ADD_PURCHASEORDERSTOCKMOVEMENT_SUCCESS, payload: response.data })
                historypusher('/Purchaseorderstockmovements')
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION, payload: AxiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.ADD_PURCHASEORDERSTOCKMOVEMENT_ERROR, payload: AxiosErrorHelper(error) })
        })
}

export const EditPurchaseorderstockmovements = (data, historypusher) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.EDIT_PURCHASEORDERSTOCKMOVEMENT_INIT })
    await instanse.post(ROUTES.PURCHASEORDERSTOCKMOVEMENT + "/Update", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.EDIT_PURCHASEORDERSTOCKMOVEMENT_SUCCESS, payload: response.data })
                historypusher.push('/Purchaseorderstockmovements')
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION, payload: AxiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.EDIT_PURCHASEORDERSTOCKMOVEMENT_ERROR, payload: AxiosErrorHelper(error) })
        })
}

export const DeletePurchaseorderstockmovements = (data) => async (dispatch, getState) => {
    delete data['edit']
    delete data['delete']
    dispatch({ type: ACTION_TYPES.DELETE_PURCHASEORDERSTOCKMOVEMENT_INIT })
    await instanse.post(ROUTES.PURCHASEORDERSTOCKMOVEMENT + "/Delete", data)
        .then(response => {
            {
                dispatch({ type: ACTION_TYPES.DELETE_PURCHASEORDERSTOCKMOVEMENT_SUCCESS, payload: response.data })
            }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.FILL_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION, payload: AxiosErrorHelper(error) })
            dispatch({ type: ACTION_TYPES.DELETE_PURCHASEORDERSTOCKMOVEMENT_ERROR, payload: AxiosErrorHelper(error) })
        })
}

export const RemoveSelectedPurchaseorderstockmovement = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.REMOVE_SELECTED_PURCHASEORDERSTOCKMOVEMENT, payload })
    }
}

export const fillPurchaseorderstockmovementnotification = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.FILL_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION, payload })
    }
}

export const removePurchaseorderstockmovementnotification = () => {
    return (dispatch, getState) => {
        dispatch({ type: ACTION_TYPES.REMOVE_PURCHASEORDERSTOCKMOVEMENTS_NOTIFICATION })
    }
}
