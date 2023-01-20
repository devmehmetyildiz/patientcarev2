import { ACTION_TYPES } from "../Actions/PurchaseorderstockAction"

const defaultState = {
    list: [],
    selected_record: {},
    errmsg: null,
    notifications: [],
    isLoading: false,
    isDispatching: false
}

const PurchaseorderstockReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_PURCHASEORDERSTOCKS_INIT:
            return { ...state, isLoading: true, errmsg: null, list: [] }
        case ACTION_TYPES.GET_PURCHASEORDERSTOCKS_SUCCESS:
            return { ...state, isLoading: false, list: payload }
        case ACTION_TYPES.GET_PURCHASEORDERSTOCKS_ERROR:
            return { ...state, isLoading: false, errmsg: payload }

        case ACTION_TYPES.GET_ALLPURCHASEORDERSTOCKS_INIT:
            return { ...state, isLoading: true, errmsg: null, list: [] }
        case ACTION_TYPES.GET_ALLPURCHASEORDERSTOCKS_SUCCESS:
            return { ...state, isLoading: false, list: payload }
        case ACTION_TYPES.GET_ALLPURCHASEORDERSTOCKS_ERROR:
            return { ...state, isLoading: false, errmsg: payload }

        case ACTION_TYPES.GET_PURCHASEORDERSTOCK_INIT:
            return { ...state, isLoading: true, errmsg: null, selected_record: {} }
        case ACTION_TYPES.GET_PURCHASEORDERSTOCK_SUCCESS:
            return { ...state, isLoading: false, selected_record: payload }
        case ACTION_TYPES.GET_PURCHASEORDERSTOCK_ERROR:
            return { ...state, isLoading: false, errmsg: payload }

        case ACTION_TYPES.ADD_PURCHASEORDERSTOCK_INIT:
            return { ...state, isDispatching: true }
        case ACTION_TYPES.ADD_PURCHASEORDERSTOCK_SUCCESS:
            return {
                ...state, isDispatching: false, list: payload,
                notifications: [{ type: 'Success', code: 'Satın Alma Stokları', description: 'Satın Alma Stoğu Başarı ile Eklendi' }].concat(state.notifications || [])
            }
        case ACTION_TYPES.ADD_PURCHASEORDERSTOCK_ERROR:
            return { ...state, isDispatching: false, errmsg: payload }

        case ACTION_TYPES.EDIT_PURCHASEORDERSTOCK_INIT:
            return { ...state, isDispatching: true }
        case ACTION_TYPES.EDIT_PURCHASEORDERSTOCK_SUCCESS:
            return {
                ...state, isDispatching: false, list: payload,
                notifications: [{ type: 'Success', code: 'Satın Alma Stokları', description: 'Satın Alma Stoğu Başarı ile Güncellendi' }].concat(state.notifications || [])
            }
        case ACTION_TYPES.EDIT_PURCHASEORDERSTOCK_ERROR:
            return { ...state, isDispatching: false, errmsg: payload }

        case ACTION_TYPES.DELETE_PURCHASEORDERSTOCK_INIT:
            return { ...state, isDispatching: true }
        case ACTION_TYPES.DELETE_PURCHASEORDERSTOCK_SUCCESS:
            return {
                ...state, isDispatching: false, list: payload,
                notifications: [{ type: 'Success', code: 'Satın Alma Stokları', description: 'Satın Alma Stoğu Başarı ile Silindi' }].concat(state.notifications || [])
            }
        case ACTION_TYPES.DELETE_PURCHASEORDERSTOCK_ERROR:
            return { ...state, isDispatching: false, errmsg: payload }

        case ACTION_TYPES.FILL_PURCHASEORDERSTOCKS_NOTIFICATION:
            const messages = [...state.notifications]
            messages.push(payload)
            return { ...state, notifications: messages }
        case ACTION_TYPES.REMOVE_PURCHASEORDERSTOCKS_NOTIFICATION:
            const messages1 = [...state.notifications]
            messages1.splice(0, 1)
            return { ...state, notifications: messages1 }
        case ACTION_TYPES.REMOVE_SELECTED_PURCHASEORDERSTOCK:
            return { ...state, selected_record: {} }
        default:
            return state
    }
}

export default PurchaseorderstockReducer
