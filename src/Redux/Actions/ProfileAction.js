import instanse from "./axios"
import cookies from 'universal-cookie';
import AxiosErrorHelper from '../../Utils/AxiosErrorHelper';
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";

export const ACTION_TYPES = {
  LOGIN_REQUEST_INIT: 'LOGIN_REQUEST_INIT',
  LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS',
  LOGIN_REQUEST_ERROR: 'LOGIN_REQUEST_ERROR',

  LOGOUT_REQUEST_INIT: 'LOGOUT_REQUEST_INIT',
  LOGOUT_REQUEST_SUCCESS: 'LOGOUT_REQUEST_SUCCESS',

  GET_ACTIVEUSER_INIT: 'GET_ACTIVEUSER_INIT',
  GET_ACTIVEUSER_SUCCESS: 'GET_ACTIVEUSER_SUCCESS',
  GET_ACTIVEUSER_ERROR: 'GET_ACTIVEUSER_ERROR',

  GET_USERMETA_INIT: 'GET_USERMETA_INIT',
  GET_USERMETA_SUCCESS: 'GET_USERMETA_SUCCESS',
  GET_USERMETA_ERROR: 'GET_USERMETA_ERROR',

  GET_USERSROLES_INIT: 'GET_USERSROLES_INIT',
  GET_USERSROLES_SUCCESS: 'GET_USERSROLES_SUCCESS',
  GET_USERSROLES_ERROR: 'GET_USERSROLES_ERROR',

  CHECK_PASSWORD_INIT: 'CHECK_PASSWORD_INIT',
  CHECK_PASSWORD_SUCCESS: 'CHECK_PASSWORD_SUCCESS',
  CHECK_PASSWORD_ERROR: 'CHECK_PASSWORD_ERROR',

  FILL_USER_NOTIFICATION: 'FILL_USER_NOTIFICATION',
  REMOVE_USER_NOTIFICATION: 'REMOVE_USER_NOTIFICATION',
}

export const logIn = (data, historyPusher, redirecturl) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.LOGIN_REQUEST_INIT })
    instanse.post(`/auth/login`, data)
      .then(result => {
        dispatch({ type: ACTION_TYPES.LOGIN_REQUEST_SUCCESS })
        // redirecturl ? window.location = (redirecturl) : window.location = ('Home')
         window.location = ('Home')
      })
      .catch(error => {
        dispatch({ type: ACTION_TYPES.FILL_USER_NOTIFICATION, payload: AxiosErrorHelper(error) })
        dispatch({ type: ACTION_TYPES.LOGIN_REQUEST_ERROR, payload: AxiosErrorHelper(error) })
      })
  }
}

export const GetActiveUser = () => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.GET_ACTIVEUSER_INIT })
  await instanse.get("Auth/GetActiveUser")
    .then(response => {
      dispatch({ type: ACTION_TYPES.GET_ACTIVEUSER_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: ACTION_TYPES.FILL_USER_NOTIFICATION, payload: AxiosErrorHelper(error) })
      dispatch({ type: ACTION_TYPES.GET_ACTIVEUSER_ERROR, payload: AxiosErrorHelper(error) })
    })
}

export const GetUserMeta = () => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.GET_USERMETA_INIT })
  await instanse.get("Auth/GetUserMeta")
    .then(response => {
      dispatch({ type: ACTION_TYPES.GET_USERMETA_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: ACTION_TYPES.FILL_USER_NOTIFICATION, payload: AxiosErrorHelper(error) })
      dispatch({ type: ACTION_TYPES.GET_USERMETA_ERROR, payload: AxiosErrorHelper(error) })
    })
}
export const GetUserRoles = () => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.GET_USERSROLES_INIT })
  await instanse.get("Auth/GetUserRoles")
    .then(response => {
      dispatch({ type: ACTION_TYPES.GET_USERSROLES_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: ACTION_TYPES.FILL_USER_NOTIFICATION, payload: AxiosErrorHelper(error) })
      dispatch({ type: ACTION_TYPES.GET_USERSROLES_ERROR, payload: AxiosErrorHelper(error) })
    })
}

export const ChangePassword = (data) => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.GET_USERSROLES_INIT })
  await instanse.post("Auth/ChangePassword", data)
    .then(response => {
      { dispatch({ type: ACTION_TYPES.GET_USERSROLES_SUCCESS, payload: response.data }) }
    })
    .catch(error => {
      dispatch({ type: ACTION_TYPES.FILL_USER_NOTIFICATION, payload: AxiosErrorHelper(error) })
      dispatch({ type: ACTION_TYPES.GET_USERSROLES_ERROR, payload: AxiosErrorHelper(error) })
    })
}

export const fillnotification = payload => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.FILL_USER_NOTIFICATION, payload })
  }
}

export const removenotification = () => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.REMOVE_USER_NOTIFICATION })
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch({ type: ACTION_TYPES.LOGOUT_REQUEST_INIT })
    const localcookies = new cookies();
    localcookies.remove('patientcare')
    dispatch({ type: ACTION_TYPES.LOGOUT_REQUEST_SUCCESS })
    window.location = '/Login'
  }
}

