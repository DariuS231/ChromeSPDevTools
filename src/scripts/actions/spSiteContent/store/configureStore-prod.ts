import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/index";

export const configureStore = (initialState: any) => {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
};
