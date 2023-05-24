import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS
} from "../constants/userConstants";

const login = (email, password) => async (dispatch) => {

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

// const signup = (username)
// 액션까지만 회원가입 넣기
export {login}