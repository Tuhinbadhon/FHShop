import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import {Navigate} from 'react-router-dom';


const PrivateRoutes = ({children}) => {
    
    const {user,loading} = useContext(AuthContext);
    
    if(loading){
        return <span className="loading mx-auto loading-spinner text-warning"></span>;

    }
    
    if(user){
        return children;
    }

    return <Navigate to='/login' ></Navigate>
};

export default PrivateRoutes;