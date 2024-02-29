import { Link } from "react-router-dom";
import React from 'react';

const LeftNavBar = () => {
    return (
        <aside>
            <Link to={'/'} >Dashboard</Link>
            <Link to={'/product'} >Product</Link>
            {/* <Link to={'/product/list'} >Product list</Link>
            <Link to={'/product/add'} >Add Product</Link> */}
            <Link to={'/user'} >User</Link>
            {/* <Link to={'/user/add'} >User list</Link>
            <Link to={'/user/list'} >User list</Link> */}
        </aside>
    );
};

export default LeftNavBar;