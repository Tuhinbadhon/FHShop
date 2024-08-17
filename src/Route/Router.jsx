import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../Layouts/MainLayout'

import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

import PrivateRoutes2 from "../PrivateRoutes/PrivateRoutes2";
import ErrorPage from "../components/Error/ErrorPage";

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Profile from "../Pages/Profile/Profile";

const router = createBrowserRouter(
    
    [
        {
        
        
        path:'/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage/>,
        children:[
            {   
                path:'/',
                element: <Home></Home>,
                // loader:()=>fetch('/estatesData.json')
            },
            {
                path:'/login',
                element: <Login></Login>,
            },
            {
                path:'/registration',
                element: <PrivateRoutes2><Registration></Registration></PrivateRoutes2>,
            },
            {
                path:'/profile',
                element: <PrivateRoutes><Profile/></PrivateRoutes>,
            },
            // {
            //     path:'/updateprofile',
            //     element: <PrivateRoutes><UpdateProfile/></PrivateRoutes>,
            // },
            
       
        ]
    }
    ]);

    export default router;