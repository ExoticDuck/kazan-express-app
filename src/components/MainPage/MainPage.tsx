import React, { useEffect, useState } from 'react';
import { API } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsLoadingAC, setTokenAC } from '../../store/reducers/AppReducer';
import { setSelectedShopAC, setUserInfoAC, setUserStatAC, UserInfoTC } from '../../store/reducers/UserReducer';
import Header from '../Header/Header';
import style from './MainPage.module.css'
import Shop from './Shop/Shop';
import Statistics, { InvoicesStatistics } from './Statistics/Statistics';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  let shops = useAppSelector(state => state.user.userInfo.shops);
  let todayData = useAppSelector(state => state.user.userStat.today);
  let yesterdayData = useAppSelector(state => state.user.userStat.yesterday);
  let invoicesData = useAppSelector(state => state.user.invoices); 
  let navigate = useNavigate();

  let [isActiveBtn, setIsActiveButton] = useState(false);

  console.log(shops)

  let dispatch = useAppDispatch();
  let reduxToken = useAppSelector(state => state.app.token);

  useEffect(() => {
    // dispatch(setIsLoadingAC(false));
    let token = localStorage.access_token;
    if (token !== undefined && token !== "" && token !== null) {
      dispatch(UserInfoTC(token));
    } else {
      navigate("/login");
    }
  }, [dispatch])

  return (
    <div className={style.Container}>
      <Header isActiveButton={isActiveBtn} setIsActive={setIsActiveButton} />
      <div className={style.BoxContainer}>
        <div className={style.LeftContainer}>
          <div className={isActiveBtn ? style.LeftColumnActive : style.LeftColumn}>
            <div className={style.ShopBlock}>
              <div className={style.ShopContainer}>
                {shops.map((el, i) => {
                  return <Shop title={el.title} id={el.id} key={i} onClick={() => dispatch(setSelectedShopAC(el.id, el.title))}/>
                })}
              </div>
            </div>
          </div>
          <div className={isActiveBtn ? style.LeftColumnDefaultOff : style.LeftColumnDefault}>
          <div className={style.ShopBlock}>
              <div className={style.ShopContainer}>
                {[{title: "Мои товары", id: 1}, {title: "Склад", id: 2},{title: "Накладные", id: 3}].map((el, i) => {
                  return <Shop title={el.title} id={el.id} key={i} />
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={style.RightColumn}>
          <Statistics title="Продажи за сегодня" data={todayData} />
          <Statistics title="Продажи за вчера" data={yesterdayData} />
          <InvoicesStatistics title="Статистика по накладным" data={invoicesData} />
        </div>
      </div>
    </div>
  )
}

export default MainPage