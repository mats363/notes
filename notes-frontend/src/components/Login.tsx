import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react"


interface newUser {
    username: string,
    password: string
}
export function Login() {

    const [user, setUser] = useState<newUser>({
        username: "",
        password: ""
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/login", user)
            .then(res => {console.log(res)})
            setIsLoggedIn(true)
            localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn))
            
        } catch(err) {
            console.log(err)
            alert("Wrong username or password")
        }

        console.log(user)
        
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let name: string = e.target.name;
       setUser({ ...user, [name]: e.target.value })
  
    }
   
    return (<>
        <h1>Log in</h1>
        <form onSubmit={login}>
            <input required type="text" name="username" value={user.username} onChange={handleChange}/>
            <input required type="password" name="password" value={user.password} onChange={handleChange}/>
            <button type="submit">Log in</button>
        </form>
    </>)
}