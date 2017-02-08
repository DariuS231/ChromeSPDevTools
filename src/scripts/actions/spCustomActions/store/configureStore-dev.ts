import { applyMiddleware, compose, createStore } from "redux";
import * as inmmutable from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/index";
import { initialState } from "../store/initialState";
import { CustomActionType } from "./../constants/enums";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (caType: CustomActionType) => {
    initialState.customActionType = caType;
    const stateInitial = {
        spCustomActionsReducer: initialState
    };
    return createStore(rootReducer, stateInitial, composeEnhancers(applyMiddleware(thunk, inmmutable())));
};
