import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Posts } from './components/Posts/Posts';
import { Nav } from './components/Nav/Nav';
import { Post } from './components/Post/Post';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Nav />
      <Routes>
      <Route path="/" element={<Login/>}/> 
          <Route path="/post" element={<Post/>}/>
          <Route path="/posts" element={<Posts/>}/>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
