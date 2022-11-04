import React from 'react';
import style from './Header.module.css';
import logo from '../../img/KEstat-icon-white.png'
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './../../store/hooks';
import { resetUserAC } from '../../store/reducers/UserReducer';
import { ReactComponent as Logo } from '../../img/Group 1.svg';
import { useState } from 'react';

type HeaderPropsType = {
    isActiveButton: boolean
    setIsActive: (isActive: boolean) => void
}

function Header(props: HeaderPropsType) {
    let name = useAppSelector(state => state.user.userInfo.name);
    let surname = useAppSelector(state => state.user.userInfo.surname);
    let email = useAppSelector(state => state.user.userInfo.email);
    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    // let [isActiveBtn, setIsActiveButton] = useState(false);

    function onExitClickHandler() {
        localStorage.removeItem("access_token");
        dispatch(resetUserAC());
        navigate('/login');
    }

    function onShopsClickHandler() {
        props.setIsActive(!props.isActiveButton);
    }

    return (
        <div className={style.Container}>
            <div className={style.LogoContainer}>
                <div onClick={() => navigate('/seller')}><Logo /></div>
            </div>
            <div className={style.LeftContainer}>
                <div className={props.isActiveButton ? style.ShopsButtonActive : style.ShopsButton} onClick={onShopsClickHandler}>
                    Мои магазины
                </div>
                <div className={style.StatisticsTitle}>
                    Общая статистика
                </div>
            </div>
            <div className={style.InfoContainer}>
                <div className={style.PersonInfoContainer}>
                    <div style={{ width: "fit-content" }}>{name} {surname}</div>
                </div>
                <div>
                    <button onClick={onExitClickHandler} className={style.Button}>Выход</button>
                </div>
            </div>
        </div>
    )
}

export default Header