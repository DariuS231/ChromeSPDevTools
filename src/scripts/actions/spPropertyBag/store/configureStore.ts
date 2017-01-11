import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers/index'
import * as inmmutable from 'redux-immutable-state-invariant'
import thunk  from 'redux-thunk'; 

export const configureStore = (initialState:any) => {
    return createStore(rootReducer, initialState, applyMiddleware(thunk, inmmutable()))
}
