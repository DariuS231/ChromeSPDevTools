import { PropertyActionID as actions } from './../constants/enums'
import { IProperty, IAction } from '../interfaces/spPropertyBagInterfaces'
import { ActionCreator, ActionCreatorsMapObject } from 'redux'
import SpPropertyBagApi from '../api/spPropertyBagApi'

const api = new SpPropertyBagApi();
const updateProperty: ActionCreator<IAction<string, IProperty>> = (property: IProperty): IAction<string, IProperty> => {
    return {
        type: actions.UPDATE_PROPERTY,
        payload: property
    }
}
const deleteProperty: ActionCreator<IAction<string, IProperty>> = (property: IProperty): IAction<string, IProperty> => {
    return {
        type: actions.DELETE_PROPERTY,
        payload: property
    }
}
const setAllProperties: ActionCreator<IAction<string, Array<IProperty>>> = (properties: Array<IProperty>): IAction<string, Array<IProperty>> => {
    return {
        type: actions.SET_ALL_PROPERTIES,
        payload: properties
    }
}

const getAllProperties: any = (): any => {
    return function (dispatch:any) {
        return api.getProperties().then(
            (properties: Array<IProperty>) => {
                dispatch(setAllProperties(properties))
            }
        );
    };
}
const propertyActionsCreatorsMap: ActionCreatorsMapObject = {
    updateProperty,
    deleteProperty,
    getAllProperties
}

export default propertyActionsCreatorsMap;
