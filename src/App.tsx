import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<div>home</div>} path={"/"}></Route>
        <Route element={<Login/>} path={"/login"}></Route>
      </Routes>
    </div>
  );
}

export default App;
