import { PropertyActionID as actions } from './../constants/spPropertyBagActionsIDs'

export const spPropertyBagReducer = (properties = [], action) => {
    switch (action.type) {
        case actions.CREATE_PROPERTY:
            return [...properties, Object.assign({}, action.property)]
        case actions.DELETE_PROPERTY:
            return [...properties.filter(prop => prop.id !== action.prop.id)]
        case actions.UPDATE_PROPERTY:
            return [...properties.filter(prop => prop.id !== action.prop.id), Object.assign({}, action.property)]
        default:
            return properties;
    }

}