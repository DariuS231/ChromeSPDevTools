import { combineReducers } from "redux";
import { spFeaturesReducer } from "./spSearchReducer";

export const rootReducer = combineReducers({
    spFeatures: spFeaturesReducer
});
