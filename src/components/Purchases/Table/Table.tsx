import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import style from './Table.module.css';
import { AddedInvoice, AddStockTC, deleteInvoiceStocksAC, DeleteInvoiceTC, DeleteStockTC, GetInvoicesTC, GetInvoiceStocksTC, updateAddedInvoiceStockAC, updateExistentInvoiceStockAC, UpdateStockTC } from '../../../store/reducers/PurchasesReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { v4 } from 'uuid';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setErrorAC } from '../../../store/reducers/AppReducer';
import FileUploader from '../FileUploader/FileUploader';

type TablePropsType = {
    token: string | null;
    activeTab: 1 | 2 | 3 | 4 | 5 | 6;
    setActiveTab: (num: 1 | 2 | 3 | 4 | 5 | 6) => void;
    disableAdd: (value: boolean) => void;
    activeInvoice?: {
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
    let actionDispatch = useDispatch();
    let rowData = useAppSelector(state => state.purchases.invoices.data);
    let rowDataStocks = useAppSelector(state => state.purchases.invoicesStocks.data);
    let hasMoreItems = useAppSelector(state => state.purchases.invoices.hasMoreItems);
    let addedStocks = useAppSelector(state => state.purchases.addedInvoiceStocks);
    let addedInvoices = useAppSelector(state => state.purchases.addedInvoices.data);
    let invoiceId = useAppSelector(state => state.purchases.invoicesStocks.invoice_id);


    let page = useAppSelector(state => state.purchases.invoices.page);

    useEffect(() => {
        loadMore();
    }, [])

    const loadMore = useCallback(() => {
        if (props.token !== undefined && props.token !== "" && props.token !== null) {
            dispatch(GetInvoicesTC(props.token));
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

    function deleteRow() {
        actionDispatch(deleteInvoiceStocksAC())
    }

    function deleteExistentRow(stockId: number, invoiceId: number) {
        if (props.token !== undefined && props.token !== "" && props.token !== null) {
        dispatch(DeleteStockTC(props.token, stockId, invoiceId));
        }
    }
    function deleteInvoice(invoiceId: number) {
        if (props.token !== undefined && props.token !== "" && props.token !== null) {
            dispatch(DeleteInvoiceTC(props.token, invoiceId));
            }
    }
    function addRow(data: AddedInvoice) {
        if (props.token !== undefined && props.token !== "" && props.token !== null) {
            dispatch(AddStockTC(props.token, data));
        }
    }
    function updateRow(data: AddedInvoice, invoiceId: number) {
        let resultData = {
            stock_id: data.invoice_id,
            sku: data.sku,
            quantity: data.quantity,
            quantity_accepted: data.quantity_accepted,
            purchase_price: data.purchase_price
        }
        if (props.token !== undefined && props.token !== "" && props.token !== null) {
            dispatch(UpdateStockTC(props.token, resultData, invoiceId));
        }
    }


    if (props.activeTab !== 5 && props.activeTab !== 6 && props.activeTab !== 4) {
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
                                props.setActiveTab(6)
                            }}
                            deleteFunction={() => deleteInvoice(el.invoice_id)}
                            activeTab={props.activeTab}
                        />
                    })}
                </div>
            </div>
        )
    } else if (props.activeTab === 6) {
        return (
            <div className={style.Table}>
                <div className={style.TableBody} style={{ borderRadius: "0px 8px 8px 8px" }}>
                    <div className={style.TableHeader}>
                        <div className={style.ColumnHeader} id={style.StocksColumn1}>№</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn2}>SKU</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn3}>Название</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn4}>Себестоимость</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn5}>Кол-во</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn6}>Сумма</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn7}>Кол-во факт</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn8}>Сумма итого</div>
                        <div className={style.ColumnHeader} id={style.StocksColumn9}>Действия</div>
                    </div>
                    {addedStocks.map((el, i) => {
                        let pageNum = i + 1;
                        console.log(el);
                        debugger
                        return <EditableRow
                            type='added'
                            key={i}
                            id={i}
                            invoice_id={el.invoice_id}
                            number={pageNum}
                            title={"default"}
                            sku={el.sku}
                            purcasePrice={el.purchase_price}
                            amount={el.quantity}
                            factAmount={el.quantity_accepted}
                            deleteFunction={() => {
                                deleteRow();
                                props.disableAdd(false);
                            }}
                            addFunction={(data: AddedInvoice) => {
                                addRow(data);
                                props.disableAdd(false);
                            }}
                            updateFunction={(data: AddedInvoice) => { }}
                            activeTab={props.activeTab}
                        />
                    })}
                    {rowDataStocks.map((el, i) => {
                        let pageNum = i + 1 + addedStocks.length;
                        return <EditableRow
                            type='existent'
                            key={v4()}
                            id={el.stock_id}
                            number={pageNum}
                            title={el.title}
                            sku={el.sku}
                            invoice_id={invoiceId}
                            purcasePrice={el.purchase_price}
                            amount={el.quantity}
                            sum={el.price}
                            factAmount={el.quantity_accepted}
                            totalAmount={el.total_price}
                            deleteFunction={() => {
                                deleteExistentRow(el.stock_id, invoiceId);
                                props.disableAdd(false);
                            }}
                            addFunction={(data: AddedInvoice) => {
                                addRow(data);
                                props.disableAdd(false);
                            }}
                            updateFunction={(data: AddedInvoice) => {
                                updateRow(data, invoiceId)
                                props.disableAdd(false);
                            }}
                            activeTab={props.activeTab}
                        />
                    })}
                </div>
            </div>
        )
    } else if (props.activeTab === 4) {
        return (
            <div className={style.TableContainer}>
                <FileUploader token={props.token}/>
                
                <div className={style.TableAdd}>
                    <div className={style.TableBodyAdd} style={{ borderRadius: "0px 8px 8px 8px" }}>
                        <div className={style.TableAddHeader}>
                            <div className={style.ColumnHeader} id={style.StocksAddColumn1}>№</div>
                            <div className={style.ColumnHeader} id={style.StocksAddColumn2}>Дата</div>
                            <div className={style.ColumnHeader} id={style.StocksAddColumn3}>Название</div>
                            <div className={style.ColumnHeader} id={style.StocksAddColumn4}>Поставщик</div>
                            <div className={style.ColumnHeader} id={style.StocksAddColumn5}>Кол-во</div>
                            <div className={style.ColumnHeader} id={style.StocksAddColumn6}>Сумма</div>
                            <div className={style.ColumnHeader} id={style.StocksAddColumn7}>Кол-во факт</div>
                            <div className={style.ColumnHeader} id={style.StocksAddColumn8}>Сумма итого</div>
                        </div>
                        {addedInvoices.map((el, i) => {
                            let date = moment(el.date_created).format('DD.MM.YYYY').toString().trim();
                            let pageNum = i + 1;
                            return <Row
                                key={v4()}
                                id={el.invoice_id}
                                number={pageNum}
                                title={el.title}
                                date={date}
                                sku={""}
                                supplier={el.customer}
                                amount={el.quantity}
                                sum={el.price}
                                factAmount={el.quantity_accepted}
                                totalAmount={el.total_price}
                                callbackFn={() => { }}
                                deleteFunction={() => { }}
                                activeTab={props.activeTab}
                            />
                        })}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={style.Table}>
                <div className={style.TableBody} style={{ borderRadius: "0px 8px 8px 8px" }}>
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
                            sku={el.sku}
                            supplier={props.activeInvoice?.customer}
                            amount={el.quantity}
                            sum={el.price}
                            factAmount={el.quantity_accepted}
                            totalAmount={el.total_price}
                            callbackFn={() => { }}
                            deleteFunction={() => {}}
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
    callbackFn: () => void;
    deleteFunction: () => void;
    activeTab: 1 | 2 | 3 | 4 | 5 | 6;
}

function Row(props: RowPropsType) {
    if (props.activeTab === 5 || props.activeTab === 6) {
        return (
            <div className={style.Row}>
                <div id={style.StocksColumn1}>{props.number}</div>
                <div id={style.StocksColumn2}>{props.sku}</div>
                <div id={style.StocksColumnRow3}>{props.title}</div>
                <div id={style.StocksColumn4}>{props.supplier}</div>
                <div id={style.StocksColumn5}>{props.amount}</div>
                <div id={style.StocksColumn6}>{props.sum.toFixed(2)}</div>
                <div id={style.StocksColumn7}>{props.factAmount}</div>
                <div id={style.StocksColumn8}>{props.totalAmount.toFixed(2)}</div>
                <div id={style.StocksColumn9}>
                    <div>Удалить</div>
                </div>
            </div>
        )
    } else if (props.activeTab === 4){
        return (
            <div className={style.Row}>
                <div id={style.StocksAddColumn1}>{props.number}</div>
                <div id={style.StocksAddColumn2}>{props.date}</div>
                <div id={style.StocksAddColumn3}>{props.title}</div>
                <div id={style.StocksAddColumn4}>{props.supplier}</div>
                <div id={style.StocksAddColumn5}>{props.amount}</div>
                <div id={style.StocksAddColumn6}>{props.sum.toFixed(2)}</div>
                <div id={style.StocksAddColumn7}>{props.factAmount}</div>
                <div id={style.StocksAddColumn8}>{props.totalAmount.toFixed(2)}</div>
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
                    <div onClick={props.deleteFunction} className={style.OpenButton}>Удалить</div>
                </div>
            </div>
        )
    }

}

type EditableRowPropsType = {
    type: "added" | "existent"
    invoice_id: number;
    id: number;
    sku: string;
    number: number;
    date?: string;
    title: string;
    purcasePrice: number;
    storage?: string;
    amount: number;
    sum?: number;
    factAmount: number;
    totalAmount?: number;
    status?: string;
    deleteFunction: () => void
    addFunction: (data: AddedInvoice) => void
    updateFunction: (data: AddedInvoice) => void
    activeTab: 1 | 2 | 3 | 4 | 5 | 6;
}

function EditableRow(props: EditableRowPropsType) {
    let actionDispatch = useDispatch();

    const [data, setData] = useState<AddedInvoice>({
        invoice_id: props.type === "existent" ? props.id : props.invoice_id,
        sku: props.sku,
        quantity: props.amount,
        quantity_accepted: props.factAmount,
        purchase_price: props.purcasePrice
    })

    useEffect(() => {
        if(props.type === "added") {
            if (data.sku !== "" || data.quantity > 0 || data.quantity_accepted > 0 || data.purchase_price > 0) {
                setActive(true)
            } else {
                setActive(false)
            }
        } else {
            if ((data.sku !== "" && data.sku !== props.sku) || (data.quantity > 0 && data.quantity !== props.amount) || (data.quantity_accepted > 0 && data.quantity_accepted !== props.factAmount) || (data.purchase_price > 0 && data.purchase_price !== props.purcasePrice)) {
                setActive(true)
            } else {
                setActive(false)
            }
        }
        
    }, [data])

    function checkData(data: AddedInvoice) {
        if (data.sku !== "" && data.quantity > 0 && data.quantity_accepted > 0 && data.purchase_price > 0) {
            // setActive(true);
            return true;
        } else {
            // setActive(false);
            return false;
        }
    }

    const [active, setActive] = useState(false);

    function onDeleteHandler() {
        props.deleteFunction();
    }

    function onAddHandler() {
        if (checkData(data) && props.type === 'added') {
            props.addFunction(data);
        } else if (checkData(data) && props.type === 'existent') {
            props.updateFunction(data);
        } else {
            actionDispatch(setErrorAC(true, "Не все поля заполнены корректно!"))
            setTimeout(() => actionDispatch(setErrorAC(false, "")), 3000)
        }
    }

    function onClickHandler() {
        if (active) {
            onAddHandler()
        } else {
            onDeleteHandler()
        }
    }

    function onSkuChange(e: ChangeEvent<HTMLInputElement>) {
        let value = e.currentTarget.value;
        setData({ ...data, sku: value })
        if(props.type === "added") {
            actionDispatch(updateAddedInvoiceStockAC(data))
        } else {
            actionDispatch(updateExistentInvoiceStockAC({stock_id: data.invoice_id, sku: data.sku, purchase_price: data.purchase_price, quantity: data.quantity, quantity_accepted: data.quantity_accepted}))
        }
    }
    function onPurchasePriceChange(e: ChangeEvent<HTMLInputElement>) {
        let value = e.currentTarget.value;
        if (!isNaN(Number(value))) {
            setData({ ...data, purchase_price: Number(value) })
            console.log(value);
            if(props.type === "added") {
                actionDispatch(updateAddedInvoiceStockAC(data))
            } else {
                actionDispatch(updateExistentInvoiceStockAC({stock_id: data.invoice_id, sku: data.sku, purchase_price: data.purchase_price, quantity: data.quantity, quantity_accepted: data.quantity_accepted}))
            }
        }
    }
    function onQuantityChange(e: ChangeEvent<HTMLInputElement>) {
        let value = e.currentTarget.value;
        if (!isNaN(Number(value))) {
            setData({ ...data, quantity: Number(value) })
            console.log(value);
            if(props.type === "added") {
                actionDispatch(updateAddedInvoiceStockAC(data))
            } else {
                actionDispatch(updateExistentInvoiceStockAC({stock_id: data.invoice_id, sku: data.sku, purchase_price: data.purchase_price, quantity: data.quantity, quantity_accepted: data.quantity_accepted}))
            }
        }
    }
    function onQuantityAcceptedChange(e: ChangeEvent<HTMLInputElement>) {
        let value = e.currentTarget.value;
        if (!isNaN(Number(value))) {
            setData({ ...data, quantity_accepted: Number(value) })
            console.log(value);
            if(props.type === "added") {
                actionDispatch(updateAddedInvoiceStockAC(data))
            } else {
                actionDispatch(updateExistentInvoiceStockAC({stock_id: data.invoice_id, sku: data.sku, purchase_price: data.purchase_price, quantity: data.quantity, quantity_accepted: data.quantity_accepted}))
            }
        }
    }
    return (
        <div className={style.Row}>
            <div id={style.StocksColumn1}>{props.number}</div>
            <div id={style.StocksColumn2}><input id={style.RowInput2} value={data.sku} placeholder="-" onChange={onSkuChange}></input></div>
            <div id={style.StocksColumnRow3}>{props.title}</div>
            <div id={style.StocksColumn4}><input id={style.RowInput4} value={data.purchase_price !== 0 ? data.purchase_price.toString() : ""} placeholder="-" onChange={onPurchasePriceChange}></input></div>
            <div id={style.StocksColumn5}><input id={style.RowInput5} value={data.quantity !== 0 ? data.quantity.toString() : ""} placeholder="-" onChange={onQuantityChange}></input></div>
            <div id={style.StocksColumn6}>{props.sum ? props.sum.toFixed(2) : "default"}</div>
            <div id={style.StocksColumn7}><input id={style.RowInput7} value={data.quantity_accepted !== 0 ? data.quantity_accepted.toString() : ""} placeholder="-" onChange={onQuantityAcceptedChange}></input></div>
            <div id={style.StocksColumn8}>{props.totalAmount ? props.totalAmount.toFixed(2) : "default"}</div>
            <div id={style.StocksColumn9}>
                <div onClick={onClickHandler} style={{ color: active ? "limegreen" : "" }}>{active ? props.type === "added" ? "Добавить" : "Обновить": "Удалить"}</div>
            </div>
        </div>
    )
}
