import { AxiosError } from "axios";
import moment from "moment";
import { API, GetInvoicesResponceType, GetInvoicesStocksResponceType } from "../../api/api"
import { s2ab } from "../../utils/utils";
import { AppThunk } from "../store";
import { setErrorAC, setIsLoadingAC, setTokenAC } from "./AppReducer";


export type AddedInvoice = {
    invoice_id: number;
    sku: string;
    quantity: number;
    quantity_accepted: number;
    purchase_price: number;
}

export type UpdatedStock = {
    stock_id: number,
    sku: string,
    quantity: number,
    quantity_accepted: number,
    purchase_price: number
}

type PurchasesStateType = {
    invoices: {
        id: number,
        data:
        {
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
        }[],
        size: number,
        page: number,
        hasMoreItems: boolean
    },
    filteredInvoices: {
        id: number,
        data:
        {
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
        }[],
        size: number,
        page: number,
        hasMoreItems: boolean
    },
    addedInvoices: {
        id: number,
        data:
        {
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
        }[],
        size: number,
        page: number,
        hasMoreItems: boolean
    }
    invoicesStocks: GetInvoicesStocksResponceType,
    addedInvoiceStocks: AddedInvoice[],
    updatedStock: UpdatedStock[]
}

let initialState: PurchasesStateType = {
    invoices: {
        id: 0,
        data: [],
        size: 0,
        page: 1,
        hasMoreItems: true
    },
    filteredInvoices: {
        id: 0,
        data: [],
        size: 0,
        page: 1,
        hasMoreItems: true
    },
    addedInvoices: {
        id: 0,
        data: [],
        size: 0,
        page: 1,
        hasMoreItems: true
    },
    invoicesStocks: {
        id: 0,
        invoice_id: 0,
        data: [],
        size: 0
    },
    addedInvoiceStocks: [],
    updatedStock: [],
    
}


export const PurchasesReducer = (state = initialState, action: UserActionsType): PurchasesStateType => {
    switch (action.type) {
        case "user/SET-INITIAL-INVOICES":
            return { ...state, invoices: { ...action.payload, hasMoreItems: true, data: state.invoices.page !== 1 ? [...state.invoices.data] : [...action.payload.data] } }
        case "user/SET-STOCKS":
            return { ...state, invoicesStocks: { ...action.payload } }
        case "user/SET-INVOICES":
            return { ...state, invoices: { ...action.payload, hasMoreItems: action.payload.data.length !== 0 && action.payload.data.length === 100, data: state.invoices.page !== 1 ? [...state.invoices.data, ...action.payload.data] : [...state.invoices.data] } }
        case "user/SET-PAGE":
            return { ...state, invoices: { ...state.invoices, page: action.payload.page + 1 } }
        case "user/ADD-STOCK":
            return {
                ...state, addedInvoiceStocks: [{
                    invoice_id: action.payload.invoiceId,
                    sku: "",
                    quantity: 0,
                    quantity_accepted: 0,
                    purchase_price: 0,
                }]
            };
        case "user/UPDATE-ADDED-STOCK":
            return {
                ...state, addedInvoiceStocks: [{
                    invoice_id: state.addedInvoiceStocks[0].invoice_id,
                    sku: action.payload.data.sku,
                    quantity: action.payload.data.quantity,
                    quantity_accepted: action.payload.data.quantity_accepted,
                    purchase_price: action.payload.data.purchase_price,
                }]
            };
        case "user/UPDATE-EXISTENT-STOCK":
            return {
                ...state, updatedStock: [{
                    stock_id: action.payload.data.stock_id,
                    sku: action.payload.data.sku,
                    quantity: action.payload.data.quantity,
                    quantity_accepted: action.payload.data.quantity_accepted,
                    purchase_price: action.payload.data.purchase_price,
                }]
            };
        case "user/SET-DATE-FILTER":
            return {
                ...state, filteredInvoices: {...state.invoices, 
                    data: state.invoices.data.filter(el => {
                        let elDate = moment(el.date_created).format('DD.MM.YYYY');
                        if(elDate === action.payload.date) {
                            return el;
                        }
                    })
                }
            };
        case "user/SET-ADDED-INVOICES":
            return {
                ...state, addedInvoices: {
                    ...action.payload.data, hasMoreItems: true
                }
            };
        case "user/CLEAR-ADDED-INVOICES":
            return {
                ...state, addedInvoices: {
                    ...initialState.addedInvoices
                }
            };
        case "user/REMOVE-STOCKS":
            return {
                ...state, addedInvoiceStocks: initialState.addedInvoiceStocks
            };
        case "user/RESET-INVOICES":
            return {
                ...state, invoices: initialState.invoices
            };
        case "user/REMOVE-UPDATED-STOCK":
            return {
                ...state, updatedStock: []
            };
        case "RESET-USER":
            return { ...initialState }
        default:
            return { ...state }
    }
}

