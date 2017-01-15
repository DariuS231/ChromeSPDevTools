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
const createProperty: ActionCreator<IAction<string, IProperty>> = (property: IProperty): IAction<string, IProperty> => {
    return {
        type: actions.CREATE_PROPERTY,
        payload: property
    }
}
const setAllProperties: ActionCreator<IAction<string, Array<IProperty>>> = (properties: Array<IProperty>): IAction<string, Array<IProperty>> => {
    return {
        type: actions.SET_ALL_PROPERTIES,
        payload: properties
    }
}
const updateNewProperty: ActionCreator<IAction<string, IProperty>> = (property: IProperty): IAction<string, IProperty> => {
    return {
        type: actions.UPDATE_NEW_PROPERTY,
        payload: property
    }
}
const setFilterText: ActionCreator<IAction<string, string>> = (filterText: string): IAction<string, string> => {
    return {
        type: actions.SET_FILTER_TEXT,
        payload: filterText
    }
}
const setWorkingOnIt: ActionCreator<IAction<string, boolean>> = (isWorkingOnIt: boolean): IAction<string, boolean> => {
    return {
        type: actions.SET_WORKING_ON_IT,
        payload: isWorkingOnIt
    }
}
const setUserHasPermissions: ActionCreator<IAction<string, boolean>> = (userHasPermission: boolean): IAction<string, boolean> => {
    return {
        type: actions.SET_USER_PERMISSIONS,
        payload: userHasPermission
    }
}
const setMessageData: ActionCreator<IAction<string, IMessageData>> = (messageData: IMessageData): IAction<string, IMessageData> => {
    return {
        type: actions.SET_USER_PERMISSIONS,
        payload: messageData
    }
}

const getAllProperties: any = (): any => {
    return function (dispatch: any) {
        return api.getProperties().then(
            (properties: Array<IProperty>) => {
                dispatch(setAllProperties(properties))
            }
        );
    };
}
const spPropertyBagActionsCreatorMap: ActionCreatorsMapObject = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    setAllProperties,
    updateNewProperty,
    setFilterText,
    setWorkingOnIt,
    setUserHasPermissions,
    setMessageData
}

export default spPropertyBagActionsCreatorMap;
