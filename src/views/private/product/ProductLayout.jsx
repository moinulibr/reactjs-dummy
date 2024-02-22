import React from 'react';
import { Outlet } from 'react-router-dom';

const ProductLayout = () => {
    return (
        <div>
            Proudct Layout
            <Outlet/>
        </div>
    );
};

export default ProductLayout;