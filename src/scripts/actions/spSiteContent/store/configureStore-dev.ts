
// tslint:disable-next-line:no-reference
/// <reference path="../../../../../typings/index.d.ts" />

import { applyMiddleware, compose, createStore } from "redux";
import * as inmmutable from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (initialState: any) => {
    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, inmmutable())));
};
