import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import style from './Purchases.module.css';
import { ReactComponent as Hopper } from '../../img/HopperIcon.svg';
import { ReactComponent as ArrowDown } from '../../img/ArrowDown.svg';
import Table from './Table/Table';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import moment from 'moment';
import { addInvoiceStockAC, clearAddedInvoicesAC, deleteInvoiceStocksAC, setDateFilterAC } from '../../store/reducers/PurchasesReducer';
import { useDispatch } from 'react-redux';
import { setErrorAC } from '../../store/reducers/AppReducer';

function Purchases() {

    let token = localStorage.getItem('access_token');
    let navigate = useNavigate();
    let invoiceStocks = useAppSelector(state => state.purchases.invoicesStocks);
    let activeInvoice = useAppSelector(state => state.purchases.invoices.data.find(el => el.invoice_id === invoiceStocks.invoice_id));
    let addedStocks = useAppSelector(state => state.purchases.addedInvoiceStocks);
    let dispatch = useAppDispatch();
    let actionDispatch = useDispatch();
    console.log(activeInvoice);
    const [dateFilter, setDateFilter] = useState({isActive: false, date: ""});
    const [titleFilter, setTitleFilter] = useState({isActive: false, title: ""});

    useEffect(() => {
        let token = localStorage.access_token;
        if (token !== undefined && token !== "" && token !== null) {

        } else {
            navigate("/login");
        }
    }, [dispatch, navigate])

    const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
    const [isAddDisabled, setIsAddDisabled] = useState(false)
    let date = moment(activeInvoice?.date_created).format('DD.MM.YYYY').toString().trim();

    function addRow() {
        if (activeInvoice && addedStocks.length === 0) {
            actionDispatch(addInvoiceStockAC(activeInvoice.invoice_id));
            setIsAddDisabled(true);
            setActiveTab(6);
        }
    }

    function removeAllAddedRows() {
        actionDispatch(deleteInvoiceStocksAC());
        setIsAddDisabled(false)
    }




    function removeAddedTabs() {
        actionDispatch(clearAddedInvoicesAC());
    }



    function onDateChangeHandler(e: ChangeEvent<HTMLInputElement>): void {

        if (e.currentTarget.value === "") {
            setDateFilter({isActive: false, date: ""})
        } else {
            let date = moment(e.currentTarget.value).format('DD.MM.YYYY');
            actionDispatch(setDateFilterAC(date));
            setDateFilter({isActive: true, date: date});
        }
    }

    function onTitleChangeHandler(e: ChangeEvent<HTMLInputElement>): void {
        if (e.currentTarget.value === "") {
            setTitleFilter({isActive: false, title: ""});
        } else {
            setTitleFilter({isActive: true, title: e.currentTarget.value.trim()})
        }
    }
    return (
        <div className={style.Container}>
            <Header />
            <div className={style.BoxContainer}>
                {activeTab === 5 || activeTab === 6 ?
                    <div className={style.Navigation}>
                        <div className={style.LeftContainer}>
                            <div className={style.TabExpandedLeft} onClick={() => { }}>
                                <div className={style.TabTitle}>{activeInvoice?.title}</div>
                                <div className={style.TabDate}>{date}</div>
                                <div className={style.Storage}>{activeInvoice?.storage}</div>
                            </div>
                            <div className={style.TabExpandedRight} onClick={() => { }}>
                                <div>Редактирование</div>
                                <button disabled={isAddDisabled} className={isAddDisabled ? style.AddRowButtonDisabled : style.AddRowButton} onClick={addRow}>Добавить строку</button>
                            </div>
                            <div className={style.ExitToEnvoices} onClick={(e: any) => {
                                removeAllAddedRows();
                                e.stopPropagation();
                                setActiveTab(1)
                                removeAddedTabs();
                            }}>
                                Назад к накладным
                            </div>
                        </div>
                        <div className={style.RightContainer}>
                            <div className={style.RightItem}>
                                <Hopper/>
                                <input className={style.FilterInput} type={"text"} placeholder={"_"} onChange={onTitleChangeHandler}></input>
                            </div>
                            <div className={style.RightItem}>
                                Поставщик
                                <CustomSelect />

                            </div>
                            <div className={style.RightItem}>
                                Дата
                                <input className={style.DateInput} onChange={onDateChangeHandler} type={"date"}></input>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={style.Navigation}>
                        <div className={style.LeftContainer}>
                            <div className={activeTab === 1 ? style.TabActive : style.Tab} onClick={() => { setActiveTab(1); removeAddedTabs(); }}>Все накладные</div>
                            <div className={activeTab === 2 ? style.TabActive : style.Tab} onClick={() => { setActiveTab(2); removeAddedTabs(); }}>Свои накладные</div>
                            <div className={activeTab === 3 ? style.TabActive : style.Tab} onClick={() => { setActiveTab(3); removeAddedTabs(); }}>Накладные KE</div>
                            <div className={activeTab === 4 ? style.TabActive : style.Tab} onClick={() => { setActiveTab(4); removeAddedTabs(); }}>Добавление</div>
                        </div>
                        <div className={style.RightContainer}>
                            <div className={style.RightItem}>
                                <Hopper />
                                <input className={titleFilter.isActive ? style.FilterInputActive : style.FilterInput} type={"text"} placeholder={"_"}  onChange={onTitleChangeHandler}></input>
                            </div>
                            <div className={style.RightItem}>
                                Поставщик
                                <CustomSelect />

                            </div>
                            <div className={style.RightItem}>
                                Дата
                                <input className={style.DateInput} onChange={onDateChangeHandler} type={"date"}></input>
                            </div>
                        </div>
                    </div>
                }
                <Table
                    activeInvoice={activeInvoice}
                    activeTab={activeTab}
                    setActiveTab={(num: 1 | 2 | 3 | 4 | 5 | 6) => setActiveTab(num)}
                    token={token} 
                    disableAdd={(value: boolean) => setIsAddDisabled(value)}
                    dateFilter={dateFilter}
                    titleFilter={titleFilter}
                />
            </div>
            <Footer />
        </div>
    )
}

export default Purchases;

function CustomSelect() {
    return (
        <div className={style.SelectBox}>
            <div className={style.SelectText}> OOO dedewdew</div>
            <div className={style.ArrowButton}>
                <ArrowDown />
            </div>
        </div>
    );
}

