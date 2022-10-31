import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { API } from "../../api/api"
import { AppThunk, RootStateType } from "../store"
import { setIsLoadingAC, setTokenAC } from "./AppReducer"
import { resetUserACType, setUserInfoAC, setUserStatAC } from "./UserReducer"

type LoginStateType = {
    email: string
    password: string
}

let initialState: LoginStateType = {
    email: "",
    password: ""
}


export const LoginReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        case "login/SET-EMAIL":
            return { ...state, email: action.email }
        case "login/SET-PASSWORD":
            return { ...state, password: action.password }
        case "RESET-USER":
            return { ...initialState }
        default:
            return { ...state }
    }
}

// actions
export const setEmailAC = (email: string) =>
({
    type: 'login/SET-EMAIL',
    email
} as const)

export type setEmailACType = ReturnType<typeof setEmailAC>

export const setPasswordAC = (password: string) =>
({
    type: 'login/SET-PASSWORD',
    password
} as const)

export type setPasswordACType = ReturnType<typeof setPasswordAC>

//thunk

export const LoginTC = (username: string, password: string): AppThunk => {
    return (dispatch, getState) => {
        dispatch(setIsLoadingAC(true))
        API.getToken(username, password).then((res) => {
            console.log(res.data);
            dispatch(setTokenAC(res.data.access_token))
            localStorage.setItem("access_token", res.data.access_token);
        }).then((res) => {
            API.getUserInfo(getState().app.token).then((res) => {
                console.log(res.data);
                dispatch(setUserInfoAC(res.data))
            }).then((res) => {
                API.getUserStat(getState().app.token).then((res) => {
                    console.log(res.data);
                    dispatch(setUserStatAC(res.data))
                })
                dispatch(setIsLoadingAC(false))
            })
        }).catch((e: AxiosError) => {
           setIsLoadingAC(false)
        })
    }
}


export type LoginActionsType = setEmailACType | setPasswordACType | resetUserACType;