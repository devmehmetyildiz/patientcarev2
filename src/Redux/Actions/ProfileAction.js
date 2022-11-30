import axios from 'axios'
import Cookies from 'universal-cookie';
import { axiosErrorHelper } from '../../Utils/ErrorHelper';

export const ACTION_TYPES = {
  LOGIN_REQUEST_INIT: 'LOGIN_REQUEST_INIT',
  LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS',
  LOGIN_REQUEST_ERROR: 'LOGIN_REQUEST_ERROR',

  LOGOUT_REQUEST_INIT: 'LOGOUT_REQUEST_INIT',
  LOGOUT_REQUEST_SUCCESS: 'LOGOUT_REQUEST_SUCCESS',

  FILL_USER_NOTIFICATION: 'FILL_USER_NOTIFICATION',
  REMOVE_USER_NOTIFICATION: 'REMOVE_USER_NOTIFICATION',
}

export const logIn = (data, historyPusher, redirecturl) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.LOGIN_REQUEST_INIT })
    return axios.post(process.env.REACT_APP_BACKEND_URL + `/auth/login`, data)
      .then(result => {
        const cookies = new Cookies();
        cookies.set('patientcareauthtoken', result.data.token, { path: '/' });
        dispatch({ type: ACTION_TYPES.LOGIN_REQUEST_SUCCESS })
          redirecturl ? historyPusher.push(redirecturl) : historyPusher.push('Home')
      })
      .catch(error => {
        dispatch({ type: ACTION_TYPES.FILL_USER_NOTIFICATION, payload: axiosErrorHelper(error) })
        dispatch({ type: ACTION_TYPES.LOGIN_REQUEST_ERROR, payload: axiosErrorHelper(error) })
      })
  }
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
    const cookies = new Cookies();
    cookies.remove('patientcareauthtoken')
    dispatch({ type: ACTION_TYPES.LOGOUT_REQUEST_SUCCESS })
  }
}

