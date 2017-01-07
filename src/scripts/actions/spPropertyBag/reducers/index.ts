import { combineReducers } from 'redux'
import { spPropertyBagReducer } from './spPropertyBagReducer'
import { spwindowReducer } from './windowReducer'

export const rootReducer = combineReducers({
    properties: spPropertyBagReducer,
    window: spwindowReducer
});