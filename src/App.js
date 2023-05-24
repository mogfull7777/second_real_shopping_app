import React from 'react';
import {RouterProvider} from "react-router-dom";
import router from "./router";
import Footer from "./component/Footer";
import Header from "./component/Header";
import {Provider} from "react-redux";
import store from "./store";

const App = () => {
    return (
        // 회원가입시 헤더 모양 바꾸기 (다음시간)
        <Provider store={store}>
            <div>
                <Header />
                <RouterProvider router={router} />
                <Footer />
            </div>
        </Provider>
    );
};

export default App;