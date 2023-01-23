import React, { useEffect, useState } from 'react';
import { API } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsLoadingAC, setTokenAC } from '../../store/reducers/AppReducer';
import { resetUserAC, setUserInfoAC, UserInfoTC } from '../../store/reducers/UserReducer';
import Header from '../Header/Header';
import style from './MainPage.module.css'
import Shop from './Shop/Shop';
import Statistics, { InvoicesStatistics } from './Statistics/Statistics';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../img/logo.svg';
import Table from './Table/Table';
import Footer from '../Footer/Footer';

function MainPage() {
  let shops = useAppSelector(state => state.user.userInfo.shops);
  // let todayData = useAppSelector(state => state.user.userStat.today);
  // let yesterdayData = useAppSelector(state => state.user.userStat.yesterday);
  // let monthData = useAppSelector(state => state.user.userStat.month);
  // let topTurnover = useAppSelector(state => state.user.userStat.top_turnover);
  // let topClean = useAppSelector(state => state.user.userStat.top_clean);
  // let topDead = useAppSelector(state => state.user.userStat.top_dead);
  let userName = useAppSelector(state => state.user.userInfo.name);
  let userSurname = useAppSelector(state => state.user.userInfo.surname);
  let navigate = useNavigate();

  let [isActiveBtn, setIsActiveButton] = useState(false);

  console.log(shops)

  let dispatch = useAppDispatch();
  let reduxToken = useAppSelector(state => state.app.token);

  function onExitClickHandler() {
    localStorage.removeItem("access_token");
    dispatch(resetUserAC());
    navigate('/login');
  }

  useEffect(() => {
    // dispatch(setIsLoadingAC(false));
    let token = localStorage.access_token;
    if (token !== undefined && token !== "" && token !== null) {
      debugger
      dispatch(UserInfoTC(token));
    } else {
      navigate("/login");
    }
  }, [dispatch])
  console.log(shops);

  return (
    <div className={style.Container}>
      <Header/>
      {/* <div className={style.BoxContainer}>
        <div className={style.LeftContainer}>
          <Logo className={style.LogoLeft} />
          <div className={style.ShopMenuBox}>
            <div className={style.Shops}>
              <div className={style.ShopsTitle}>Магазины</div>
              <div className={style.ShopList}>
                {shops.map((el, i) => {
                  return <Shop title={el.title} id={el.id} key={i} onClick={() => dispatch(setSelectedShopAC(el.id, el.title))} />
                })}
              </div>
            </div>
            <div className={style.Menu}>
              <div className={style.MenuTitle}>Меню</div>
              <div className={style.MenuItem}>Закупки</div>
              <div className={style.MenuItem}>Продажи</div>
              <div className={style.MenuItem}>Склад</div>
              <div className={style.MenuItem}>Накладные</div>
              <div className={style.MenuItem}>Возвраты</div>
              <div className={style.MenuItem}>Сотрудники</div>
              <div className={style.MenuItem}>Настройки</div>
              <div className={style.MenuItem} onClick={onExitClickHandler}>Выход</div>
            </div>

          </div>
          <div className={style.Statistic}>
            <div className={style.StatisticTitle}>Статистика</div>
            <Statistics title="За сегодня" data={todayData} />
            <Statistics title="За вчера" data={yesterdayData} />
            <Statistics title="За месяц" data={monthData} />
          </div>
        </div>
        <div className={style.RightColumn}>
          <Logo className={style.LogoRight} />
          <div className={style.Name}>{userName + " " + userSurname}</div>
          <Table data={topTurnover} title={"Топ 10 товаров по обороту"} type={'turnover'} />
          <Table data={topClean} title={"Топ 10 товаров по чистой прибыли"} type={"profit"} />
          <Table data={topDead} title={"Топ 10 товаров dead stock"} type={'quantity'} />
        </div>
      </div> */}
      <Footer/>
    </div>
  )
}

export default MainPage