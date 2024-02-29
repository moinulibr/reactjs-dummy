import React, { useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../config/ContextProvider';


const DashboardOld = () => {
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
        console.log(localStorage.getItem('ACCESS_TOKEN'));
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
                        console.log(localStorage.getItem('ACCESS_TOKEN'));
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
        <div id='defaultLayout'>
            
            <aside>
                <Link to={'/product/list'} >Product list</Link>
                <Link to={'/product/add'} >Add Product</Link>
            </aside>

            <div className='content'>
            <header>
                <div>
                    Header
                </div>
                <div>
                    User :  {user?.name}
                    <a href="#" onClick={logout} className='btn-logout'>Logout</a>
                </div>
            </header>
            <main>
                {
                    loading && 
                    <h4 style={{ marginBottom:'10px',marginTop:'5px','textAlign':'center' }}>Loading...</h4>
                }
            <Outlet/>
            </main>
            </div>
        </div>
    );
};

export default DashboardOld;