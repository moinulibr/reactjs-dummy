
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from '../views/guest/Login';
import Dashboard from '../views/private/Dashboard';
import PageNotFound from '../views/PageNotFound';
import Signup from '../views/guest/Signup';
import ProductLayout from '../views/private/product/ProductLayout';
import ProductList from '../components/Product/ProductList';
import ProductAdd from '../components/Product/ProductAdd';
import Home from '../views/guest/Home';
import GuestLayout from '../views/guest/GuestLayout';
import UserLayout from '../views/private/user/UserLayout';
import UserList from '../components/User/UserList';
import AddUser from '../components/User/AddUser';
import ProductEdit from '../components/Product/ProductEdit';

const router = createBrowserRouter([
    {
        path:'/',
        element: <Dashboard/>
    },
    /* {
        path:'/',
        element: <Dashboard/>,
        children:[
            {
                path:'product',
                element: <ProductLayout/>,
                children:[
                    {
                        path:'list',
                        element:<ProductList/>
                    },
                    {
                        path:'add',
                        element:<ProductAdd/>
                    },
                ]
            },
        ],
    }, */
    {
        path:'/user',
        element:<UserLayout/>,
        children:[
            {
                path:'list',
                element:<UserList/>
            },
            {
                path:'add',
                element:<AddUser/>
            }
        ]
    },
    {
        path:'/product',
        element: <ProductLayout/>,
        children:[
            {
                path:'list',
                element:<ProductList/>
            },
            {
                path:'add',
                element:<ProductAdd/>
            },
            {
                path:'edit/:id',
                element:<ProductEdit key={'productEdit'}/>
            }
        ],
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children:[
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            }
        ]
    },

    {
        path: '/*',
        element: <PageNotFound/>
    }
]);




export default router;