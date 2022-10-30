import { createStore, combineReducers } from 'redux';
import { LoginReducer } from './reducers/LoginReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    
})

export type RootStateType = ReturnType<typeof store.getState>


const store = createStore(rootReducer);

export default store;