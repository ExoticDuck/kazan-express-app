import { createStore, combineReducers, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppActionsType, AppReducer } from './reducers/AppReducer';
import { LoginActionsType, LoginReducer } from './reducers/LoginReducer';
import { PurchasesReducer } from './reducers/PurchasesReducer';
import { UserActionsType, UserReducer } from './reducers/UserReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    app: AppReducer,
    user: UserReducer,
    purchases: PurchasesReducer
})

export type RootStateType = ReturnType<typeof store.getState>


const store = createStore(rootReducer, applyMiddleware(thunk));

type AppActionType = AppActionsType | LoginActionsType | UserActionsType;
export type AppDispatch = ThunkDispatch<RootStateType,unknown,AppActionType>
//export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootStateType,unknown,AnyAction>

export default store;