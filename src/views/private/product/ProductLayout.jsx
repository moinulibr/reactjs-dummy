import React from 'react';
import { Outlet } from 'react-router-dom';

const ProductLayout = () => {
    return (
        <div>
            Product Layout

            <Outlet/>
        </div>
    );
};

export default ProductLayout;