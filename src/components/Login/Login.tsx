import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import style from "./Login.module.css"
import logo from "../../img/KEstat-icon.png";
import qr from "../../img/qr-code.png";

import {useSelector, useDispatch} from "react-redux"
import { RootStateType } from '../../store/store';
import { LoginTC, setEmailAC, setPasswordAC } from '../../store/reducers/LoginReducer';
import { useAppDispatch } from './../../store/hooks';
import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate()
    
    let emailValue = useSelector((state: RootStateType) => state.login.email);
    let passwordValue = useSelector((state: RootStateType) => state.login.password);
    let dispatch = useAppDispatch();
    
    const [showPassword, setShowPassword] = useState(false);

    function emailChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        let value = e.currentTarget.value.trim();
        dispatch(setEmailAC(value))
    }
    function passwordChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        let value = e.currentTarget.value.trim();
        dispatch(setPasswordAC(value))
    }
    function onSubmit() {
        if(emailValue.trim() !== "" && passwordValue.trim() !== "" ) {
            dispatch(LoginTC(emailValue, passwordValue))
            navigate("/seller")
        }
    }

    return (
        <div className={style.Container}>
            <div className={style.GridBox}>
                <div className={style.LeftBox}>
                    <img src={logo} alt="logo" className={style.Logo} />
                    <input className={style.Input} placeholder="Введите email" type={"email"} value={emailValue} onChange={emailChangeHandler}/>
                    <div className={style.InputBox}>
                        <input className={style.Input} placeholder="Введите пароль" type={showPassword ? "text" : "password"} value={passwordValue} onChange={passwordChangeHandler}></input>
                        <div className={style.Eye} onClick={() => setShowPassword(!showPassword)}>
                            <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                        </div>
                    </div>
                    <button className={style.Button} onClick={onSubmit}>Войти</button>
                    <div className={style.QrContainer}><a href='https://t.me/KEstat_bot'><img src={qr} alt="logo" className={style.Qr} /></a></div>
                </div>
                <div className={style.RightBox}>
                    <div className={style.TextContainer}>
                        KEstat - это сервис для продавцов KazanExpress. Расширенный функционал по учету товаров, накладных,
                        заказов. Получай уведомления о заканчивающихся скидках прямо из бота! Никаких сторонних CRM, долгих
                        подключений и непонятного интерфейса. Для регистрации перейди в Telegram бот @KEstat_bot или отсканируй
                        QR-код.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login