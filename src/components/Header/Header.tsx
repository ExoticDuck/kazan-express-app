import React from 'react';
import style from './Header.module.css';
import logo from '../../img/KEstat-icon-white.png'
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './../../store/hooks';
import { resetUserAC, setSelectedShopAC } from '../../store/reducers/UserReducer';
import { ReactComponent as Logo } from '../../img/KEstatLogo.svg';
import { useState } from 'react';

type HeaderPropsType = {
    // isActiveButton: boolean
    // setIsActive: (isActive: boolean) => void
}

function Header(props: HeaderPropsType) {
    let name = useAppSelector(state => state.user.userInfo.name);
    let surname = useAppSelector(state => state.user.userInfo.surname);
    let email = useAppSelector(state => state.user.userInfo.email);
    let selectedShop = useAppSelector(state => state.user.selectedShop);
    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    // let [isActiveBtn, setIsActiveButton] = useState(false);

    function onExitClickHandler() {
        localStorage.removeItem("access_token");
        dispatch(resetUserAC());
        navigate('/login');
    }

    function onShopsClickHandler() {
        // props.setIsActive(!props.isActiveButton);
    }

    function onStatClickHandler() {
        dispatch(setSelectedShopAC(0, ""))
    }

    return (
        <div className={style.Container}>
            <div className={style.LogoContainer}>
                <div onClick={() => navigate('/seller')}><Logo /></div>
            </div>
            <div className={style.LeftContainer}>
                <div onClick={() => navigate('/seller')} className={style.Cabinet} >
                    Личный кабинет
                </div>
                <div onClick={() => navigate('/seller')} className={style.Statistics}>
                    Статистика
                </div>
                <div onClick={() => navigate('/seller')} className={style.Purchases}>Закупки</div>
                <div onClick={() => navigate('/seller')} className={style.Storeroom}>Склад</div>
            </div>
            <div className={style.InfoContainer}>
                <div className={style.PersonInfoContainer}>
                    <div style={{ width: "fit-content" }}>{name} {surname}</div>
                </div>
            </div>
        </div>
    )
}

export default Header