// actions
export const setInvoicesAC = (data: GetInvoicesResponceType) =>
({
    type: 'user/SET-INVOICES',
    payload: {
        ...data
    }
} as const)

export type setInvoicesACType = ReturnType<typeof setInvoicesAC>

export const setInitialInvoicesAC = (data: GetInvoicesResponceType) =>
({
    type: 'user/SET-INITIAL-INVOICES',
    payload: {
        ...data
    }
} as const)

export type setInitialInvoicesACType = ReturnType<typeof setInitialInvoicesAC>
export const setInvoicePageAC = (page: number) =>
({
    type: 'user/SET-PAGE',
    payload: {
        page
    }
} as const)

export type setPageACType = ReturnType<typeof setInvoicePageAC>

export const setInvoiceStocksAC = (data: GetInvoicesStocksResponceType) =>
({
    type: 'user/SET-STOCKS',
    payload: {
        ...data
    }
} as const)

export type setInvoiceStocksACType = ReturnType<typeof setInvoiceStocksAC>

export const addInvoiceStockAC = (invoiceId: number) =>
({
    type: 'user/ADD-STOCK',
    payload: {
        invoiceId
    }
} as const)

export type addInvoiceStockACType = ReturnType<typeof addInvoiceStockAC>
export const updateAddedInvoiceStockAC = (data: AddedInvoice) =>
({
    type: 'user/UPDATE-ADDED-STOCK',
    payload: {
        data
    }
} as const)

export type updateAddedInvoiceStockACType = ReturnType<typeof updateAddedInvoiceStockAC>

export const updateExistentInvoiceStockAC = (data: UpdatedStock) =>
({
    type: 'user/UPDATE-EXISTENT-STOCK',
    payload: {
        data
    }
} as const)

export type updateExistentInvoiceStockACType = ReturnType<typeof updateExistentInvoiceStockAC>

export const setAddedInvoicesAC = (data: GetInvoicesResponceType) =>
({
    type: 'user/SET-ADDED-INVOICES',
    payload: {
        data
    }
} as const)

export type setAddedInvoicesACType = ReturnType<typeof setAddedInvoicesAC>

export const setDateFilterAC = (date: string) =>
({
    type: 'user/SET-DATE-FILTER',
    payload: {
        date
    }
} as const)

export type setDateFilterACType = ReturnType<typeof setDateFilterAC>

export const clearAddedInvoicesAC = () =>
({
    type: 'user/CLEAR-ADDED-INVOICES',
    payload: {

    }
} as const)

export type clearAddedInvoicesACType = ReturnType<typeof clearAddedInvoicesAC>

export const deleteInvoiceStocksAC = () =>
({
    type: 'user/REMOVE-STOCKS',
    payload: {}
} as const)

export type deleteInvoiceStockACType = ReturnType<typeof deleteInvoiceStocksAC>

export const deleteUpdatedInvoiceStocksAC = () =>
({
    type: 'user/REMOVE-UPDATED-STOCK',
    payload: {}
} as const)

export type deleteUpdatedInvoiceStockACType = ReturnType<typeof deleteUpdatedInvoiceStocksAC>

export const resetInvoicesAC = () =>
({
    type: 'user/RESET-INVOICES',
    payload: {}
} as const)

export type resetInvoicesACType = ReturnType<typeof resetInvoicesAC>

export const resetUserAC = () =>
({
    type: 'RESET-USER'
} as const)

export type resetUserACType = ReturnType<typeof resetUserAC>

//thunk

export const GetInvoicesTC = (token: string): AppThunk => {
    return (dispatch, getState) => {
        // dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        // dispatch(setIsLoadingAC(true))
        API.getInvoices(token, getState().purchases.invoices.page).then((res) => {
            if (res.data.page === 1) {
                debugger
                dispatch(setInitialInvoicesAC(res.data))
            } else {
                debugger
                dispatch(setInvoicesAC(res.data));
            }
            return res
        }).then((res) => {
            dispatch(setInvoicePageAC(res.data.page));
        })
            .catch((e: AxiosError) => {
                dispatch(setIsLoadingAC(false));
            })
    }
}


