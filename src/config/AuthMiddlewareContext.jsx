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