import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user : null,
    accessToken : null,
    notification: null,
    setUser: () => {},
    setAccessToken: () => {},
    setNotification: () => {},
});


export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    const [accessToken, _setAccessToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setAccessToken = (accessToken) => {
        _setAccessToken(accessToken);
        if(accessToken){
            localStorage.setItem('ACCESS_TOKEN',accessToken);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };


    const setNotification = (message) => {
        _setNotification(message);
    
        setTimeout(() => {
            _setNotification('')
        }, 5000)
        }

        
        
    return (
        <StateContext.Provider value={{ 
            user,
            setUser,
            accessToken,
            setAccessToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);