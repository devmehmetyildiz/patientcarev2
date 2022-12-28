import { ACTION_TYPES } from "../Actions/StockmovementAction"

const defaultState = {
    list: [],
    selected_record: {},
    errmsg: null,
    notifications: [],
    isLoading: false,
    isDispatching: false
}

const StockmovementsReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_STOCKMOVEMENTS_INIT:
            return { ...state, isLoading: true, errmsg: null, list: [] }
        case ACTION_TYPES.GET_STOCKMOVEMENTS_SUCCESS:
            return { ...state, isLoading: false, list: payload }
        case ACTION_TYPES.GET_STOCKMOVEMENTS_ERROR:
            return { ...state, isLoading: false, errmsg: payload }

        case ACTION_TYPES.GET_STOCKMOVEMENT_INIT:
            return { ...state, isLoading: true, errmsg: null, selected_record: {} }
        case ACTION_TYPES.GET_STOCKMOVEMENT_SUCCESS:
            return { ...state, isLoading: false, selected_record: payload }
        case ACTION_TYPES.GET_STOCKMOVEMENT_ERROR:
            return { ...state, isLoading: false, errmsg: payload }

        case ACTION_TYPES.FILL_STOCKMOVEMENT_NOTIFICATION:
            const messages = [...state.notifications]
            messages.push(payload)
            return { ...state, notifications: messages }
        case ACTION_TYPES.REMOVE_STOCKMOVEMENT_NOTIFICATION:
            const messages1 = [...state.notifications]
            messages1.splice(0, 1)
            return { ...state, notifications: messages1 }
        case ACTION_TYPES.REMOVE_SELECTED_STOCKMOVEMENT:
            return { ...state, selected_record: {} }
        default:
            return state
    }
}

export default StockmovementsReducer
