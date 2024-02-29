import React, { useState } from 'react';
import { Link,Navigate, useNavigate, useParams } from 'react-router-dom';
import ProductList from './ProductList';

const ProductAdd = () => {
    const [errorMessage,setErrorMessage] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    //let {id} = useParams();

    const tokenForLogout = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : null; 

    const [formObj,setFormObj] = useState({
        name:'',details:''
    }); 
    

    const getOnChangeData = (property,value) => {
        setFormObj(previousObje => ({
            ...previousObje,
            [property] : value
        }));
    };
    const formSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        setErrorMessage(null);
        //console.log(formObj);
        const base_url = import.meta.env.VITE_API_BASE_URL;
        const fetchData = await fetch(base_url+'/api/testproducts', 
        {
            method:'post', 
            headers:{
                'Authorization': 'Bearer '+ tokenForLogout,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formObj)
        });
        const jesonResponse = await fetchData.json();
        //console.log(jesonResponse);
        if(jesonResponse.success === true){
            return navigate('/product/list');
            setIsLoading(false);
        }
        else if(jesonResponse.success === false){
            //console.log(jesonResponse.errors);
            setIsLoading(false);
            setErrorMessage(jesonResponse.errors);
        }
    };



    return (
        <div style={{'marginLeft':'200px', 'marginRight':'200px'}}>
            <br/>
            <h4>Product Add</h4>
            
            <hr />
            {
                errorMessage && 
                Object.keys(errorMessage).map( (error, index) => {
                    return (
                        <div className="alert" key={index}>
                            <p>{errorMessage[error][0]}</p>
                        </div>
                    )
                })
            }
            {isLoading &&
                <h4 style={{ textAlign:'center' }}>Loading...</h4>
            }


            <form onSubmit={formSubmit}>
                <div> 
					<label htmlFor="name" style={{ marginRight: '20px' }}>Name</label>
					<input type="text" onChange={ (e) => getOnChangeData('name',e.target.value)} value={formObj.name} placeholder='Name'/> 
				</div> 
                <br/>
                <div> 
					<label htmlFor="details" style={{ marginRight: '12px' }}>Details</label>
					<input type="text" onChange={ (e) => getOnChangeData('details',e.target.value)} value={formObj.details} placeholder='Details'/> 
				</div> 
                <br/>
                { isLoading ? 
                    <button type="submit" disabled style={{backgroundColor:'red'}}  className='btn btn-add'>Submit</button>
                    :
				<button type="submit"  className='btn btn-add'>Submit</button>
                }
            </form>
        </div>
    );
};

export default ProductAdd;