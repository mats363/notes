import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.scss';


export function Nav() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  let navigate = useNavigate();
  function logOut() {
    setIsLoggedIn(false)
    localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
    window.location.reload()
    navigate("/")
  }

  return (
    <>
    <div className="navbar">
      <h1>Baddagboken || Badedagbogen</h1>
      <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/post">Write new post</Link></li>
               
        </ul>
      </div>
      <button onClick={logOut}>Log out</button>
    </div>

    
    </>
  );
}


