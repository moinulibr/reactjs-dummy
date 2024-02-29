import React, { useEffect, useRef, useState } from 'react';
import { Link,Navigate, json, useNavigate, useParams } from 'react-router-dom';
import ProductList from './ProductList';

const ProductEdit = () => {
    const [errorMessage,setErrorMessage] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isSuccess,setIsSuccess] = useState(false);
    const [productData,setProductData] = useState(false);

    let {id} = useParams();


    let nameRef = useRef();
    let detailsRef = useRef();

    const base_url = import.meta.env.VITE_API_BASE_URL;

    const tokenForLogout = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : null; 

    const [formObj,setFormObj] = useState({
        name:'',details:''
    }); 
    
    //rendering details product data and edit form
    useEffect(()=>{
        const getProduct = async () => {
            setIsLoading(true);
            setProductData(false);
            const fetchData = await fetch(`${base_url}/api/testproducts/${id}/edit`, 
            {
                headers:{
                    'Authorization': 'Bearer '+ tokenForLogout,
                    'Content-Type' : 'application/json'
                }
            });
            const productJsonData = await fetchData.json();
            if(productJsonData.success === true){
                setFormObj({
                    name : productJsonData.data.name,
                    details : productJsonData.data.details
                });
                setIsLoading(false);
                setProductData(true);
            }
            else if(productJsonData.success === false){
                setProductData(false);
            }
        }
        getProduct();
    },[]);
    
    

    //submit to update data
    const getOnChangeData = (property,value) => {
        setFormObj(previousObje => ({
            ...previousObje,
            [property] : value
        }));
    };
    const formSubmit = async (e) => {
        setIsLoading(true);
        setIsSuccess(false);
        e.preventDefault();
        setErrorMessage(null);
        //console.log(formObj);
        
        const fetchData = await fetch(`${base_url}/api/testproducts/${id}`, 
        {
            method:'PUT', 
            headers:{
                'Authorization': 'Bearer '+ tokenForLogout,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formObj)
        });
        const jesonResponse = await fetchData.json();
        //console.log(jesonResponse);
        if(jesonResponse.success === true){
            setIsLoading(false);
            setIsSuccess(true);
            return navigate('/product/list');
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
            <h4>Product Edit</h4>
            
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

            {productData && 

                <form onSubmit={ formSubmit }>
                    <div> 
                        <label htmlFor="name" style={{ marginRight: '20px' }}>Name</label>
                        <input type="text"  onChange={ (e) => getOnChangeData('name',e.target.value)} value={formObj.name} placeholder='Name'/> 
                    </div> 
                    <br/>
                    <div> 
                        <label htmlFor="details" style={{ marginRight: '12px' }}>Details</label>
                        <input type="text"  onChange={ (e) => getOnChangeData('details',e.target.value)} value={formObj.details} placeholder='Details'/> 
                    </div> 
                    <br/>
                    { isLoading ? 
                        <button type="submit" disabled style={{backgroundColor:'red'}}  className='btn btn-add'>Submit</button>
                        :
                        <button type="submit"  className='btn btn-add'>Submit</button>
                    }
                </form>
            }

        </div>
    );
};

export default ProductEdit;





/* .then((data) => data.json())
            .then((jsonData) => {
                if(jsonData?.success === true){
                    //console.log(jsonData.data.name);
                    //nameRef.current.value = jsonData.data.name;
                    //detailsRef.current.value = jsonData.data.details;
                    setFormObj({
                        name : jsonData.data.name,
                        details : jsonData.data.details
                    });
                    setIsLoading(false);
                    //let objectArray = Object.keys(jsonData.data);
                    ///let entries = Object.entries(jsonData.data);
                    //console.log(entries);
                    //entries.map((objecKey,index,entries) => {
                        //console.log("key: "+objecKey +" - "+ entries[index][0] +" : "+ entries[index][1]);
                    
                        /* setFormObj(previousObje => ({
                            ...previousObje,
                            [entries[index][0]] : entries[index][1]
                        })); */
                    //});
                    /* console.log(jsonData.data[]);
                    let entries = Object.entries(jsonData.data)
                    entries.map( (value, index) => {
                        console.log(value);
                    }); */
                    //console.log(jsonData.data)
                    //setEditablesData(jsonData.data);
                //}
            //})
            //.then((err) => {console.log(err)}); */