export const GetInvoiceStocksTC = (token: string, invoiceId: number): AppThunk => {
    return (dispatch, getState) => {
        // dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        // dispatch(setIsLoadingAC(true))
        API.getInvoicesStocks(token, invoiceId).then((res) => {
            dispatch(setInvoiceStocksAC(res.data))
        })
            .catch((e: AxiosError) => {
                dispatch(setIsLoadingAC(false));
            })
    }
}
export const AddStockTC = (token: string, data: AddedInvoice): AppThunk => {
    return (dispatch, getState) => {
        // dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        // dispatch(setIsLoadingAC(true))
        API.addStock(token, data).then((res) => {
            dispatch(deleteInvoiceStocksAC())
            return res;
        }).then((res) => {
            if (res.data.status === "OK") {
                dispatch(GetInvoiceStocksTC(token, data.invoice_id))
            }
        })
            .catch((e: AxiosError) => {
                dispatch(setIsLoadingAC(false));
            })
    }
}
export const UpdateStockTC = (token: string, data: UpdatedStock, invoiceId: number): AppThunk => {
    return (dispatch, getState) => {
        // dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        // dispatch(setIsLoadingAC(true))
        API.updateStock(token, data).then((res) => {
            dispatch(deleteUpdatedInvoiceStocksAC())
            return res;
        }).then((res) => {
            if (res.data.status === "OK") {
                dispatch(GetInvoiceStocksTC(token, invoiceId))
            }
        })
            .catch((e: AxiosError) => {
                //@ts-ignore
                let message = e.response?.data.detail === "Product or stock not exist" ? "Продукт или накладная не существует." : ""
                dispatch(setErrorAC(true, message));
                setTimeout(() => dispatch(setErrorAC(false, "")), 3000);
                dispatch(setIsLoadingAC(false));
                dispatch(GetInvoiceStocksTC(token, invoiceId))
            })
    }
}
export const DeleteStockTC = (token: string, stockId: number, invoiceId: number): AppThunk => {
    return (dispatch, getState) => {
        // dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        // dispatch(setIsLoadingAC(true))
        API.deleteStock(token, stockId).then((res) => {
            if (res.data.status === "OK") {
                dispatch(GetInvoiceStocksTC(token, invoiceId))
            }
        })
            .catch((e: AxiosError) => {
                //@ts-ignore
                let message = e.response?.data.detail;
                dispatch(setErrorAC(true, message));
                setTimeout(() => dispatch(setErrorAC(false, "")), 3000);
                dispatch(setIsLoadingAC(false));
                dispatch(GetInvoiceStocksTC(token, invoiceId))
            })
    }
}
export const DeleteInvoiceTC = (token: string, invoiceId: number): AppThunk => {
    return (dispatch, getState) => {
        // dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        // dispatch(setIsLoadingAC(true))
        API.deleteInvoice(token, invoiceId).then((res) => {
            if (res.data.status === "OK") {
                dispatch(resetInvoicesAC())
                dispatch(GetInvoicesTC(token))
            }
        }).then((res) => {
            dispatch(GetInvoicesTC(token))
        }).catch((e: AxiosError) => {
            //@ts-ignore
            let message = e.response?.data.detail;
            dispatch(setErrorAC(true, message));
            setTimeout(() => dispatch(setErrorAC(false, "")), 3000);
            dispatch(setIsLoadingAC(false));
            dispatch(GetInvoicesTC(token))
        })
    }
}
export const UploadFileTC = (token: string, file: any): AppThunk => {
    return (dispatch, getState) => {
        // dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        // dispatch(setIsLoadingAC(true))
        API.uploadFile(token, file).then((res) => {
            dispatch(setAddedInvoicesAC(res.data));
        }).catch((e: AxiosError) => {
            //@ts-ignore
            let message = e.response?.data.detail;
            dispatch(setErrorAC(true, message));
            setTimeout(() => dispatch(setErrorAC(false, "")), 3000);
            dispatch(setIsLoadingAC(false));
            dispatch(GetInvoicesTC(token))
        })
    }
}
export const DownloadFileTC = (token: string): AppThunk => {
    return (dispatch, getState) => {
        // dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        // dispatch(setIsLoadingAC(true))
        API.getExample(token).then((res) => {
            debugger
            // const url = window.URL.createObjectURL(new Blob([res.data as BlobPart]));
            // const link = document.createElement("a");
            // link.href = url;
            // link.setAttribute('download', `Purchases.xlsx`);
            // document.body.appendChild(link);
            // link.click();

            let blob = new Blob([s2ab(atob(res.data))], {
                type: ''
            });
            
            let url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute('download', `Purchases.xlsx`);
            document.body.appendChild(link);
            link.click();
        }).catch((e: AxiosError) => {
            //@ts-ignore
            let message = e.response?.data.detail;
            dispatch(setErrorAC(true, message));
            setTimeout(() => dispatch(setErrorAC(false, "")), 3000);
            dispatch(setIsLoadingAC(false));
            dispatch(GetInvoicesTC(token))
        })
    }
}




export type UserActionsType =
    setInvoicesACType |
    resetUserACType |
    setPageACType |
    setInitialInvoicesACType |
    setInvoiceStocksACType |
    addInvoiceStockACType |
    deleteInvoiceStockACType |
    updateAddedInvoiceStockACType |
    updateExistentInvoiceStockACType |
    deleteUpdatedInvoiceStockACType |
    resetInvoicesACType |
    setAddedInvoicesACType |
    clearAddedInvoicesACType |
    setDateFilterACType;
