import React, { useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from './config/ContextProvider';
import Header from './views/private/layouts/Header';
import LeftNavBar from './views/private/layouts/LeftNavBar';
import MainContent from './views/private/layouts/MainContent';
//import { useStateContext } from '../../config/ContextProvider';


const App = () => {
    const {user, token, setUser, setToken, notification,accessToken,setAccessToken} = useStateContext();
    console.log('app :- '+ token);
    const [loading,setLoading] = useState(false);
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
            
            {/* <aside>
                <Link to={'/product/list'} >Product list</Link>
                <Link to={'/product/add'} >Add Product</Link>
            </aside> */}
            <LeftNavBar/>


            <div className='content'>
              <header>
                <Header/>
                  {/* <div>
                      Header
                  </div>
                  <div>
                      User :  {user?.name}
                      <a href="#" onClick={logout} className='btn-logout'>Logout</a>
                  </div> */}
              </header>

              <main>
                <MainContent/>
                {/*   {
                      loading && 
                      <h4 style={{ marginBottom:'10px',marginTop:'5px','textAlign':'center' }}>Loading...</h4>
                  }
              <Outlet/> */}
              </main>
            </div>
            
        </div>
    );
};

export default App;