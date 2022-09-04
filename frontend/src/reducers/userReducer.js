
import {SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS} from '../constants/UserConstants'

export const authReducer = (state = { user: [] }, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        
            return {
                loading: true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
        
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                token: action.token
            }

        // case LOGOUT_SUCCESS:
        //     return {
        //         loading: false,
        //         isAuthenticated: false,
        //         user: null
        //     }

        // case LOAD_USER_FAIL:
        //     return {
        //         loading: false,
        //         isAuthenticated: false,
        //         user: null,
        //         error: action.payload
        //     }

        // case LOGOUT_FAIL:
        //     return {
        //         ...state,
        //         error: action.payload
        //     }

        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
