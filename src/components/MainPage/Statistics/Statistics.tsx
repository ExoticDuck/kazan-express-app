import React from 'react';
import { StatType } from '../../../store/reducers/UserReducer';
import style from './Statistics.module.css';

type StatisticsPropsType = {
    title: string,
    data: StatType
}

type InvoicesPropsType = {
    title: string,
    data: {
        today: {
            invoices_amount: number,
            items_amount: number
        },
        yesterday: {
            invoices_amount: number,
            items_amount: number
        },
        items_left: number
    }
}

export default function Statistics(props: StatisticsPropsType) {
    return (
        <div className={style.Container}>
            <div className={style.Title}>{props.title}</div>
            <div className={style.Item}>Общий оборот: {props.data.total_profit.toFixed(0)} руб.</div>
            <div className={style.Item}>Количество единиц: {props.data.items_amount} шт.</div>
            <div className={style.Item}>Средний чек: {props.data.average_order.toFixed(0)} руб.</div>
            <div className={style.Item}>Маржа: {props.data.marginality.toFixed(0)} %</div>
            <div className={style.ItemLast}>Чистая прибыль: {props.data.clear_profit.toFixed(0)} руб.</div>
        </div>
    )
}

export function InvoicesStatistics(props: InvoicesPropsType) {
    return (
        <div className={style.Container}>
            <div className={style.Title}>{props.title}</div>
            <div className={style.Item}>Поймано слотов сегодня: {props.data.today.invoices_amount}</div>
            <div className={style.Item}>Кол-во едениц за сегодня: {props.data.today.items_amount}</div>
            <div className={style.Item}>Поймано слотов вчера: {props.data.yesterday.invoices_amount}</div>
            <div className={style.Item}>Кол-во едениц за вчера: {props.data.yesterday.items_amount}</div>
            <div className={style.ItemLast}>Кол-во едениц без слотов: {props.data.items_left}</div>
        </div>
    )
}
