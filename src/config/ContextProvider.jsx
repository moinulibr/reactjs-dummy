import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user : null,
    accessToken : null,
    setUser: () => {},
    setAccessToken: () => {}
});


export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({
        name : ''
    });
    const [accessToken, _setAccessToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setAccessToken = (accessToken) => {
        _setAccessToken(accessToken);
        if(accessToken){
            localStorage.setItem('ACCESS_TOKEN',accessToken);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    return (
        <StateContext.Provider value={{ 
            user,
            setUser,
            accessToken,
            setAccessToken,
        }}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);