import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import LeftNavBar from '../layouts/LeftNavBar';
import Header from '../layouts/Header';

const ProductLayout = () => {
    return (
        <div id='defaultLayout'>

            <LeftNavBar/>

            <div className='content'>
                <header>
                    <Header/>
                </header>

                <main>
                    {/* <h4>Product Layout</h4> */}
                    <Link to={'/product/list'}  className='btn-add'>Product List</Link>&nbsp;
                    <Link to={'/product/add'} className='btn-add'>Add Product </Link>
                    <br/>
                    
                    
                    <Outlet/>
                </main>
            </div>
        
        </div>
    );
};

export default ProductLayout;