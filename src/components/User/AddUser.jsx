import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { useStateContext } from "../../config/ContextProvider.jsx";


const AddUser = () => {
    const [isLoading,setIsLoading] = useState(false);
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [submitingData, setSubmitingData] = useState(false);
    const token = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : null;
    
let {id} = useParams();
const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})
const [errors, setErrors] = useState(null)
const [defaultLoading, setdefaultLoading] = useState(false)
const {setNotification} = useStateContext();

if (id) {
    useEffect(() => {
        setdefaultLoading(true);
        try{
            const getProduct = async () => {
                const fatchUser =  await fetch(`${base_url}/api/users/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });//setErrors(response.data.errors)
                const userJson = await fatchUser.json();
                if(userJson.data){
                    //console.log(userJson.data); 
                    setUser(userJson.data);  
                    setdefaultLoading(false);
                }
            };
            getProduct();
        }
        catch(error){
            console.log(error);
        };
    }, [])
}

const onSubmit = async (ev) => {
    ev.preventDefault()
    setErrors(null);
    setIsLoading(true);
    setSubmitingData(true);
    if (user.id) {
        try{
            const fatchUser =  await fetch(`${base_url}/api/users/${id}`,{
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const userJson = await fatchUser.json();
            setIsLoading(false);
            setSubmitingData(false);
            console.log(userJson);  

            if(userJson.success === true){
                setNotification('User was successfully updated');
                return navigate('/user/list');
            } 
            else if(userJson.success === false){
                setErrors(userJson.errors);
            }

        }catch(error){
            console.log('error- '+ error);
        }
    } else {
        try{
            const fatchUser =  await fetch(`${base_url}/api/users`,{
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const userJson = await fatchUser.json();   
            setIsLoading(false);
            //console.log(userJson); 
            setSubmitingData(false);
            if(userJson.success === true){
                setNotification('User was successfully created');
                return navigate('/user/list');
            } 
            else if(userJson.success === false){
                setErrors(userJson.errors);
            }
        }catch(error){
            console.log('error- '+ error);
        }
    }
}

return (
    <>
    {user.id && <h1>Update User</h1>}
    {!user.id && <h1>New User</h1>}
    <div className="card animated fadeInDown">
        {defaultLoading && (
        <div className="text-center">
            Loading...
        </div>
        )}
        {isLoading && (
        <div className="text-center" style={{ marginBottom:'10px' }}>
            Loading... 
        </div>
        )}
        {errors &&
        <div className="alert">
            {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
            ))}
        </div>
        }
        {!defaultLoading && (
        <form onSubmit={onSubmit}>
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
            {submitingData ?
                <button className="btn-add" disabled style={{ backgroundColor:'red' }} >Save</button>
                :
                <button className="btn-add">Save</button>
            }
        </form>
        )}
    </div>
    </>
)
}

export default AddUser;









/*  axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
        setNotification('User was successfully updated')
        navigate('/users')
        })
        .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
            setErrors(response.data.errors)
        }
        }) */
/* axiosClient.post('/users', user)
        .then(() => {
        setNotification('User was successfully created')
        navigate('/users')
        })
        .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
            setErrors(response.data.errors)
        }
        }) */