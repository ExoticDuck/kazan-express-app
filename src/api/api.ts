import axios, { AxiosResponse } from "axios";
import { StatTableItem } from "../store/reducers/UserReducer";

const instance = axios.create({
    baseURL: "https://api.ke-stat.ru/v2",
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
        'Access-Control-Allow-Origin': 'https://api.ke-stat.ru/v2',
        'Vary': 'Origin'
    }
})

export const API = {
    getToken(username: string, password: string) {
        return instance.post("/user/token", {
            grant_type: "password",
            username,
            password
        })
    },
    getUserInfo(token: string) {
        return instance.get<any, AxiosResponse<UserInfoResponceType>, any>('/user/info', { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }})
    },
    getUserStat(token: string) {
        return instance.get<any, AxiosResponse<UserStatResponceType>, any>('/user/stat',  { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }})
    }
}

export type UserInfoResponceType = {
    id: number,
    name: string,
    surname: string,
    email: string,
    shops: Array<{title: string, id: number}>,
    shop_list: number[]
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