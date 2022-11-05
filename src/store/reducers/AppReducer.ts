
import { resetUserAC, resetUserACType } from './UserReducer';
type AppStateType = {
    token: string,
    isLoading: boolean,
    error: {
        isActive: boolean,
        message: string
    }
}

let initialState: AppStateType = {
    token: "",
    isLoading: false,
    error: {isActive: false, message: ""}
}

export const AppReducer = (state = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case "app/SET-TOKEN":
            return { ...state, token: action.token }
        case "app/SET-IS-LOADING":
            return { ...state, isLoading: action.isLoading }
        case "RESET-USER":
            return { ...initialState }
        case "app/SET-ERROR":
            return { ...initialState, error: {isActive: action.isActive, message: action.message} }
        default:
            return { ...state }
    }
}

// actions
export const setTokenAC = (token: string) =>
({
    type: 'app/SET-TOKEN',
    token
} as const)

export type setTokenACType = ReturnType<typeof setTokenAC>

export const setIsLoadingAC = (isLoading: boolean) =>
({
    type: 'app/SET-IS-LOADING',
    isLoading
} as const)

export type setIsLoadingACType = ReturnType<typeof setIsLoadingAC>

export const setErrorAC = (isActive: boolean, message: string) =>
({
    type: 'app/SET-ERROR',
    isActive, 
    message
} as const)

export type setErrorACType = ReturnType<typeof setErrorAC>


export type AppActionsType = setTokenACType | setIsLoadingACType | resetUserACType | setErrorACType;
