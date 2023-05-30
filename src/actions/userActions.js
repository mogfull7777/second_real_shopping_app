import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type : USER_LOGIN_REQUEST,
        })

        const {data} = await axios.post(
            'http://localhost:3000/api/auth/login',
            { email, password }
        )

        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data // payload는 데이터
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type : USER_LOGIN_FAIL,
            payload : //에러에 대한 메세지
             err.response && err.response.data.message
                 ? err.response.data.message
                 : err.message,
        })
    }

}

export const signup = (email, password, username, phone) => async (dispatch) => {

    try {

        dispatch({
            type : USER_SIGNUP_REQUEST,
        })

        const {data, status} = await axios.post(
            'http://localhost:3000/api/auth/signup',
            { email, password, username, phone }
        )

        dispatch({
            type : USER_SIGNUP_SUCCESS,
            payload : data
        })

        // localStorage.setItem('isSignup', true) => 굳이 안해도 됨.

    } catch (err) {
        dispatch ({
            type : USER_SIGNUP_FAIL,
            payload :
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
        })
    }

}
// 액션까지만 회원가입 넣기
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type : USER_LOGOUT })
    document.location.href = '/login'
}