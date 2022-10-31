import React from 'react';
import style from './Header.module.css';
import logo from '../../img/KEstat-icon-white.png'
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './../../store/hooks';
import { resetUserAC } from '../../store/reducers/UserReducer';

function Header() {
    let name = useAppSelector(state => state.user.userInfo.name);
    let surname = useAppSelector(state => state.user.userInfo.surname);
    let email = useAppSelector(state => state.user.userInfo.email);
    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    function onClickHandler() {
        localStorage.removeItem("access_token");
        dispatch(resetUserAC());
        navigate('/login');
    }

    return (
        <div className={style.Container}>
            <div className={style.LogoContainer}>
                <div onClick={() => navigate('/seller')}><img src={logo} alt="" className={style.Logo}></img></div>
            </div>
            <div className={style.InfoContainer}>
                <div className={style.PersonInfoContainer}>
                    <div style={{ width: "fit-content" }}>{name} {surname}</div>
                    <div>{email}</div>
                </div>
                <div>
                    <button onClick={onClickHandler} className={style.Button}>Выход <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Header