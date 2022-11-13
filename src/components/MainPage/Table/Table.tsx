import React from 'react';
import { StatTableItem } from '../../../store/reducers/UserReducer';
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
    type: "turnover" | "profit" | "quantity"
}

function Table(props: TablePropsType) {
    let tableData = [<HeadingRow type={props.type}/>];
    let rows = props.data.map((row) => (
        <Row data={row} type={props.type}/>
    ));
    tableData = [...tableData, ...rows];
    return (
        <div className={style.Container}>
            <div className={style.Title}>{props.title}</div>
            <div className={style.TableBody}>

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
        <div className={style.HeadingRowContainer}>
            <div className={style.PlaceH}></div>
            <div className={style.IdH}>ID</div>
            <div className={style.RowSkuTitleH}>Наименование</div>
            <div className={style.RowTitleH}>Название товара</div>
            <div className={style.ValueH}>{columnTitle}</div>
        </div>
    )
}

export default Table 