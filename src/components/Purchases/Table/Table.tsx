import React, { useCallback, useEffect, useState } from 'react';
import style from './Table.module.css';

import { GetInvoicesTC, GetInvoiceStocksTC } from '../../../store/reducers/PurchasesReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 } from 'uuid';
import moment from 'moment';

type TablePropsType = {
    token: string | null;
    activeTab: 1 | 2 | 3 | 4 | 5;
    setActiveTab: (num: 1 | 2 | 3 | 4 | 5) => void;
    activeInvoice?:  {
        invoice_id: number,
        date_created: string,
        title: string,
        customer: string,
        storage: string,
        quantity: number,
        price: number,
        quantity_accepted: number,
        total_price: number,
        status: string
    }
}

function Table(props: TablePropsType) {


    let dispatch = useAppDispatch();
    let rowData = useAppSelector(state => state.purchases.invoices.data);
    let rowDataStocks = useAppSelector(state => state.purchases.invoicesStocks.data);
    let hasMoreItems = useAppSelector(state => state.purchases.invoices.hasMoreItems);
    let invoiceStocks = useAppSelector(state => state.purchases.invoicesStocks)
    console.log(invoiceStocks);


    let page = useAppSelector(state => state.purchases.invoices.page);

    useEffect(() => {
        loadMore();
    }, [])

    const loadMore = useCallback(() => {
        if (props.token !== undefined && props.token !== "" && props.token !== null) {
            dispatch(GetInvoicesTC(props.token, page));
        }
    }, [])

    const handleScroll = (e: any) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && hasMoreItems) {
            loadMore();
        }
    }

    function openStocks(invoiceId: number) {
        if (props.token !== undefined && props.token !== "" && props.token !== null) {
            dispatch(GetInvoiceStocksTC(props.token, invoiceId))
        }
    }
    if (props.activeTab !== 5) {
        return (
            <div className={style.Table} onScroll={handleScroll} >

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
                    {rowData.map((el, i) => {
                        let pageNum = i + 1;
                        let date = moment(el.date_created).format('DD.MM.YYYY').toString().trim();
                        return <Row
                            key={v4()}
                            id={el.invoice_id}
                            number={pageNum}
                            date={date}
                            title={el.title}
                            supplier={el.customer}
                            storage={el.storage}
                            amount={el.quantity}
                            sum={el.price}
                            factAmount={el.quantity_accepted}
                            totalAmount={el.total_price}
                            status={el.status}
                            callbackFn={() => {
                                openStocks(el.invoice_id);
                                props.setActiveTab(5)
                            }}
                            activeTab={props.activeTab}
                        />
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div className={style.Table} onScroll={handleScroll} >

                <div className={style.TableBody} style={{ borderRadius: "0px 8px 8px 8px"}}>
                    <div className={style.TableHeader}>
                        <div className={style.ColumnHeader} id={style.StocksColumn1}>№</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn2}>SKU</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn3}>Название</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn4}>Поставщик</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn5}>Кол-во</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn6}>Сумма</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn7}>Кол-во факт</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn8}>Сумма итого</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn9}>Действия</div>
                    </div>
                    {rowDataStocks.map((el, i) => {
                        let pageNum = i + 1;
                        return <Row
                            key={v4()}
                            id={el.stock_id}
                            number={pageNum}
                            title={el.title}
                            supplier={props.activeInvoice?.customer}
                            amount={el.quantity}
                            sum={el.price}
                            factAmount={el.quantity_accepted}
                            totalAmount={el.total_price}
                            callbackFn={() => {}}
                            activeTab={props.activeTab}
                        />
                    })}
                </div>
            </div>
        )
    }

}

export default Table;

type RowPropsType = {
    id: number;
    sku?: string;
    number: number;
    date?: string;
    title: string;
    supplier: string | undefined;
    storage?: string;
    amount: number;
    sum: number;
    factAmount: number;
    totalAmount: number;
    status?: string;
    callbackFn: () => void
    activeTab: 1 | 2 | 3 | 4 | 5;
}

function Row(props: RowPropsType) {
    if(props.activeTab === 5) {
        return (
            <div className={style.Row}>
                <div id={style.StocksColumn1}></div>
                <div id={style.StocksColumn2}></div>
                <div id={style.StocksColumn3}></div>
                <div id={style.StocksColumn4}></div>
                <div id={style.StocksColumn5}></div>
                <div id={style.StocksColumn6}></div>
                <div id={style.StocksColumn7}></div>
                <div id={style.StocksColumn8}></div>
                <div id={style.StocksColumn9}></div>
            </div>
        )
    } else {
        return (
            <div className={style.Row}>
                <div id={style.Column1}>{props.number}</div>
                <div id={style.Column2}>{props.date}</div>
                <div id={style.Column3}>{props.title}</div>
                <div id={style.Column4}>{props.supplier}</div>
                <div id={style.Column5}>{props.storage}</div>
                <div id={style.Column6}>{props.amount}</div>
                <div id={style.Column7}>{props.sum.toFixed(2)}</div>
                <div id={style.Column8}>{props.factAmount}</div>
                <div id={style.Column9}>{props.totalAmount.toFixed(2)}</div>
                <div id={style.Column10}>{props.status}</div>
                <div id={style.Column11} className={style.ButtonBox}>
                    <div onClick={props.callbackFn} className={style.OpenButton}>Открыть</div>
                    <div>Удалить</div>
                </div>
            </div>
        )
    }
    
}
