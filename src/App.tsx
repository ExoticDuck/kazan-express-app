import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import { useAppSelector, useAppDispatch } from './store/hooks';
import Loader from './components/Loader/Loader';
import MainPage from './components/MainPage/MainPage';
import { useEffect } from 'react';
import { API } from './api/api';
import { setUserInfoAC} from './store/reducers/UserReducer';
import { setIsLoadingAC, setTokenAC } from './store/reducers/AppReducer';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Purchases from './components/Purchases/Purchases';

function App() {
 

  let isLoading = useAppSelector(state => state.app.isLoading);
  return (
    <div className="App">
      {isLoading && <Loader />}
      <Routes>
        <Route element={<Home/>} path={"/"}></Route>
        <Route element={<Login />} path={"/login"}></Route>
        <Route element={<Profile />} path={"/profile"}></Route>
        <Route element={<Purchases />} path={"/purchases"}></Route>
      </Routes>
    </div>
  );
}

export default App;
