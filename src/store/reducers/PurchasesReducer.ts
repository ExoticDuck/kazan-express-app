import { AxiosError } from "axios";
import { API, UserInfoResponceType } from "../../api/api"
import { AppThunk } from "../store";
import { setIsLoadingAC, setTokenAC } from "./AppReducer";


type UserStateType = {
    
}

let initialState: UserStateType = {
}


export const PurchasesReducer = (state = initialState, action: UserActionsType): UserStateType => {
    switch (action.type) {
        case "user/SET-USER":
            return { ...state, userInfo: { ...action.payload } }
       
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

export const resetUserAC = () =>
({
    type: 'RESET-USER'
} as const)

export type resetUserACType = ReturnType<typeof resetUserAC>

//thunk

export const UserInfoTC = (token: string): AppThunk => {
    return (dispatch, getState) => {
        // dispatch(setIsLoadingAC(true))
        // dispatch(setTokenAC(token));
        // dispatch(setIsLoadingAC(true))
        // API.getUserInfo(token).then((res) => {
        //     console.log(res.data);
        //     dispatch(setUserInfoAC(res.data))
        // }).then((res) => {
        //     API.getUserAccount(token).then((res) => {
        //         console.log(res.data);
        //         dispatch(setUserAccountAC(res.data))
        //     })
        //     dispatch(setIsLoadingAC(false))
        // }).then((res) => {
        //     API.getTariffs(token).then((res) => {
        //         console.log(res.data);
        //         dispatch(setUserTariffsAC(res.data))
        //     }
        // )}).catch((e: AxiosError) => {
        //     dispatch(setIsLoadingAC(false));
        // })
    }
}




export type UserActionsType = setUserInfoACType  | resetUserACType;
