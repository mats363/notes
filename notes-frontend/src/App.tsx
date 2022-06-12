import React, { useState } from 'react';
import './App.css';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function logOut() {
    setIsLoggedIn(false)
    localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
  }

  return (
    <>
    <div className="App">
      <h1>Baddagboken</h1>
      <button onClick={logOut}>Log out</button>
    </div>

    
    </>
  );
}

export default App;
