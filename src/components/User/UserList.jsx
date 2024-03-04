import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../config/ContextProvider';
import Pagination from '../Product/Pagination';

//when call function from another js file
//import productApiHandling, { test } from './productApiHandling';

const UserList = () => {
    const {id} = useParams();
    const {setNotification} = useStateContext();
    const [isLoading,setIsLoading] = useState(false);
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [userMeta, setUserMeta] = useState([]);
    const token = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : null;
    
    const [currentURL, setCurrentURL] = useState(`${base_url}/api/users`);

    const handlePaginationUrl = (newUrl) => {
        //setCurrentURL(`${base_url}/api/users?page=${pageNo}`);
        setCurrentURL(newUrl);
        let url = `${newUrl}`;
        return userLists(url);
    };

    const userLists = async (currenturl) => {
        setIsLoading(true);
        try{
            const fatchProduct =  await fetch(`${currenturl}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const user = await fatchProduct.json();
            //console.log(user);      
            if(user.data){
                setIsLoading(false);
                setUserList(user.data);
                setUserMeta(user.meta);
                //console.log(user);   
                return user; 
            }
        }catch(error){
            console.log('error- '+ error);
        }
    };

    useEffect(()=>{
        userLists(currentURL);
    },[]);


    const deleteItem = async (userData) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        setIsLoading(true);
        try{
            const fatchProduct =  await fetch(`${base_url}/api/users/${userData.id}`,{
                method:'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const user = await fatchProduct.json();
            //console.log(user);
            if(user.success === true){
                setIsLoading(false);
                setNotification('User was successfully deleted');
                userLists(currentURL);
            }else{
                setIsLoading(false);
                userLists(currentURL);
            }
        }catch(error){
            setIsLoading(false)
            console.log('error- '+ error);
        }

    }


    return (
        <div style={{'marginLeft':'200px', 'marginRight':'200px'}}>
            <br/>

            <h4 style={{ textAlign:'center' }}>User List</h4>
            
            <br/>
            <div className="card animated fadeInDown">
            <table >
                {isLoading &&
                    <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
                }
                <thead>
                    <tr>
                        <td >Sl No.</td>
                        <td >ID</td>
                        <td >Name</td>
                        <td >Email</td>
                        <td >Action</td>
                    </tr>
                </thead>
                <tbody>
                {
                    userList?.length > 0 ?
                        (
                            userList?.map( (value,index) => {
                                return (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value['id']}</td>
                                    <td>{value['name']}</td>
                                    <td>{value['email']}</td>
                                    <td>
                                        <Link to={`/user/edit/${value.id}`}  className="btn-edit">Edit</Link>&nbsp;
                                        <button onClick={ (e) => deleteItem(value)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>)
                            })
                        ) 
                    : (<tr></tr>)
                }
                </tbody>
            </table>
            </div>
            
            Showing {userMeta?.per_page} result from {userMeta?.from} to {userMeta?.to} of {userMeta?.total}
            {
                userMeta?.links?.length > 0 &&  

                (userMeta.links).map((value,index) => {
                    
                    return(
                        
                        <button style={{ backgroundColor: value.active == true ?'gray':'' }} 
                        onClick={ () => {
                            //setCurrentURL(value.url);
                            handlePaginationUrl(value.url == null ? currentURL : value.url)}}
                        key={index}>
                            {value.label == '&laquo; Previous' && value.label != 'Next &raquo;' ? '<Previous' : 
                                value.label != '&laquo; Previous' && value.label == 'Next &raquo;' ? 'Next>' : value.label
                            }
                        </button>
                    )
                
                })
            }

                {/* userList?.length > 0 &&
                (
                    <Pagination class="mt-6" meta={userMeta} />
                )
            } */}
                            
        </div>
    );
};

export default UserList;