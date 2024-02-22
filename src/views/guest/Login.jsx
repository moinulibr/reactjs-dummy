import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../config/ContextProvider';
import axios from 'axios';

const Login = () => {
    const { setUser, setToken } = useStateContext()
    const [message,setMessage] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    const submitForm = (event) => {
        event.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axios.post('/login', payload)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token);
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
            setMessage(response.data.message)
            }
        })
    };
    return (
        <div className="login-signup-form animated fadeInDown">
        <div className="form">
        <form onSubmit={submitForm}>
            <h1 className="title">Login into your account</h1>

            {message &&
            <div className="alert">
                <p>{message}</p>
            </div>
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