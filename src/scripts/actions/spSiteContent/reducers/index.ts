import { combineReducers } from "redux";
import { spSiteContentReducer } from "./spSiteContentReducer";

export const rootReducer = combineReducers({
    spSiteContent: spSiteContentReducer
});
