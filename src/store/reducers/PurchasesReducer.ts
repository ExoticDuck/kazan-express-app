import { AxiosError } from "axios";
import { API, GetInvoicesResponceType, GetInvoicesStocksResponceType } from "../../api/api"
import { AppThunk } from "../store";
import { setIsLoadingAC, setTokenAC } from "./AppReducer";


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
    invoicesStocks: GetInvoicesStocksResponceType
}

let initialState: PurchasesStateType = {
    invoices: {
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
    }
}


export const PurchasesReducer = (state = initialState, action: UserActionsType): PurchasesStateType => {
    switch (action.type) {
        case "user/SET-INITIAL-INVOICES":
            return { ...state, invoices: { ...action.payload, hasMoreItems: true } }
        case "user/SET-STOCKS":
            return { ...state, invoicesStocks: { ...action.payload } }
        case "user/SET-INVOICES":
            return { ...state, invoices: { ...action.payload, hasMoreItems: action.payload.data.length !== 0 && action.payload.data.length === 100, data: [...state.invoices.data, ...action.payload.data] } }
        case "user/SET-PAGE":
            return { ...state, invoices: { ...state.invoices, page: action.payload.page + 1 } }
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

export const resetUserAC = () =>
({
    type: 'RESET-USER'
} as const)

export type resetUserACType = ReturnType<typeof resetUserAC>

//thunk

export const GetInvoicesTC = (token: string, page: number): AppThunk => {
    return (dispatch, getState) => {
        // dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        // dispatch(setIsLoadingAC(true))
        API.getInvoices(token, getState().purchases.invoices.page).then((res) => {
            if (getState().purchases.invoices.page === 1) {
                dispatch(setInitialInvoicesAC(res.data))
            } else {
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




export type UserActionsType = setInvoicesACType | resetUserACType | setPageACType | setInitialInvoicesACType | setInvoiceStocksACType;
