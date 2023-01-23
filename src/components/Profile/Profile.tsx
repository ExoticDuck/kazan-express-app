import React, { ChangeEvent, useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Card from './Card/Card';
import style from "./Profile.module.css";
import { useAppDispatch, useAppSelector } from './../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { UserInfoTC } from '../../store/reducers/UserReducer';
import moment from 'moment';



function Profile() {
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let userInfo = useAppSelector(state => state.user.userInfo);
    let userAccount = useAppSelector(state => state.user.userAccount);
    let tariffs = useAppSelector(state => state.user.tariffs);

    let regDate = moment(userAccount.reg_date).format('DD.MM.YYYY');
    let endDate = moment(userAccount.date_end).format('DD.MM.YYYY');

    let colors = ["#1CC600", "#0073C6", "#ED00C7", "#ED7200", "#FF464C"];
    debugger
    useEffect(() => {
        let token = localStorage.access_token;
        if (token !== undefined && token !== "" && token !== null) {
            debugger
            dispatch(UserInfoTC(token));
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate])

    return (
        <div className={style.Container}>
            <Header />
            <div className={style.BoxContainer}>
                <div className={style.ProfileInfo}>
                    <div className={style.TopContainer}>
                        <div className={style.TopLeft}>
                            <div className={style.ProfileName}>{userInfo.name} {userInfo.surname}</div>
                            <div className={style.RegisterDate}>Дата создания профиля: {regDate}</div>
                        </div>
                        <div className={style.TopRight}>
                            <div className={style.Subscription}>Подписка {userAccount.status ? "активна" : "не активна"}</div>
                            <div className={style.EndDate}>Время окончания: {endDate}</div>
                        </div>
                    </div>
                    <div className={style.BottomContainer}>
                        <div className={style.BottomLeft}>
                            <div className={style.ProfileName}>Указать годовой налог</div>
                            <div className={style.TaxBox}>
                                {userAccount.taxes.map(el => <Tax year={el.year} tax={el.tax} />)}
                            </div>
                        </div>
                        <div className={style.BottomRight}>
                            <div className={style.Rate}>{userAccount.tariff}</div>
                            <div className={style.EndDate}>Ваш тариф</div>
                        </div>
                    </div>
                </div>
                <div className={style.CardsContainer}>
                    {
                        tariffs.map((el) => {
                            return (<Card
                                title={el.title}
                                price={el.price}
                                orderLimit={el.order_count.toString()}
                                shopLimit={el.shop_count.toString()}
                                description={el.description}
                                updatesPerDay={el.updates.toString()}
                                color={colors[el.id - 1]}
                            />)
                        })
                    }
                </div>
                <div className={style.TextBlock}>
                    KEstat сервис для продавцов на маркетплейсе Kazan Express – инструмент для легкого и удобного управления складским запасом,
                    анализа продаж и отслеживания истории заказов. KEstat обеспечивает продавцам возможность наблюдать за движением товаров,
                    контролировать складские остатки и отслеживать необходимые параметры и показатели. Он также позволяет продавцам в один
                    клик отслеживать историю продаж и закупок, что помогает получать детальную информацию и выявлять возможности для улучшения.
                </div>
            </div>
            <Footer />
        </div>
    )
}

function Tax(props: { year: number, tax: number }) {
    const [active, setActive] = useState(false);
    const [tax, setTax] = useState(props.tax.toString());
    return (
        <div>
            {active ?
                <div className={style.TaxActive} onDoubleClick={() => {setActive(false)}}>
                    {props.year} - 
                    <input maxLength={2} className={style.TaxInput} value={tax} onChange={(el: ChangeEvent<HTMLInputElement>) => setTax(el.currentTarget.value)}></input>
                </div> :
                <div className={tax !== "0" ? style.TaxPercent : style.Tax} onDoubleClick={() => setActive(true)}>
                    {props.year}
                    {tax !== "0" ? " - " + tax + "%" : ""}
                </div>}
        </div>
    )
}

export default Profile