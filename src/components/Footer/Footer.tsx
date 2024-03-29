import React, { useLayoutEffect, useRef } from 'react';
import style from './Footer.module.css';
import logo from '../../img/KEstat-icon-white.png'
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { resetUserAC } from '../../store/reducers/UserReducer';
import { ReactComponent as Logo } from '../../img/Group 1.svg';
import { useState } from 'react';

type FooterPropsType = {

}

function Footer(props: FooterPropsType) {
    const [exitActive, setExitActive] = useState(false);
    let error = useAppSelector(state => state.app.error);

    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    const Box = useRef(null);
    const String = useRef(null);

    const [boxWidth, setBoxWidth] = useState(0);
    const [stringWidth, setStringWidth] = useState(0);
    console.log('box: ' + boxWidth + ", Str: " + stringWidth)
    useLayoutEffect(() => {
        
            //@ts-ignore 
            setBoxWidth(Box.current.offsetWidth);
            //@ts-ignore 
            setStringWidth(String.current.offsetWidth);        
    }, [error.isActive]);

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

    return (
        <div className={style.Container}>
            <div className={style.LeftContainer}>
                Техподдержка
            </div>
            <div className={exitActive ? style.CenterContainerSmall : style.CenterContainer}>
                {error.isActive ? 
                <div className={style.ErrorMessage} ref={Box} id={boxWidth <= (stringWidth + 30) ? style.RunningBox : ""}>
                    <div ref={String} className={style.Runline} id={boxWidth <= (stringWidth + 30) ? style.Running : ""}>
                        {error.message}
                    </div>
                </div>
                : 
                <div ref={Box}>
                    <div ref={String}>

                    </div>
                </div>}
            </div>
            {exitActive ?
                <div className={style.ExpandedRightContainer}>
                    <div className={style.RedText}>Вы точно желаете покинуть учетную запись?</div>
                    <div className={style.Yes} onClick={onYesClick}>Да</div>
                    <div className={style.Yes} onClick={onNoClick}>Нет</div>
                </div>
                :
                <div className={style.RightContainer} onClick={onExitClickHandler}>
                    Выход
                </div>}
        </div>
    )
}

export default Footer;