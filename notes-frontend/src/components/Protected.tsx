import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Login } from "./Login";

interface loginStatus {
    isLoggedIn: boolean
}

export function Protected() {

    const [isAuth, setIsAuth] = useState(true); 

    useEffect(() => {
        console.log("useeffect i Protected körs")
        let loginStatus = localStorage.getItem("loggedIn");
        console.log(loginStatus);
    })

    // 
    // setIsAuth(true)
   // const isAuth = true;
    

    return isAuth ? <Outlet/> : <Login/>
}