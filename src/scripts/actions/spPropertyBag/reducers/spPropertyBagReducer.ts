import { PropertyActionID as actions } from './../constants/enums'
import { IProperty, IAction } from '../interfaces/spPropertyBagInterfaces'

export const spPropertyBagReducer = (properties:Array<IProperty> = [], action: IAction<string, any>) => {
    switch (action.type) {
        case actions.CREATE_PROPERTY:
            return [...properties, Object.assign({}, action.payload)]
        case actions.DELETE_PROPERTY:
            return [...properties.filter(prop => prop.key !== action.payload.key)]
        case actions.UPDATE_PROPERTY:
            return [...properties.filter(prop => prop.key !== action.payload.key), Object.assign({}, action.payload)]
        case actions.SET_ALL_PROPERTIES:
            return action.payload;
        default:
            return properties;
    }

}