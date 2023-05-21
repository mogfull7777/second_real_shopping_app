import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Main from "./component/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FindEmail from "./pages/FindEmail";
import SandPhoneNumber from "./pages/SandPhoneNumber";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

const Router = createBrowserRouter([
    {
        path : '/',
        element : <Main />
    },
    {
        path : '/signup',
        element : <Signup />
    },
    {
        path : '/login',
        element : <Login />
    },
    {
        path : '/profile',
        element : <Profile />
    },
    {
        path : '/find/email',
        element : <FindEmail />
    },
    {
        path : '/sand/phone',
        element : <SandPhoneNumber />
    },
    {
        path : '/forgot/password',
        element : <ForgotPassword />
    },
    {
        path : '/change/password',
        element : <ChangePassword />
    }

])

export default Router;