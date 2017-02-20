import { combineReducers } from "redux";
import { spPropertyBagReducer } from "./spPropertyBagReducer";

export const rootReducer = combineReducers({
    spPropertyBag: spPropertyBagReducer
});
