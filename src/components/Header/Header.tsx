import React, { useLayoutEffect, useRef } from 'react';
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
   
    const Box = useRef(null);

    const [boxWidth, setBoxWidth] = useState(0);
    console.log('box: ' + boxWidth)
    // useLayoutEffect(() => {

    //     //@ts-ignore 
    //         //@ts-ignore
    //         if(Box && Box.current && Box.current.offsetWidth) {
    //             //@ts-ignore
    //             setBoxWidth(Box.current.offsetWidth);

    //         }
            
    //     //@ts-ignore
    // }, []);

    // if (boxWidth < 1100) {
    //     return (
    //         <div className={style.Container}>
    //             <div className={style.RectangleBox}>
    //                 <Rectangle1 />
    //                 <Rectangle2 />
    //                 <Rectangle3 />
    //             </div>
    //         </div>);
    // } else {
        return (
            <div className={style.Container} ref={Box}>
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
    // }


}

export default Header