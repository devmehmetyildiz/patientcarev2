import { ACTION_TYPES } from "../Actions/ProfileAction"

const defaultState = {
  changePassword: false,
  isLogging: false,
  user: null,
  error: null,
  isDispatching: false,
  notifications: [],
  meta: [],
}
const ProfileReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.LOGIN_REQUEST_INIT:
      return { ...state, isLogging: true }
    case ACTION_TYPES.LOGIN_REQUEST_SUCCESS: {
      return { ...state, isLogging: false }
    }
    case ACTION_TYPES.LOGIN_REQUEST_ERROR:
      return { ...state, isLogging: false, error: payload }
    case ACTION_TYPES.LOGOUT_REQUEST_INIT:
      return { ...state, isLogging: true }
    case ACTION_TYPES.LOGOUT_REQUEST_SUCCESS:
      return { ...defaultState }
    case ACTION_TYPES.FILL_USER_NOTIFICATION:
      const messages = [...state.notifications]
      messages.push(payload)
      return { ...state, notifications: messages }
    case ACTION_TYPES.REMOVE_USER_NOTIFICATION:
      const messages1 = [...state.notifications]
      messages1.splice(0, 1)
      return { ...state, notifications: messages1 }
    default:
      return state
  }
}

export default ProfileReducer