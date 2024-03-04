import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../../config/ContextProvider';

const PrivateOutlet = () => {
    const {user, token, setUser, setToken, notification} = useStateContext();

    console.log("private route:- "+token);
    return token ? <Outlet/> : <Navigate to="/login" />

    return (
        <div>
            
        </div>
    );
};

export default PrivateOutlet;