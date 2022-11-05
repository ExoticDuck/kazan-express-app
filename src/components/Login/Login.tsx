import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import style from "./Login.module.css"
import logo from "../../img/KEstat-icon.png";
import qr from "../../img/qr-black.png";
import { ReactComponent as QRcode } from '../../img/qr-icon.svg';
import { useSelector, useDispatch } from "react-redux"
import { RootStateType } from '../../store/store';
import { LoginTC, setEmailAC, setPasswordAC } from '../../store/reducers/LoginReducer';
import { useAppDispatch, useAppSelector } from './../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { setErrorAC, setIsLoadingAC } from '../../store/reducers/AppReducer';


function Login() {

    const navigate = useNavigate()

    let emailValue = useSelector((state: RootStateType) => state.login.email);
    let passwordValue = useSelector((state: RootStateType) => state.login.password);
    let error = useAppSelector(state => state.app.error);

    let dispatch = useAppDispatch();

    let token = localStorage.getItem('access_token');

    useEffect(() => {
        if(token !== undefined && token !== "" && token !== null) {
            navigate("/seller")
        }
    }, [token, navigate, dispatch])

    const [showPassword, setShowPassword] = useState(false);

    function emailChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        if(error.isActive !== false) {
            dispatch(setErrorAC(false, ""))
        }
        let value = e.currentTarget.value.trim();
        dispatch(setEmailAC(value))
    }
    function passwordChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        if(error.isActive !== false) {
            dispatch(setErrorAC(false, ""))
        }
        let value = e.currentTarget.value.trim();
        dispatch(setPasswordAC(value))
    }
    function onSubmit() {
        if (emailValue.trim() !== "" && passwordValue.trim() !== "") {
            dispatch(LoginTC(emailValue, passwordValue))
        }
    }

    return (
        <div className={style.Container}>
            <div className={style.GridBox}>
                <img src={logo} alt="logo" className={style.Logo} />
                <div className={style.InputBox}>
                    <div className={style.Title}>Вход в систему</div>
                    <input className={error.isActive ? style.InputEmailError : style.InputEmail} placeholder="Введите почту..." value={emailValue} onChange={emailChangeHandler} />

                    <div className={error.isActive ? style.PasswordInputError : style.PasswordInput}>
                        <input className={error.isActive ? style.InputError : style.Input} placeholder="Введите пароль..." type={showPassword ? "text" : "password"} value={passwordValue} onChange={passwordChangeHandler}></input>
                        <div className={style.Eye} onClick={() => setShowPassword(!showPassword)}>
                            <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                        </div>
                    </div>
                    {error.isActive && <div className={style.ErrorMessage}>{error.message}</div>}
                    <button className={style.Button} onClick={onSubmit}>Войти</button>
                </div>
                <div className={style.QrContainer}>
                    <div className={style.QrTitle}>Нет аккаунта?</div>
                    <div className={style.QrBox}><a href='https://t.me/KEstat_bot'><QRcode className={style.Qr}/></a></div>
                    <div className={style.QrTitleBottom}>Сканируй QR!</div>
                </div>
            </div>
        </div>
    )
}

export default Login