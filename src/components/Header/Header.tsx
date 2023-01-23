import React from 'react';
import style from './Header.module.css';
import logo from '../../img/KEstat-icon-white.png'
import { useAppSelector } from '../../store/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from './../../store/hooks';
import { resetUserAC} from '../../store/reducers/UserReducer';
import { ReactComponent as Logo } from '../../img/KEstatLogo.svg';
import { useState } from 'react';

type HeaderPropsType = {
    // isActiveButton: boolean
    // setIsActive: (isActive: boolean) => void
}

function Header(props: HeaderPropsType) {
    let name = useAppSelector(state => state.user.userInfo.name);
    let surname = useAppSelector(state => state.user.userInfo.surname);
    // let email = useAppSelector(state => state.user.userInfo.email);
    // let selectedShop = useAppSelector(state => state.user.selectedShop);
    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    // let [isActiveBtn, setIsActiveButton] = useState(false);



    return (
        <div className={style.Container}>
            <div className={style.LogoContainer}>
                <div onClick={() => navigate('/seller')}><Logo /></div>
            </div>
            <div className={style.LeftContainer}>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? style.CabinetActive : style.Cabinet
                    }
                >
                    Личный кабинет
                </NavLink>
                <NavLink
                    to="profile"
                    className={({ isActive }) =>
                        isActive ? style.StatisticsActive : style.Statistics
                    }
                >
                    Статистика
                </NavLink>
                <NavLink
                    to="/purchases"
                    className={({ isActive }) =>
                        isActive ? style.PurchasesActive : style.Purchases
                    }
                >
                    Закупки
                </NavLink>
                <NavLink
                    to="profile"
                    className={({ isActive }) =>
                        isActive ? style.StoreroomActive : style.Storeroom
                    }
                >
                    Склад
                </NavLink>
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