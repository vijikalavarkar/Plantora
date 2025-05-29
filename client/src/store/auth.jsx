import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [ token, setToken ] = useState(localStorage.getItem('token'));
    const [ user, setUser ] = useState("")
    const [ service, setService ] = useState("")

    const storeTokeninLocalStorage = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem('token', serverToken)
    }

    let isLoggedIn = !!token;

    const userLogout = () => {
        setToken("");
        localStorage.removeItem('token')
    }

    


    // user Authentication
    const userAuthentication = async () => {

        const response = await fetch('http://localhost:4001/api/v1/auth/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if(response.ok){
            const data = await response.json();
            setUser(data.userData);

        }

    }


    useEffect(()=>{
        userAuthentication();
    }, [])


    // serice Datas
    const userServices = async () => {

        const response = await fetch('http://localhost:4001/api/v1/auth/service', {
            method: 'GET',
        });

        if(response.ok){
            const data = await response.json();
            setService(data.serviceData);
        }

    }

    useEffect(()=>{
        userServices();
    }, [])


    return(
        <AuthContext.Provider value={{ storeTokeninLocalStorage, userLogout, isLoggedIn, user, service }}>
            {children}
        </AuthContext.Provider>  
    )

}

export const useAuth = () => {

    const useContextValue = useContext(AuthContext)

    if(!useContextValue){
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return useContextValue;

}