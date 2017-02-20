import thunk from "redux-thunk";

import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../reducers/index";

export const configureStore = (initialState: any) => {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
