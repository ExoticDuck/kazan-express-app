import React, { ChangeEvent, MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Card from './Card/Card';
import style from "./Profile.module.css";
import { useAppDispatch, useAppSelector } from './../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { UpdateTaxTC, UserInfoTC } from '../../store/reducers/UserReducer';
import moment from 'moment';
import { UpdateTaxDataType } from '../../api/api';



function Profile() {
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let userInfo = useAppSelector(state => state.user.userInfo);
    let userAccount = useAppSelector(state => state.user.userAccount);
    let tariffs = useAppSelector(state => state.user.tariffs);
    let taxes = useAppSelector(state => state.user.userAccount.taxes).map(el => ({...el}));
    console.log(taxes);
    
    let token = localStorage.getItem('access_token');

    const [activeTax, setActiveTax] = useState<number>(0);

    let regDate = moment(userAccount.reg_date).format('DD.MM.YYYY');
    let endDate = moment(userAccount.date_end).format('DD.MM.YYYY');

    let colors = ["#1CC600", "#0073C6", "#ED00C7", "#ED7200", "#FF464C"];

    useEffect(() => {
        let token = localStorage.access_token;
        if (token !== undefined && token !== "" && token !== null) {
            debugger
            dispatch(UserInfoTC(token));
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate])

    function onBoxClick() {
        setActiveTax(0);
        
    }

    function updateTax(data: UpdateTaxDataType) {
        if (token !== undefined && token !== "" && token !== null) {
            debugger
            dispatch(UpdateTaxTC(token, data))
        }
    }

    return (
        <div className={style.Container}>
            <Header />
            <div className={style.BoxContainer} onClick={onBoxClick}>
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
                                {taxes.map(el => <Tax 
                                key={el.year} 
                                year={el.year} 
                                tax={el.tax} 
                                setActiveTax={(num: number) => {setActiveTax(num)}}
                                activeTax={activeTax}
                                updateTax={updateTax}
                                />)}
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
                                key={el.id}
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

type TaxPropsType = {
    year: number, 
    tax: number,
    setActiveTax: (num: number) => void,
    activeTax: number,
    updateTax: (data: UpdateTaxDataType) => void
}

function Tax(props: TaxPropsType) {
    const [inputValue, setInputValue] = useState("");
    
    function onClickHandlerExpanded(e: any) {
        props.setActiveTax(0);
        if(inputValue !== "") {
            debugger
            let data = {year: props.year, tax: Number(inputValue)}
            props.updateTax(data);
        }
    }

    function onClickHandler(e: any) {
        e.stopPropagation();
        props.setActiveTax(props.year);
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        if(+e.currentTarget.value>100 || +e.currentTarget.value === 0) {
            setInputValue("")
        } else if (!isNaN(Number(e.currentTarget.value))) {
            setInputValue(e.currentTarget.value)
        }
    }
    return (
        <div>
            {props.activeTax === props.year ?
                <div className={style.TaxActive} onClick={onClickHandlerExpanded}>
                    {props.year} -  
                    <input autoFocus={true} maxLength={3} className={style.TaxInput} value={inputValue} onChange={onChangeHandler}></input>
                </div> :
                <div className={props.tax.toString() !== "0" ? style.TaxPercent : style.Tax} onClick={onClickHandler}>
                    {props.year}
                    {props.tax.toString() !== "0" ? " - " + props.tax.toString() + "%" : ""}
                </div>}
        </div>
    )
}

export default Profile