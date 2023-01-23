import { AxiosError } from "axios";
import { API, TariffsResponceType, UpdateTaxDataType, UpdateTaxResponceType, UserAccountResponceType, UserInfoResponceType, UserStatResponceType } from "../../api/api"
import { AppThunk } from "../store";
import { setIsLoadingAC, setTokenAC } from "./AppReducer";

type ShopType = { title: string, shop_id: number };

export type StatTableItem = {
    place: number,
    sku_id: number,
    sku_title: string,
    title: string,
    value: number
}

type UserStateType = {
    userInfo: {
        id: number,
        name: string,
        surname: string,
        email: string,
        shops: Array<ShopType>
    },
    userAccount: {
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
    },
    tariffs: Array<
        {
            id: number,
            title: string,
            description: string,
            price: number,
            shop_count: number,
            order_count: number,
            updates: number,
        }
    >
}

let initialState: UserStateType = {
    userInfo: {
        id: 0,
        name: "",
        surname: "",
        email: "",
        shops: [],
    },
    userAccount: {
        id: 0,
        name: "",
        surname: "",
        email: "",
        shops: [],
        tariff: "",
        status: false,
        date_end: "",
        reg_date: "",
        taxes: []
    },
    tariffs: []
}

// export type StatType = typeof initialState.userStat.today;

export const UserReducer = (state = initialState, action: UserActionsType): UserStateType => {
    switch (action.type) {
        case "user/SET-USER":
            return { ...state, userInfo: { ...action.payload } }
        case "user/SET-USER-ACCOUNT":
            return { ...state, userAccount: { ...action.payload } }
        case "user/SET-USER-TARIFFS":
            return { ...state, tariffs: [ ...action.payload.tariffs ] }
        case "user/SET-USER-TAXES":
            return { userInfo: {...state.userInfo}, tariffs: [...state.tariffs], userAccount: { ...state.userAccount, taxes: action.payload.taxes.map(el => ({...el})) }}
        case "RESET-USER":
            return { ...initialState }
        default:
            return { ...state }
    }
}

// actions
export const setUserInfoAC = (data: UserInfoResponceType) =>
({
    type: 'user/SET-USER',
    payload: {
        ...data
    }
} as const)

export type setUserInfoACType = ReturnType<typeof setUserInfoAC>

export const setUserAccountAC = (data: UserAccountResponceType) =>
({
    type: 'user/SET-USER-ACCOUNT',
    payload: {
        ...data
    }
} as const)

export type setUserStatACType = ReturnType<typeof setUserAccountAC>

export const setUserTariffsAC = (data: TariffsResponceType) =>
({
    type: 'user/SET-USER-TARIFFS',
    payload: {
        ...data
    }
} as const)

export type setUserTariffsACType = ReturnType<typeof setUserTariffsAC>

export const setUserTaxesAC = (data: UpdateTaxResponceType) =>
({
    type: 'user/SET-USER-TAXES',
    payload: {
        taxes: [...data.taxes]
    }
} as const)

export type setUserTaxesACType = ReturnType<typeof setUserTaxesAC>

export const resetUserAC = () =>
({
    type: 'RESET-USER'
} as const)

export type resetUserACType = ReturnType<typeof resetUserAC>

// export const setSelectedShopAC = (id: number, title: string) =>
// ({
//     type: 'user/SET-SELECTED-SHOP',
//     payload: {
//         id,
//         title
//     }
// } as const)

// export type setSelectedShopACType = ReturnType<typeof setSelectedShopAC>


//thunk

export const UserInfoTC = (token: string): AppThunk => {
    return (dispatch, getState) => {
        dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        dispatch(setIsLoadingAC(true))
        API.getUserInfo(token).then((res) => {
            console.log(res.data);
            dispatch(setUserInfoAC(res.data))
        }).then((res) => {
            API.getUserAccount(token).then((res) => {
                console.log(res.data);
                dispatch(setUserAccountAC(res.data))
            })
            dispatch(setIsLoadingAC(false))
        }).then((res) => {
            API.getTariffs(token).then((res) => {
                console.log(res.data);
                dispatch(setUserTariffsAC(res.data))
            }
        )}).catch((e: AxiosError) => {
            dispatch(setIsLoadingAC(false));
        })
    }
}

export const UpdateTaxTC = (token: string, data: UpdateTaxDataType): AppThunk => {
    return (dispatch, getState) => {
        dispatch(setIsLoadingAC(true))
        dispatch(setTokenAC(token));
        dispatch(setIsLoadingAC(true))
        API.updateTax(token, data).then((res) => {
            dispatch(setUserTaxesAC(res.data))
            debugger
            // API.getUserAccount(token).then((res) => {
            //     console.log(res.data);
            //     dispatch(setUserAccountAC(res.data))
            // })
            dispatch(setIsLoadingAC(false))
        }).catch((e: AxiosError) => {
            dispatch(setIsLoadingAC(false));
        })
    }
}


export type UserActionsType = setUserInfoACType | setUserStatACType | resetUserACType | setUserTariffsACType | setUserTaxesACType;
