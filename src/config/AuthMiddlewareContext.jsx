import { createContext, useContext, useState } from "react";

const AuthStateContext = createContext({
    user : null,
    token : null,
    setUser: () => {},
    setToken: () => {}
});


export const AuthMiddlewareContext = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(123);//localStorage.removeItem('ACCESS_TOKEN')

    const setToken = (token) => {
        _setToken(token);
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    return (
        <AuthStateContext.Provider value={{ 
            user,
            setUser,
            token,
            setToken,
        }}>
            {children}
        </AuthStateContext.Provider>
    )
};

export const useAuthStateContext = () => useContext(AuthStateContext);


//formObj;// {email:'admin@gmail.com',password:'12345678'};
        /* fetch(base_url+'/login', 
        {
            method:'post',
            'withCredentials':false,
            mode:'no-cors',
            headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            //localStorage.setItem('token',data.token);
            //console.log(data.message);
        })   
        .then(json => console.log(json))   
        .then(error => console.log(error)); 
        return 0; */