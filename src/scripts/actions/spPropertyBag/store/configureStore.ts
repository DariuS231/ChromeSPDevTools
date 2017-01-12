
import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../reducers/index'
import * as inmmutable from 'redux-immutable-state-invariant'
import thunk  from 'redux-thunk'; 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (initialState:any) => {
    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, inmmutable())));
}
