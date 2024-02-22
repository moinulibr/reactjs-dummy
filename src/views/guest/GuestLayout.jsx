import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../config/ContextProvider';

const GuestLayout = () => {
    const {token} = useStateContext();
    console.log(localStorage.getItem('ACCESS_TOKEN'));
    if(token){
        return <Navigate to="/product"/>
    }

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default GuestLayout;