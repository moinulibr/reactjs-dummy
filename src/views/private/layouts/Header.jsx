import React, { useState } from 'react';
import { useStateContext } from '../../../config/ContextProvider';
import { Link, Navigate, Outlet } from 'react-router-dom';

const Header = () => {
    const [loading,setLoading] = useState(false);
    const {user,accessToken,setAccessToken}= useStateContext();
    
    if(!accessToken){
        return <Navigate to="/login"/>
    }
    
    
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const tokenForLogout = localStorage.getItem('ACCESS_TOKEN') ? localStorage.   getItem('ACCESS_TOKEN') : null; 

    const logout = (event) => {
        event.preventDefault();
        //localStorage.removeItem('ACCESS_TOKEN');
        //console.log(localStorage.getItem('ACCESS_TOKEN'));
        setLoading(true);
            try{
                fetch(base_url+"/api/logout",{
                    method:'POST',
                    headers:{
                        'Authorization': 'Bearer '+ tokenForLogout,
                        'Content-Type' : 'application/json'
                    },
                }).then(res => res.json())
                .then(json => {
                    console.log(json)
                    if(json.success == true){
                        localStorage.removeItem("ACCESS_TOKEN");
                        //console.log(localStorage.getItem('ACCESS_TOKEN'));
                        setAccessToken(null);
                        setLoading(false);
                    }
                } )
                .then(error => console.log(error));
            }catch(error){
                setLoading(false);
                console.log(error);
            }  
        
        return <Navigate to="/login"/>
    }

    return (
        <>
        <div>
            Header
        </div>
        <div>
            User :  {user?.name}
            <a href="#" onClick={logout} className='btn-logout'>Logout</a>
        </div>
        </>
    );
};

export default Header;