import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../config/ContextProvider';

const GuestLayout = () => {
    const {accessToken} = useStateContext();
    console.log(localStorage.getItem('ACCESS_TOKEN'));
    if(accessToken){
        return <Navigate to="/"/>
    }

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default GuestLayout;