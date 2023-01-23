import React, { useState } from 'react';
import { StatTableItem } from '../../../store/reducers/UserReducer';
import { ColorType } from '../Statistics/Statistics';
import style from './Table.module.css';

type TablePropsType = {
    data: StatTableItem[],
    title: string,
    type: "turnover" | "profit" | "quantity"
}

type RowPropsType = {
    data: StatTableItem
    type: "turnover" | "profit" | "quantity"
}

type HeadingPropsType = {
    color: ColorType
    type: "turnover" | "profit" | "quantity"
}

function Tables(props: TablePropsType) {
    const [color, setColor] = useState<ColorType>("grey");
    
    function onClickHandler() {
        if(color === "grey") {
            setColor("red")
        } else if (color === "red") {
            setColor("blue")
        } else {
            setColor("grey")
        }
    }

    let tableData = [<HeadingRow type={props.type} color={color}/>];
    let rows = props.data.map((row) => (
        <Row data={row} type={props.type}/>
    ));
    tableData = [...tableData, ...rows];
    return (
        <div className={style.Container}>
            <div className={style.Title}>{props.title}</div>
            <div className={style.TableBody} id={color === "red" ? style.Red : color === "blue" ? style.Blue : ""} onClick={onClickHandler}>

                {
                    tableData
                }

            </div>
        </div>
    )
}

function Row(props: RowPropsType) {
    let ending = "р";
    if(props.type === "quantity") {
        ending = " шт"
    }

    return (
        <div className={style.RowContainer}>
            <div className={style.Place}>{props.data.place}</div>
            <div className={style.Id}>{props.data.sku_id}</div>
            <div className={style.RowSkuTitle}>{props.data.sku_title}</div>
            <div className={style.RowTitle}>{props.data.title}</div>
            <div className={style.Value}>{props.data.value.toFixed(0) + ending}</div>
        </div>
    )
}
function HeadingRow(props: HeadingPropsType) {
    let columnTitle = "Оборот";
    if(props.type === "profit") {
        columnTitle = "Прибыль"
    } else if (props.type === "quantity") {
        columnTitle = "Количество"
    }
    return (
        <div className={style.HeadingRowContainer} id={props.color === "red" ? style.Red : props.color === "blue" ? style.Blue : ""}>
            <div className={style.PlaceH}></div>
            <div className={style.IdH}>ID</div>
            <div className={style.RowSkuTitleH}>Наименование</div>
            <div className={style.RowTitleH}>Название товара</div>
            <div className={style.ValueH}>{columnTitle}</div>
        </div>
    )
}

export default Tables 