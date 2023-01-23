import React from 'react';
import style from './Card.module.css';

type CardPropsType = {
    title: string;
    price: number;
    orderLimit: string;
    shopLimit: string;
    description: string;
    updatesPerDay: string;
    color: string;
}

function Card(props: CardPropsType) {
    function getWord(num: number) {
        let lastDigit = num % 10;
      
        if (lastDigit === 1 && num !== 11) {
          return 'магазин';
        } else if ((lastDigit <= 4 && lastDigit >= 2 && num > 20) || (lastDigit <= 4 && lastDigit >= 2 && num < 11)) {
          return 'магазина';
        } else {
          return 'магазинов';
        }
      }

    return (
        <div className={style.Container}>
            <div style={{color: props.color}} className={style.Title}>{props.title}</div>
            <div style={{backgroundColor: props.color}} className={style.Line}></div>
            <div className={style.Price}>{props.price.toString() + " руб./мес"}</div>
            <div className={style.Text}>
                <div className={style.Line1}>Лимит {props.shopLimit} {getWord(Number(props.shopLimit))}</div>
                
                <div className={style.Line2}>
                    Ограничение по кол-ву заказов:<br/>
                    
                    <b>
                        {props.orderLimit}
                    </b>
                </div>
                
                <div className={style.Line3}>
                
                    
                    <b>
                        {props.description}
                    </b>
                </div>
                
                <div className={style.BottomText}>
                    Обновлений в день: {props.updatesPerDay}
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default Card