
type LoginStateType = {
    email: string
    password: string
}

let initiaslState: LoginStateType = {
    email: "",
    password: ""
}


export const LoginReducer = (state: LoginStateType = initiaslState, action: AppActionsType): LoginStateType => {
    switch (action.type) {
        case "app/SET-EMAIL":
            return {...state, email: action.email}
        case "app/SET-PASSWORD": 
            return {...state, password: action.password}
        default:
            return {...state}
    }
}

// actions
export const setEmailAC = (email: string) =>
    ({
        type: 'app/SET-EMAIL',
        email
    } as const)

export type setEmailACType = ReturnType<typeof setEmailAC>

export const setPasswordAC = (password: string) =>
    ({
        type: 'app/SET-PASSWORD',
        password
    } as const)

export type setPasswordACType = ReturnType<typeof setPasswordAC>


export type AppActionsType = setEmailACType | setPasswordACType;