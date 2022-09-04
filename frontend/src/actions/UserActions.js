import axios from 'axios'
import {SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS} from '../constants/UserConstants'

// Register user
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: SIGNUP_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const username = userData.username;
        const email = userData.email;
        const password = userData.password;
        const { data } = await axios.post('http://localhost:5000/user/signupuser', {username,email,password}, config)

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error.response.data.message
        })
    }
}

// Login user
export const login = (userData) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const email = userData.email;
        const password = userData.password;
        const { data } = await axios.post('http://localhost:5000/user/login', {email,password}, config)
        console.log(data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
            token: data.token
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.message
        })
    }
}

export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type : CLEAR_ERRORS
    })
}