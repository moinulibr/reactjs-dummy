import React, { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useStateContext } from '../../config/ContextProvider';
import axios from 'axios';

const Login = () => {
    const [loading,setLoading] = useState(false);
    const [loginSuccess,setLoginSuccess] = useState(false);
    const { setUser, setAccessToken } = useStateContext()
    const [message,setMessage] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();

    const submitForm = async (event) => {
        event.preventDefault();
        setMessage(null);
        const base_url = import.meta.env.VITE_API_BASE_URL;
        //let credentials = {email:'admin@gmail.com',password:'12345678'};

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        try{
            setLoading(true);
            const response = await fetch(`${base_url}/api/login`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(payload)
            });
            const jsonResponse =  await response.json();
            //console.log(jsonResponse);
            if(jsonResponse?.success === true){
                setLoginSuccess(true);
                setLoading(false);
                setMessage(null);

                //localStorage.setItem('ACCESS_TOKEN',jsonResponse.token);
                setUser({name:jsonResponse.user.name})
                setAccessToken(jsonResponse.token);
                //console.log(jsonResponse.token);
                //console.log(jsonResponse);
                return <Navigate to="/" />
            }
            else if (jsonResponse?.success === false){
                setLoading(false);
                setLoginSuccess(false);
                setMessage(jsonResponse.errors);

                //console.log((jsonResponse.errors));
                //console.log(jsonResponse);
            }
        }catch(err){
            setLoading(false);
            //console.log(err);
        }
    };
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    console.log(accessToken);
    if(accessToken){
        return <Navigate to="/" />
    }
    return (
        <div className="login-signup-form animated fadeInDown">
        <div className="form">
        <form onSubmit={submitForm}>
            <h1 className="title">Login into your account</h1>

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
                loginSuccess && 
                <p style={{ color:'green' }}>Login Successful</p>
            }

            <input ref={emailRef} onChange={(e) => e.currentTarget.value } type="email" placeholder="Email"/>
            <input ref={passwordRef} onChange={(e) => e.currentTarget.value } type="password" placeholder="Password"/>
            <button className="btn btn-block">Login</button>
            <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
        </div>
    </div>
    );
};

export default Login;