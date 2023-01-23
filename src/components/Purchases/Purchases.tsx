import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import style from './Purchases.module.css';
import { ReactComponent as Hopper } from '../../img/HopperIcon.svg';
import { ReactComponent as ArrowDown } from '../../img/ArrowDown.svg';
import Table from './Table/Table';

function Purchases() {

    const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className={style.Container}>
        <Header/>
        <div className={style.BoxContainer}>
            <div className={style.Navigation}>
                <div className={style.LeftContainer}>
                    <div className={activeTab === 1 ? style.TabActive : style.Tab} onClick={() => setActiveTab(1)}>Все накладные</div>
                    <div className={activeTab === 2 ? style.TabActive : style.Tab} onClick={() => setActiveTab(2)}>Свои накладные</div>
                    <div className={activeTab === 3 ? style.TabActive : style.Tab} onClick={() => setActiveTab(3)}>Накладные KE</div>
                    <div className={activeTab === 4 ? style.TabActive : style.Tab} onClick={() => setActiveTab(4)}>Добавление</div>
                </div>
                <div className={style.RightContainer}>
                    <div className={style.RightItem}>
                        <Hopper/>
                        <input className={style.FilterInput} type={"text"} placeholder={"_"}></input>
                    </div>
                    <div className={style.RightItem}>
                        Поставщик
                        <CustomSelect/>
                        
                    </div>
                    <div className={style.RightItem}>
                        Дата
                        <input></input>
                    </div>
                </div>
            </div>
            <Table activeTab={activeTab}/>
        </div>
        <Footer/>
    </div>
  )
}

export default Purchases;

function CustomSelect() {
    return(
        <div className={style.SelectBox}>
            <div className={style.SelectText}> OOO dedewdew</div>
            <div className={style.ArrowButton}>
                <ArrowDown/>
            </div>
        </div>
    );
}