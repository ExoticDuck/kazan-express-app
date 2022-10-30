import React, { useState } from 'react'
import style from "./Login.module.css"
import logo from "../../img/KEstat-icon.png";
import qr from "../../img/qr-code.png";


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={style.Container}>
            <div className={style.GridBox}>
                <div className={style.LeftBox}>
                    <img src={logo} alt="logo" className={style.Logo} />
                    <input className={style.Input} placeholder="Введите email" type={"email"} />
                    <div className={style.InputBox}>
                        <input className={style.Input} placeholder="Введите пароль" type={showPassword ? "text" : "password"}></input>
                        <div className={style.Eye} onClick={() => setShowPassword(!showPassword)}>
                            <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                        </div>
                    </div>
                    <button className={style.Button}>Войти</button>
                    <div className={style.QrContainer}><a href='https://t.me/KEstat_bot'><img src={qr} alt="logo" className={style.Qr} /></a></div>
                </div>
                <div className={style.RightBox}>
                    <div className={style.TextContainer}>
                        KEstat - это сервис для продавцов KazanExpress. Расширенный функционал по учету товаров, накладных,
                        заказов. Получай уведомления о заканчивающихся скидках прям из бота! Никаких сторонних CRM, долгих
                        подключений и непонятного интерфейса. Для регистрации перейди в Telegram бот @KEstat_bot или отсканируй
                        QR-код.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login