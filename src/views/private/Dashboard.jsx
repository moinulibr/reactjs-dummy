import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../config/ContextProvider';


const Dashboard = () => {

    const {user,token}= useStateContext();
    if(!token){
        return <Navigate to="/login"/>
    }
    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('ACCESS_TOKEN');
        return <Navigate to="/login"/>
    }
    return (
        <div id='defaultLayout'>
            
            <aside>
                <Link to={'product/list'} >Product list</Link>
                <Link to={'product/add'} >Add Product</Link>
            </aside>

            <div className='content'>
            <header>
                <div>
                    Header
                </div>
                <div>
                    User :  {user.name}
                    <a href="#" onClick={logout} className='btn-logout'>Logout</a>
                </div>
            </header>
            <main>
            <Outlet/>
            </main>
            </div>
        </div>
    );
};

export default Dashboard;