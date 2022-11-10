import React, { useEffect, useState } from 'react';
import { API } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsLoadingAC, setTokenAC } from '../../store/reducers/AppReducer';
import { resetUserAC, setSelectedShopAC, setUserInfoAC, setUserStatAC, UserInfoTC } from '../../store/reducers/UserReducer';
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
      {/* <Header isActiveButton={isActiveBtn} setIsActive={setIsActiveButton} /> */}
      <div className={style.BoxContainer}>
        <div className={style.LeftContainer}>
          <div className={style.ShopMenuBox}>
            <div className={style.Shops}>
              <div className={style.ShopsTitle}>Магазины</div>
              <div className={style.ShopList}>
                {shops.concat(...shops).map((el, i) => { //!убери потом нахуй concat
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
            <Statistics title="За месяц" data={yesterdayData} />
            {
              //!fix стата за месяц
            }
          </div>
          {/* <div className={isActiveBtn ? style.LeftColumnActive : style.LeftColumn}>
            <div className={style.ShopBlock}>
              <div className={style.ShopContainer}>
                {shops.map((el, i) => {
                  return <Shop title={el.title} id={el.id} key={i} onClick={() => dispatch(setSelectedShopAC(el.id, el.title))}/>
                })}
              </div>
            </div>
          </div> */}
          {/* <div className={isActiveBtn ? style.LeftColumnDefaultOff : style.LeftColumnDefault}>
            <div className={style.ShopBlock}>
              <div className={style.ShopContainer}>
                {[{ title: "Мои товары", id: 1 }, { title: "Склад", id: 2 }, { title: "Накладные", id: 3 }].map((el, i) => {
                  return <Shop title={el.title} id={el.id} key={i} />
                })}
              </div>
            </div>
          </div> */}
        </div>
        <div className={style.RightColumn}>

        </div>
      </div>
    </div>
  )
}

export default MainPage