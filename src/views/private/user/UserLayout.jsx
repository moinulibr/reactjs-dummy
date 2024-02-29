import React from 'react';
import LeftNavBar from './../layouts/LeftNavBar';
import Header from '../layouts/Header';
import { Link, Outlet } from 'react-router-dom';
import AddUser from '../../../components/User/AddUser';
import UserList from '../../../components/User/UserList';

const UserLayout = () => {
    return (
        <div id='defaultLayout'>

        <LeftNavBar/>

        <div className='content'>
            <header>
                <Header/>
            </header>

            <main>
                {/* <h4>User Layout</h4> */}
                <Link to={'/user/list'} className='btn-add'>User List</Link>
                &nbsp;
                <Link to={'/user/add'} className='btn-add'>Add User </Link>
                <br/>
                

                <Outlet/>
            </main>
        </div>
    
        </div>
    );
};

export default UserLayout;