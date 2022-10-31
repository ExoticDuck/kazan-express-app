import { UserInfoResponceType, UserStatResponceType } from "../../api/api"

type ShopType = {title: string, id: number};

type UserStateType = {
    userInfo: {
        id: number,
        name: string,
        surname: string,
        email: string,
        shops: Array<ShopType>,
        shop_list: number[]
    },
    userStat: {
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
        }
    }
}

let initialState: UserStateType = {
    userInfo: {
        id: 0,
        name: "",
        surname: "",
        email: "",
        shops: [],
        shop_list: []
    },
    userStat: {
        today: {
            items_amount: 0,
            total_profit: 0,
            average_order: 0,
            marginality: 0,
            clear_profit: 0
        },
        yesterday: {
            items_amount: 0,
            total_profit: 0,
            average_order: 0,
            marginality: 0,
            clear_profit: 0
        }
    }
}

export type StatType = typeof initialState.userStat.today;

export const UserReducer = (state = initialState, action: UserActionsType): UserStateType => {
    switch (action.type) {
        case "user/SET-USER":
            return { ...state, userInfo: {...action.payload} }
        case "user/SET-USER-STAT":
            return { ...state, userStat: { ...action.payload } }
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

export const setUserStatAC = (data: UserStatResponceType) =>
({
    type: 'user/SET-USER-STAT',
    payload: {
        ...data
    }
} as const)

export type setUserStatACType = ReturnType<typeof setUserStatAC>

export const resetUserAC = () =>
({
    type: 'RESET-USER'
} as const)

export type resetUserACType = ReturnType<typeof resetUserAC>


export type UserActionsType = setUserInfoACType | setUserStatACType | resetUserACType;
