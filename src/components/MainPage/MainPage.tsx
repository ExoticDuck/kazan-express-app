import React, { useEffect, useState } from 'react';
import { API } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsLoadingAC, setTokenAC } from '../../store/reducers/AppReducer';
import { setUserInfoAC, setUserStatAC } from '../../store/reducers/UserReducer';
import Header from '../Header/Header';
import style from './MainPage.module.css'
import Shop from './Shop/Shop';
import Statistics from './Statistics/Statistics';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    let shops = useAppSelector(state => state.user.userInfo.shops);
    let todayData = useAppSelector(state => state.user.userStat.today);
    let yesterdayData = useAppSelector(state => state.user.userStat.yesterday);
    let navigate = useNavigate();

    let [isActiveBtn, setIsActiveButton] = useState(false);

    console.log(shops)

    let dispatch = useAppDispatch();
    let reduxToken = useAppSelector(state => state.app.token);
  
    useEffect(() => {
      let token = localStorage.access_token;
      if (token !== "") {
        dispatch(setTokenAC(token));
      }
    }, [])
  
    useEffect(() => {
      if (reduxToken !== "") {
        dispatch(setIsLoadingAC(true))
        API.getUserInfo(reduxToken).then((res) => {
          console.log(res.data);
          dispatch(setUserInfoAC(res.data))
        }).then((res) => {
          API.getUserStat(reduxToken).then((res) => {
            console.log(res.data);
            dispatch(setUserStatAC(res.data))
          })
          dispatch(setIsLoadingAC(false))
        }).catch((e) => {
            navigate("/login");
        })
      }
    }, [reduxToken])

  return (
    <div className={style.Container}>
        <Header isActiveButton={isActiveBtn} setIsActive={setIsActiveButton}/>
        <div className={style.BoxContainer}>
            <div className={isActiveBtn ? style.LeftColumnActive : style.LeftColumn}>
                <div className={style.ShopBlock}>
                    <div className={style.ShopContainer}>
                        {shops.map((el, i) => {
                            return <Shop title={el.title} id={el.id} key={i}/>
                        })}
                    </div>
                </div>
            </div>
            <div className={style.RightColumn}>
                <Statistics title="Продажи за сегодня" data={todayData}/>
                <Statistics title="Продажи за вчера" data={yesterdayData}/>
            </div>
        </div>
    </div>
  )
}

export default MainPage