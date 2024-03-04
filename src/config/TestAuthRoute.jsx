import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import TestHome from '../views/private/TestHome';
import ProductAdd from '../components/Product/ProductAdd';
import PrivateOutlet from '../views/private/layouts/PrivateOutlet';
import Login from '../views/guest/Login';
import Home from '../views/guest/Home';
import Dashboard from '../views/private/Dashboard';
import PageNotFound from '../views/PageNotFound';

const TestAuthRoute = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<TestHome/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/*' element={<PrivateOutlet/>}>
                        <Route path='' element={<Dashboard/>} />
                        <Route path='product/add' element={<ProductAdd/>} />
                    </Route>
                    <Route path='/*' element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default TestAuthRoute;