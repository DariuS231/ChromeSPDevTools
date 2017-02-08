
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/index";
import { initialState } from "../store/initialState";
import { CustomActionType } from "./../constants/enums";

export const configureStore = (caType: CustomActionType) => {
    initialState.customActionType = caType;
    const stateInitial = {
        spCustomActionsReducer: initialState
    };
    return createStore(rootReducer, stateInitial, applyMiddleware(thunk));
};
