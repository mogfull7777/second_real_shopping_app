import {createStore, combineReducers,applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {userLoginReducer} from "./reducers/userReducers";


const reducer = combineReducers({
    userLogin : userLoginReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = { //이니셜 = 글로벌 상태 초기값
    userLogin: {userInfo : userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store

// 다음시간 회원가입도 리듀서