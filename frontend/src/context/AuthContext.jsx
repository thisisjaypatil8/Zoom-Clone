import { createContext, useContext, useState } from "react";
import { redirect, useNavigate } from "react-router";
import axios from "axios";
import httpStatus from "http-status";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users",
})

export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);

    const handleRegister = async (fullname, username, password) => {
        try {
            let request = await client.post("/register", {
                fullname,
                username,
                password
            })
            if(request.status === httpStatus.CREATED){
                return request.data.message;
            }
        } catch (e) {
            throw e;
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            })
            if(request.status === httpStatus.OK){
                localStorage.setItem("token", request.data.token);
                router("/");
            }
        } catch (e) {
            throw e;
        }
    }
    
    const router = useNavigate();

    const data = {
        userData, setUserData, handleLogin, handleRegister
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}