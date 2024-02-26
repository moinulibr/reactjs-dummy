import {Link} from "react-router-dom";
import {createRef, useState} from "react";
//import axiosClient from "../axios-client.js";
import { useStateContext } from '../../config/ContextProvider';
import axios from "axios";

export default function Signup() {
const [loading,setLoading] = useState(false);
const [message,setMessage] = useState(null);
const [registrationSuccess,setRegistrationSuccess] = useState(false);

const nameRef = createRef()
const emailRef = createRef()
const passwordRef = createRef()
const passwordConfirmationRef = createRef()
const {setUser, setAccessToken} = useStateContext()
const [errors, setErrors] = useState(null)

const onSubmit = async (ev) => {
    ev.preventDefault()
    setLoading(true);
    setMessage(null);
    const payload = {
    name: nameRef.current.value,
    email: emailRef.current.value,
    password: passwordRef.current.value,
    password_confirmation: passwordConfirmationRef.current.value,
    }
    const data = {
        name:'moin',
        email:'moi@gmail.com',
        password:'123456',
        password_confirmation:'123456'
    };
    const base_url = import.meta.env.VITE_API_BASE_URL;
    let response =  await fetch(`${base_url}/api/register`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const jsonResponse = await response?.json();
    if(jsonResponse.success === true){
        setRegistrationSuccess(true);
        //console.log(jsonResponse);
        setMessage(null);
    }else if(jsonResponse.success === false){
        setMessage(jsonResponse.errors);
        //console.log(jsonResponse);
        setRegistrationSuccess(null);
        setLoading(false);
    }
    setLoading(false);
    //console.log(jsonResponse);  
    /* axios.post('/signup', payload)
    .then(({data}) => {
        setUser(data.user)
        setAccessToken(data.token);
    })
    .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
        setErrors(response.data.errors)
        }
    }) */
}

return (
    <div className="login-signup-form animated fadeInDown">
    <div className="form">
        <form onSubmit={onSubmit}>
        <h1 className="title">Signup for Free</h1>
            {message &&
                Object.keys(message).map((error, index) => (
                    <div className="alert" key={index}>
                        <p>{message[error][0]}</p>
                    </div>
                ))
            }
            {/* message &&
            <div className="alert">
                <p>{message}</p>
            </div> */
            }
            {
                loading && 
                <p style={{ marginBottom:"10px",'textAlign':'center' }}>Loading...</p>
            }
            {
                registrationSuccess && 
                <p style={{  marginBottom:"10px",color:'green','textAlign':'center' }}>Registration Successful</p>
            }

        <input ref={nameRef} type="text" placeholder="Full Name"/>
        <input ref={emailRef} type="email" placeholder="Email Address"/>
        <input ref={passwordRef} type="password" placeholder="Password"/>
        <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
        <button className="btn btn-block">Signup</button>
        <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
    </div>
    </div>
)
}
