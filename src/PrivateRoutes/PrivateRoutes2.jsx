import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import {Navigate} from 'react-router-dom';

//this route is use for registration page
//if anyone tries to access registration page after login it wont let that happen

const PrivateRoutes2 = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    
    if(loading){
        return <span className="loading mx-auto loading-spinner text-warning"></span>;

    }
    
    if(!user){
        return children;
    }

    return <Navigate to='/' ></Navigate>
};

export default PrivateRoutes2;