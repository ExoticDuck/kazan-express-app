import React from 'react';
import { StatType } from '../../../store/reducers/UserReducer';
import style from './Statistics.module.css';

type StatisticsPropsType = {
    title: string,
    data: StatType
}

function Statistics(props: StatisticsPropsType) {
    return (
    <div className={style.Container}>
        <div className={style.Title}>{props.title}</div>
        <div className={style.Item}><i className="fa-solid fa-chart-simple"></i> Общий оборот: {props.data.total_profit.toFixed(0)} руб.</div>
        <div className={style.Item}><i className="fa-solid fa-boxes-stacked"></i> Количество единиц: {props.data.items_amount} шт.</div>
        <div className={style.Item}><i className="fa-solid fa-calculator"></i> Средний чек: {props.data.average_order.toFixed(0)} руб.</div>
        <div className={style.Item}><i className="fa-solid fa-coins"></i> Маржа: {props.data.marginality.toFixed(0)} %</div>
        <div className={style.ItemLast}><i className="fa-solid fa-dollar-sign"></i> Чистая прибыль: {props.data.clear_profit.toFixed(0)} руб.</div>
    </div>
  )
}

export default Statistics