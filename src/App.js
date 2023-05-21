import React from 'react';
import {RouterProvider} from "react-router-dom";
import router from "./router";
import Footer from "./component/Footer";
import Header from "./component/Header";

const App = () => {
    return (
        <div>
            <Header />
            <RouterProvider router={router} />
            <Footer />
        </div>
    );
};

export default App;