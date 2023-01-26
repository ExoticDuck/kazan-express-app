import axios, { AxiosResponse } from "axios";
import { AddedInvoice } from "../store/reducers/PurchasesReducer";
import { StatTableItem } from "../store/reducers/UserReducer";

const instance = axios.create({
    baseURL: "https://api.ke-stat.ru/",
    withCredentials: false,
    headers: {
        'Accept': 'text/plain',
        // 'Accept-Encoding': 'gzip, deflate, br',
        // 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        // 'Authorization': 'Basic Og==',
        // 'Connection': 'keep-alive',
        // 'Content-Length': '69',
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Cookie': '_ym_uid=1666857906259995901; _ym_d=1666857906; _ga=GA1.2.947404883.1666857906; _gid=GA1.2.1279778878.1667145948; _ym_isad=2',
        // 'Host': 'api.ke-stat.ru',
        // 'Origin': 'http://localhost:3000',
        // 'Referer': 'https://api.ke-stat.ru/dev',
        // 'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
        // 'sec-ch-ua-mobile': '?0',
        // 'sec-ch-ua-platform': '"Windows"',
        // 'Sec-Fetch-Dest': 'empty',
        // 'Sec-Fetch-Mode': 'cors',
        // 'Sec-Fetch-Site': 'same-origin',
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': 'https://api.ke-stat.ru/dev',
        'Vary': 'Origin'
    }
})

export const API = {
    getToken(username: string, password: string) {
        return instance.post("/v2/user/token", {
            grant_type: "password",
            username,
            password
        })
    },
    getUserInfo(token: string) {
        return instance.get<any, AxiosResponse<UserInfoResponceType>, any>('/v2/user/info', { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' } })
    },
    getTariffs(token: string) {
        return instance.get<any, AxiosResponse<TariffsResponceType>, any>('/v2/user/tariffs', { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' } })
    },
    getUserAccount(token: string) {
        return instance.get<any, AxiosResponse<UserAccountResponceType>, any>('/v2/user/account', { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' } })
    },
    updateTax(token: string, data: UpdateTaxDataType) {
        return instance.post<UpdateTaxDataType, AxiosResponse<UpdateTaxResponceType>, any>('/v2/user/update-tax', { "year": data.year, "tax": data.tax }, { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*', "Content-Type": 'application/json' } })
    },
    getInvoices(token: string, page: number) {
        return instance.get<any, AxiosResponse<GetInvoicesResponceType>, any>(`v2/purchase/invoices?page=${page}`, { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' } })
    },
    getInvoicesStocks(token: string, invoiceId: number) {
        return instance.get<any, AxiosResponse<GetInvoicesStocksResponceType>, any>(`v2/purchase/invoice-stocks?invoice_id=${invoiceId}`, { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' } })
    },
    addStock(token: string, data: AddedInvoice) {
        return instance.post<any, AxiosResponse<AddStockResponceType>, any>(`v2/purchase/add-stock`, {...data}, { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*', "Content-Type": 'application/json'  } })
    }
}
export type AddStockResponceType = {
    status: "OK"
}
export type InvoiceStock = {
    stock_id: number
    sku: string
    title: string
    quantity: number
    quantity_accepted: number
    price: number
    purchase_price: number
    total_price: number
  }

export type GetInvoicesStocksResponceType = {
        id: number
        invoice_id: number
        data: {
          stock_id: number
          sku: string
          title: string
          quantity: number
          quantity_accepted: number
          price: number
          purchase_price: number
          total_price: number
        }[]
        size: number
}
export type GetInvoicesResponceType = {
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
    page: number
}

export type UpdateTaxDataType = {
    year: number,
    tax: number
}

export type UpdateTaxResponceType = {
    id: number,
    taxes: Array<
        {
            year: number,
            tax: number
        }
    >
}

export type UserInfoResponceType = {
    id: number,
    name: string,
    surname: string,
    email: string,
    shops: Array<{ title: string, shop_id: number }>,
}

export type TariffsResponceType = {
    tariffs: Array<
        {
            id: number,
            title: string,
            description: string,
            price: number,
            shop_count: number,
            order_count: number,
            updates: number
        }
    >
}

export type UserAccountResponceType = {
    id: number,
    name: string,
    surname: string,
    email: string,
    shops: Array<
        {
            shop_id: number,
            title: string
        }
    >,
    tariff: string,
    status: boolean,
    date_end: string,
    reg_date: string,
    taxes: Array<{
        year: number,
        tax: number
    }>
}

export type UserStatResponceType = {
    today: {
        items_amount: number,
        total_profit: number,
        average_order: number,
        marginality: number,
        clear_profit: number
    },
    yesterday: {
        items_amount: number,
        total_profit: number,
        average_order: number,
        marginality: number,
        clear_profit: number
    },
    month: {
        items_amount: number,
        total_profit: number,
        average_order: number,
        marginality: number,
        clear_profit: number
    },
    top_turnover: StatTableItem[],
    top_clean: StatTableItem[],
    top_dead: StatTableItem[]
}