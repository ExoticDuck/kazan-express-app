import React, { useEffect, useLayoutEffect, useRef } from 'react';
import style from './Header.module.css';
import logo from '../../img/KEstat-icon-white.png'
import { useAppSelector } from '../../store/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from './../../store/hooks';
import { resetUserAC } from '../../store/reducers/UserReducer';
import { ReactComponent as Logo } from '../../img/KEstatLogo.svg';
import { ReactComponent as Rectangle1 } from '../../img/Rectangle 80.svg';
import { ReactComponent as Rectangle2 } from '../../img/Rectangle 81.svg';
import { ReactComponent as Rectangle3 } from '../../img/Rectangle 82.svg';
import { useState } from 'react';

type HeaderPropsType = {
    // isActiveButton: boolean
    // setIsActive: (isActive: boolean) => void
}

function Header(props: HeaderPropsType) {
    let name = useAppSelector(state => state.user.userInfo.name);
    let surname = useAppSelector(state => state.user.userInfo.surname);

    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    const [exitActive, setExitActive] = useState(false);

    function onExitClickHandler() {
        setExitActive(true);
    }

    function onYesClick() {
        localStorage.removeItem("access_token");
        dispatch(resetUserAC());
        navigate('/login');
    }

    function onNoClick() {
        setExitActive(false);
    }

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return innerWidth;
    }

    const [windowWidth, setWindowWidth] = useState(getWindowSize());
    const [menuExpanded, setMenuExpanded] = useState(false);

    useEffect(() => {
        function handleWindowResize() {
            setWindowWidth(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    console.log("window width ", windowWidth);

    if (windowWidth < 1100) {
        return (
            <div className={style.ContainerSmall}>
                <div className={style.Wrapper}>
                    <div className={style.SmallBox}>
                        <div className={style.RectangleBox} onClick={() => setMenuExpanded(!menuExpanded)}>
                            <Rectangle1 />
                            <Rectangle2 />
                            <Rectangle3 />
                            <div className={style.LogoContainer}>
                                <div onClick={() => navigate('/seller')}><Logo /></div>
                            </div>
                        </div>
                    </div>
                    {menuExpanded &&
                        <div className={style.ExpandableMenu}>
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
                            <div className={style.InfoContainer}>
                                <div className={style.PersonInfoContainer}>
                                    <div style={{ width: "fit-content", color: "#000" }}>{name} {surname}</div>
                                </div>
                            </div>
                            <div className={style.StoreroomActive}>
                                Техподдержка
                            </div>
                            {exitActive ?
                                <div className={style.ExpandedRightContainer}>
                                    <div className={style.RedText}>Вы точно желаете выйти?</div>
                                    <div className={style.ButtonBox}>
                                        <div className={style.Yes} onClick={onYesClick}>Да</div>
                                        <div className={style.Yes} onClick={onNoClick}>Нет</div>
                                    </div>
                                </div>
                                :
                                <div className={style.RightContainer} onClick={onExitClickHandler}>
                                    Выход
                                </div>}
                        </div>
                    }
                </div>

            </div >);
    } else {
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


}

export default Header