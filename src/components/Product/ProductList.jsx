import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Pagination  from './Pagination';
import { useStateContext } from '../../config/ContextProvider';

//when call function from another js file
//import productApiHandling, { test } from './productApiHandling';

const ProductList = () => {
    const {setNotification} = useStateContext();
    const [isLoading,setIsLoading] = useState(false);
    const [getProductFromApi,setGetProductFromApi] = useState(null);
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const token = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : null;
    

    //getProductLists(); //[when i use state to set data, then its render infinity] its a problem

    //if we want to call api from another js file..
    //const getProductLists = productApiHandling;
    //console.log(test(4));
    //const {data} = useQuery({ queryKey: ['products'], queryFn: getProductLists });
    const getProductLists = async () => {
        setIsLoading(true);
        try{
            const fatchProduct =  await fetch(`${base_url}/api/testproducts`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const productLists = await fatchProduct.json();
            if(productLists.success === true){
                setIsLoading(false);
                //console.log(productLists);      
                return productLists.data; 
            }
        }catch(error){
            console.log('error- '+ error);
        }
    };
    /* const productListsAll = () => {
        
    };
    useEffect(()=>{
        setGetProductFromApi(getProductLists);
    },[]);
    console.log(getProductFromApi);
    const productListForQuery = () => {
        console.log(getProductFromApi);
        return getProductFromApi;
    }; */
    const {data} = useQuery({ queryKey: ['products'], queryFn: getProductLists });
    //const productList = useQuery({ queryKey: ['products'], queryFn: getProductLists })
    //console.log(productList);//all useQuery response
    //console.log(productList.data);//get targeted data
    //productList.data?.length > 0 ?
    //(
        //productList.data.map( (value,index) => {
        //});
    //):()


    const deleteItem = async (productData) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }
        setIsLoading(true);
        try{
            const fatchProduct =  await fetch(`${base_url}/api/testproducts/delete`,{
                method:'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id:productData.id}),
            });
            const productLists = await fatchProduct.json();
            //console.log(productLists);
            if(productLists.success === true){
                setIsLoading(false);
                setNotification('Product successfully deleted');
               //getProductLists();
                //console.log(productLists);
                return navigate('/product/list');
            }
        }catch(error){
            setIsLoading(false)
            console.log('error- '+ error);
        }
    }


    return (
        <div style={{'marginLeft':'200px', 'marginRight':'200px'}}>
            <br/>

            <h4 style={{ textAlign:'center' }}>Product List</h4>
            <br/>
            <div className="card animated fadeInDown">
            <table >
                <thead>
                    <tr>
                        <td >Sl No.</td>
                        <td >ID</td>
                        <td >Product Name</td>
                        <td >Product Details</td>
                        <td >Action</td>
                    </tr>
                </thead>
                {!isLoading &&
                    <tbody>
                    {
                        data?.length > 0 ?
                            (
                                data?.map( (value,index) => {
                                    return (<tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{value['id']}</td>
                                        <td>{value['name']}</td>
                                        <td>{value['details']}</td>
                                        <td>
                                            <Link to={`/product/edit/${value.id}`}  className="btn-edit">Edit</Link>&nbsp;
                                            <button onClick={ (e) => deleteItem(value)} className="btn-delete">Delete</button>
                                        </td>
                                    </tr>)
                                })
                            ) 
                        : (<tr></tr>)
                    }
                    </tbody>
                }

                {isLoading &&
                    <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
                }
            </table>
            </div>
            {/* {
                data?.length > 0 &&
                (
                <Pagination class="mt-6" links={data?.links} />
                )
            } */}
                            
        </div>
    );
};

export default ProductList;