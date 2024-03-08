import React, { useState } from 'react';
import { Link,Navigate, useNavigate, useParams } from 'react-router-dom';
import ProductList from './ProductList';
import { useStateContext } from '../../config/ContextProvider';
import { useForm } from 'react-hook-form';

const ProductAdd = () => {
    const {setNotification} = useStateContext();
    const [errorMessage,setErrorMessage] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);
    const navigate = useNavigate();
    //let {id} = useParams();
    const [file,setFile] = useState(); 


    const tokenForLogout = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : null; 

    /* const [formObj,setFormObj] = useState({
        name:'',details:'',file:''
    }); 
    
    const getOnChangeFileData = (e) => {
        setFile(e.target.files[0]);
    };
    
    const getOnChangeData = (property,value) => {
        setFormObj(previousObje => ({
            ...previousObje,
            [property] : value
        }));
    }; */


    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();
    

    const formSubmit = async (data) => {
        setIsLoading(true);
        //e.preventDefault();
        setErrorMessage(null);
        setIsSuccess(false);
        //console.log(formObj);

        const formData = new FormData();
        Object.keys(data).map(key => {
            formData.append(key, data[key]);
        })
        console.log(formData);
        console.log(data);
          //return;
        //formData.append("files", data.photo[0]);
        //data = { ...data, photo: data.photo[0].name };
        //formData.append("recipe", JSON.stringify(data));

        //console.log(data);

        const base_url = import.meta.env.VITE_API_BASE_URL;
        const fetchData = await fetch(base_url+'/api/testproducts', 
        {
            method:'POST', 
            headers:{
                'Authorization': 'Bearer '+ tokenForLogout,
                'Content-Type' : 'application/json'
                //'Content-Type' : 'multipart/formdata'
            },
            //body: JSON.stringify(formObj)
            body: JSON.stringify(data) 
        });
        const jesonResponse = await fetchData.json();
        //console.log(jesonResponse);
        if(jesonResponse.success === true){
            setIsSuccess(true);
            setIsLoading(false);
            setNotification('Product created successfully');
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
            
            { isSuccess &&
                <h4 style={{ textAlign:'center',color:"green" }}>Product created successfully</h4>
            }

            <form onSubmit={handleSubmit(formSubmit)}>
                <div> 
					<label htmlFor="name" style={{ marginRight: '20px' }}>Name</label>
					<input type="text" {...register("name",{required:'This field is required',minLength:{value:5,message:'Min value 5'},maxLength:{value:10,message:'Max value 10'}})} 
                    /> 
                    <br/>
                    {errors.name && <span style={{ color:'red' }}>{errors.name?.message}</span>}
				</div> 
                <br/>
                {/* <div> 
					<label htmlFor="details" style={{ marginRight: '12px' }}>Details</label>
					<input type="text" onChange={ (e) => getOnChangeData('details',e.target.value)} value={formObj.details} placeholder='Details'/> 
				</div>  */}
                <div> 
					<label htmlFor="details" style={{ marginRight: '12px' }}>Details</label>
                    <textarea
                        {...register("details", {
                            required: "Details is required",
                            maxLength: {
                            value: 100,
                            message: "Details cannot be longer than 100 characters",
                            },
                        })}
                        id="details"
                        rows={10}
                    ></textarea>
                    <br/>
                    {errors.details && <span style={{ color:'red' }}>{errors.details?.message}</span>}
				</div> 
                <div> 
					<label htmlFor="file" style={{ marginRight: '12px' }}>Photo</label>
                    <input {...register("photo", {
                        required: "Photo is required",
                    })}
                    type="file"
                    id="photo" />
                    <br/>
                    {errors.photo && <span style={{ color:'red' }}>{errors.photo?.message}</span>}
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