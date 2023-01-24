import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import style from './Purchases.module.css';
import { ReactComponent as Hopper } from '../../img/HopperIcon.svg';
import { ReactComponent as ArrowDown } from '../../img/ArrowDown.svg';
import Table from './Table/Table';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import moment from 'moment';

function Purchases() {

    let token = localStorage.getItem('access_token');
    let navigate = useNavigate();
    let invoiceStocks = useAppSelector(state => state.purchases.invoicesStocks);
    let activeInvoice = useAppSelector(state => state.purchases.invoices.data.find(el => el.invoice_id === invoiceStocks.invoice_id));
    console.log(activeInvoice);


    useEffect(() => {
        let token = localStorage.access_token;
        if (token !== undefined && token !== "" && token !== null) {
            // debugger
            // dispatch(UserInfoTC(token));
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate])

    const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4 | 5>(1);
    let date = moment(activeInvoice?.date_created).format('DD.MM.YYYY').toString().trim();

    console.log(activeTab);


    return (
        <div className={style.Container}>
            <Header />
            <div className={style.BoxContainer}>
                {activeTab === 5 ?
                    <div className={style.Navigation}>
                        <div className={style.LeftContainer}>
                            <div className={style.TabExpandedLeft} onClick={() => { }}>
                                <div className={style.TabTitle}>{activeInvoice?.title}</div>
                                <div className={style.TabDate}>{date}</div>
                                <div className={style.Storage}>{activeInvoice?.storage}</div>
                            </div>
                            <div className={style.TabExpandedRight} onClick={() => { }}>
                                <div>Редактирование</div>
                                <div>Добавить строку</div>
                            </div>
                            <div className={style.ExitToEnvoices} onClick={(e: any) => {
                                e.stopPropagation();
                                setActiveTab(1)
                            }}>
                                Назад к накладным
                            </div>
                        </div>
                        <div className={style.RightContainer}>
                            <div className={style.RightItem}>
                                <Hopper />
                                <input className={style.FilterInput} type={"text"} placeholder={"_"}></input>
                            </div>
                            <div className={style.RightItem}>
                                Поставщик
                                <CustomSelect />

                            </div>
                            <div className={style.RightItem}>
                                Дата
                                <input className={style.DateInput} type={date}></input>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={style.Navigation}>
                        <div className={style.LeftContainer}>
                            <div className={activeTab === 1 ? style.TabActive : style.Tab} onClick={() => setActiveTab(1)}>Все накладные</div>
                            <div className={activeTab === 2 ? style.TabActive : style.Tab} onClick={() => setActiveTab(2)}>Свои накладные</div>
                            <div className={activeTab === 3 ? style.TabActive : style.Tab} onClick={() => setActiveTab(3)}>Накладные KE</div>
                            <div className={activeTab === 4 ? style.TabActive : style.Tab} onClick={() => setActiveTab(4)}>Добавление</div>
                        </div>
                        <div className={style.RightContainer}>
                            <div className={style.RightItem}>
                                <Hopper />
                                <input className={style.FilterInput} type={"text"} placeholder={"_"}></input>
                            </div>
                            <div className={style.RightItem}>
                                Поставщик
                                <CustomSelect />

                            </div>
                            <div className={style.RightItem}>
                                Дата
                                <input className={style.DateInput} type={date}></input>
                            </div>
                        </div>
                    </div>
                }
                <Table activeInvoice={activeInvoice} activeTab={activeTab} setActiveTab={(num: 1 | 2 | 3 | 4 | 5) => setActiveTab(num)} token={token} />
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

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
