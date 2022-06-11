import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Post } from './components/Post';
import { Posts } from './components/Posts';
import { EditPost } from './components/EditPost';
import { Protected } from './components/Protected';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}/>
        <Route element={<Protected />}>
          <Route path="/post" element={<Post/>}/>
          <Route path="/posts" element={<Posts/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
