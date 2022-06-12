import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Posts } from "../Posts/Posts";
import './Login.scss';


interface newUser {
    username: string,
    password: string
}




export function Login() {

    const [user, setUser] = useState<newUser>({
        username: "",
        password: ""
    });

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>();

    useEffect(() => {
        let checkLogin = localStorage.getItem("loggedIn");
        if (checkLogin) {
            JSON.parse(checkLogin)
            
            if (checkLogin === "true") {
                setIsLoggedIn(true);
            } else if (checkLogin === "false") {
                setIsLoggedIn(false);
            }
        }
    }, [])

    console.log("isLoggedIn: " + isLoggedIn)

    async function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:4000/login", user)
            .then(res => {setIsLoggedIn(JSON.parse(res.data)) })
            localStorage.setItem("loggedIn", JSON.stringify(true));
            
        } catch(err) {
            console.log(err)
            alert("Wrong username or password")           
        }   
    }

    

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name: string = e.target.name;
       setUser({ ...user, [name]: e.target.value })
  
    }

    
    return (<>

        {!isLoggedIn &&
            (
                <><h1>Log in</h1><form onSubmit={login}>
                <input required type="text" name="username" value={user.username} onChange={handleChange} />
                <input required type="password" name="password" value={user.password} onChange={handleChange} />
                <button type="submit">Log in</button>
            </form></>
            )}
        {isLoggedIn &&(
            <Posts/>
        )}
    </>)
}