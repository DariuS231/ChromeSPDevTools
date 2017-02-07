import { combineReducers } from "redux";
import { spFeaturesReducer } from "./spFeaturesReducer";

export const rootReducer = combineReducers({
    spFeatures: spFeaturesReducer
});
