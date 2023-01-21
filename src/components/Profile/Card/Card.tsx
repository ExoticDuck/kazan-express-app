import React from 'react';
import style from './Card.module.css';

type CardPropsType = {
    title: "Базовый" | "Стандартный" | "Максимальный" | "Ультра";
    price: number;
    orderLimit: string;
    shopLimit: string;
    optionLimit: string;
    updatesPerDay: string;
    color: string;
}

function Card(props: CardPropsType) {
    return (
        <div className={style.Container}>
            <div className={style.Title}>{props.title}</div>
            <div style={{backgroundColor: props.color}} className={style.Line}></div>
            <div style={{color: props.color}} className={style.Price}>{props.price.toString() + " руб./мес"}</div>
            <div className={style.Text}>
                Лимит {props.shopLimit} магазинов
                <br />
                <br />
                Ограничение по кол-ву заказов:
                <br />
                <b>
                    {props.orderLimit}</b>
                <br />
                <br />
                Ограничение по опциям:
                <br />
                <b>
                    {props.optionLimit}
                </b>
                <br />
                <br />
                <div className={style.BottomText}>
                    Обновления {props.updatesPerDay}
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default Card