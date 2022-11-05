import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { API } from "../../api/api"
import { AppThunk, RootStateType } from "../store"
import { setErrorAC, setIsLoadingAC, setTokenAC } from "./AppReducer"
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
            debugger
            console.log(res.data);
            localStorage.setItem("access_token", res.data.access_token);
            dispatch(setTokenAC(res.data.access_token))
            setTimeout(() =>  dispatch(setIsLoadingAC(false)), 500)
            // dispatch(setIsLoadingAC(false));
        }).catch((e: AxiosError) => {
            //@ts-ignore
            if(e.response?.data.detail === "Incorrect username or login") {
                dispatch(setErrorAC(true, "Неверный логин или пароль!"));
                dispatch(setPasswordAC(""));
            }

            dispatch(setIsLoadingAC(false));
        })
    }
}


export type LoginActionsType = setEmailACType | setPasswordACType | resetUserACType;