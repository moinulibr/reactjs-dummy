import { Link } from "react-router-dom";



import React from 'react';

const Menu = () => {
    return (
        <div>
            <Link to={'/product/list'} >Product list</Link>
            <Link to={'/product/add'} >Add Product</Link>
        </div>
    );
};

export default Menu;
