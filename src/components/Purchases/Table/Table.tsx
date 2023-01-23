import React, { useState } from 'react';
import style from './Table.module.css'
import InfiniteScroll from 'react-infinite-scroller';

type TablePropsType = {
    activeTab: 1 | 2 | 3 | 4;
}

function Table(props: TablePropsType) {

    const [hasMoreItems, setHasMoreItems] = useState(true);

    function loadMore() {

    }

    let rowTestData: RowPropsType[] = [
        { number: 1, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 2, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 3, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 4, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 5, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 6, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 7, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 8, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 9, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 10, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 11, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 12, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 13, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 14, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 15, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 16, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 17, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 18, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 19, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 20, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 21, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 22, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 23, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 24, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 25, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 26, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 27, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 28, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 29, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 30, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 31, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 32, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 33, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 34, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 35, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 36, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 37, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 38, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
        { number: 39, date: "15.01.2023", title: "КЕ-1818", supplier: "ИП ПОЖАРНОВ", storage: "KE", amount: 10000, sum: 10000, factAmount: 100, totalAmount: 10000, status: "В обработке" },
    ]
    return (
        <div className={style.Table}>
            <div className={style.TableBody} style={{ borderRadius: props.activeTab === 1 ? "0px 8px 8px 8px" : "8px 8px 8px 8px" }}>
                <div className={style.TableHeader}>
                    <div className={style.ColumnHeader} id={style.Column1}>№</div>
                    <div className={style.ColumnHeader} id={style.Column2}>Дата</div>
                    <div className={style.ColumnHeader} id={style.Column3}>Название</div>
                    <div className={style.ColumnHeader} id={style.Column4}>Поставщик(и)</div>
                    <div className={style.ColumnHeader} id={style.Column5}>Склад</div>
                    <div className={style.ColumnHeader} id={style.Column6}>Кол-во</div>
                    <div className={style.ColumnHeader} id={style.Column7}>Сумма</div>
                    <div className={style.ColumnHeader} id={style.Column8}>Кол-во факт</div>
                    <div className={style.ColumnHeader} id={style.Column9}>Сумма итого</div>
                    <div className={style.ColumnHeader} id={style.Column10}>Статус</div>
                    <div className={style.ColumnHeader} id={style.Column11}>Действия</div>
                </div>
                <div className={style.RowContainer}>
                    <InfiniteScroll
                        threshold={0}
                        pageStart={0}
                        loadMore={loadMore}
                        hasMore={hasMoreItems}
                        loader={<div className={style.LoaderContainer} key={0}><div className={style.Loader}></div></div>}
                        useWindow={false}
                    >
                        {rowTestData.map(el => {
                            return <Row
                                number={el.number}
                                date={el.date}
                                title={el.title}
                                supplier={el.supplier}
                                storage={el.storage}
                                amount={el.amount}
                                sum={el.sum}
                                factAmount={el.factAmount}
                                totalAmount={el.totalAmount}
                                status={el.status}
                            />
                        })}
                    </InfiniteScroll>

                </div>
            </div>
        </div>
    )
}

export default Table;

type RowPropsType = {
    number: number;
    date: string;
    title: string;
    supplier: string;
    storage: string;
    amount: number;
    sum: number;
    factAmount: number;
    totalAmount: number;
    status: string;
}

function Row(props: RowPropsType) {
    return (
        <div className={style.Row}>
            <div id={style.Column1}>{props.number}</div>
            <div id={style.Column2}>{props.date}</div>
            <div id={style.Column3}>{props.title}</div>
            <div id={style.Column4}>{props.supplier}</div>
            <div id={style.Column5}>{props.storage}</div>
            <div id={style.Column6}>{props.amount}</div>
            <div id={style.Column7}>{props.sum}</div>
            <div id={style.Column8}>{props.factAmount}</div>
            <div id={style.Column9}>{props.totalAmount}</div>
            <div id={style.Column10}>{props.status}</div>
            <div id={style.Column11} className={style.ButtonBox}>
                <div>Открыть</div>
                <div>Удалить</div>
            </div>
        </div>
    )
}
