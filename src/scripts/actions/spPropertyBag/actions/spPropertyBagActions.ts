import { PropertyActionID as actions } from './../constants/enums'
import { IProperty, IAction } from '../interfaces/spPropertyBagInterfaces'
import { ActionCreator, ActionCreatorsMapObject } from 'redux'

const updateProperty: ActionCreator<IAction<actions, IProperty>> = (property: IProperty): IAction<actions, IProperty> => {
    return {
        type: actions.UPDATE_PROPERTY,
        payload: property
    }
}
const deleteProperty: ActionCreator<IAction<actions, IProperty>> = (property: IProperty): IAction<actions, IProperty> => {
    return {
        type: actions.DELETE_PROPERTY,
        payload: property
    }
}

const propertyActionsCreatorsMap: ActionCreatorsMapObject = {
    updateProperty,
    deleteProperty
}

export default propertyActionsCreatorsMap;
