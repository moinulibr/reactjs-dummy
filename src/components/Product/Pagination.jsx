import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//current_page,meta,from,last_page,path,per_page,to,total
const  Pagination = (data,prm) => {
    const [urlPrams, setUrlPrams] = useState(1);
    console.log(data.meta);
    return (
        <>
            Showing result from {data.meta.from} to {data.meta.to} of {data.meta.total}
            {
                data.meta.links.map((value,index) => {
                    {
                        if(index > 0){
                            return(
                            <button style={{ backgroundColor:value.active === true ?'red':'gray' }} 
                            onClick={ () => setUrlPrams(index)}
                            >{index}</button>
                            )
                        }
                    }
                })
            }
        </>
    );

}
export default Pagination;



/* GET|HEAD        api/testproducts/{testproduct}/edit testproducts.edit › Api\…
GET|HEAD        api/user ....................................................
GET|HEAD        api/users ......... users.index › Api\UserApiController@index
POST            api/users ......... users.store › Api\UserApiController@store
GET|HEAD        api/users/{user} .... users.show › Api\UserApiController@show
PUT|PATCH       api/users/{user} users.update › Api\UserApiController@update
DELETE          api/users/{user} users.destroy › Api\UserApiController@destr… */



/* [
    {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
    },
    {
        "url": "http://localhost:8000/api/users?page=1",
        "label": "1",
        "active": true
    },
    {
        "url": "http://localhost:8000/api/users?page=2",
        "label": "2",
        "active": false
    },
    {
        "url": "http://localhost:8000/api/users?page=2",
        "label": "Next &raquo;",
        "active": false
    }
] */


/* 
    current_page
    : 
    1
    from
    : 
    1
    last_page
    : 
    2
    links
    : 
    (4) [{…}, {…}, {…}, {…}]
    path
    : 
    "http://localhost:8000/api/users"
    per_page
    : 
    10
    to
    : 
    10
    total
    : 
    20 */