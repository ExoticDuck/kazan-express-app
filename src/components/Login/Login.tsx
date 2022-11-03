import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import style from "./Login.module.css"
import logo from "../../img/KEstat-icon.png";
import qr from "../../img/qr-black.png";

import { useSelector, useDispatch } from "react-redux"
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
        if (emailValue.trim() !== "" && passwordValue.trim() !== "") {
            navigate("/seller")
            dispatch(LoginTC(emailValue, passwordValue))

        }
    }

    return (
        <div className={style.Container}>
            <div className={style.GridBox}>
                <img src={logo} alt="logo" className={style.Logo} />
                <div className={style.InputBox}>
                    <div className={style.Title}>Вход в систему</div>
                    <input className={style.InputEmail} placeholder="Введите почту..." value={emailValue} onChange={emailChangeHandler} />

                    <div className={style.PasswordInput}>
                        <input className={style.Input} placeholder="Введите пароль..." type={showPassword ? "text" : "password"} value={passwordValue} onChange={passwordChangeHandler}></input>
                        <div className={style.Eye} onClick={() => setShowPassword(!showPassword)}>
                            <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                        </div>
                    </div>
                    <button className={style.Button} onClick={onSubmit}>Войти</button>
                </div>
                <div className={style.QrContainer}>
                    <div className={style.QrTitle}>Нет аккаунта?</div>
                    <div className={style.QrBox}><a href='https://t.me/KEstat_bot'><img src={qr} alt="logo" className={style.Qr} /></a></div>
                    <div className={style.QrTitleBottom}>Сканируй QR!</div>
                </div>
            </div>
        </div>
    )
}

export default Login