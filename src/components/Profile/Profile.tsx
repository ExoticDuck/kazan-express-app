import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Card from './Card/Card';
import style from "./Profile.module.css";

function Profile() {
    return (
        <div className={style.Container}>
            <Header />
            <div className={style.BoxContainer}>
                <div className={style.ProfileInfo}>
                    <div className={style.TopContainer}>
                        <div className={style.TopLeft}>
                            <div className={style.ProfileName}>Александр Чепкасов</div>
                            <div className={style.RegisterDate}>Дата создания профиля: 13.01.2023</div>
                        </div>
                        <div className={style.TopRight}>
                            <div className={style.Subscription}>Подписка активна</div>
                            <div className={style.EndDate}>Время окончания: 13:09:2023</div>
                        </div>
                    </div>
                    <div className={style.BottomContainer}>
                        <div className={style.BottomLeft}>
                            <div className={style.ProfileName}>Указать годовой налог</div>
                            <div className={style.TaxBox}></div>
                        </div>
                        <div className={style.BottomRight}>
                            <div className={style.Rate}>Максимальный</div>
                            <div className={style.EndDate}>Ваш тариф</div>
                        </div>
                    </div>
                </div>
                <div className={style.CardsContainer}>
                    <Card
                        title='Базовый'
                        price={999}
                        orderLimit={"20 в день"}
                        shopLimit={"5"}
                        optionLimit={"Недоступны некоторые функции раздела закупок и склада"}
                        updatesPerDay={"2 раза в день"}
                        color={"#1CC600"}
                    />
                    <Card
                        title='Стандартный'
                        price={3999}
                        orderLimit={"40 в день"}
                        shopLimit={"10"}
                        optionLimit={"Недоступны некоторые функции раздела закупок и склада"}
                        updatesPerDay={"6 раз в день"}
                        color={"#0073C6"}
                    />
                    <Card
                        title='Максимальный'
                        price={7999}
                        orderLimit={"100 в день"}
                        shopLimit={"15"}
                        optionLimit={"Без ограничений"}
                        updatesPerDay={"раз в два часа"}
                        color={"#ED00C7"}
                    />
                    <Card
                        title='Ультра'
                        price={12999}
                        orderLimit={"Без ограничений"}
                        shopLimit={"∞"}
                        optionLimit={"Без ограничений"}
                        updatesPerDay={"раз в час"}
                        color={"#ED7200"}
                    />
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

export default Profile