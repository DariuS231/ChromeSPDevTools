import { PropertyActionID as actions } from './../constants/enums'
import { IProperty, IAction, ISpPropertyBagActionCreatorsMapObject } from '../interfaces/spPropertyBagInterfaces'
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux'
import SpPropertyBagApi from '../api/spPropertyBagApi'
import { IMessageData } from './../../common/interfaces'


const api = new SpPropertyBagApi();

const modifyProperty: ActionCreator<IAction<IProperty>> = (property: IProperty): IAction<IProperty> => {
    return {
        type: actions.UPDATE_PROPERTY,
        payload: property
    }
}
const removeProperty: ActionCreator<IAction<IProperty>> = (property: IProperty): IAction<IProperty> => {
    return {
        type: actions.DELETE_PROPERTY,
        payload: property
    }
}
const addProperty: ActionCreator<IAction<IProperty>> = (property: IProperty): IAction<IProperty> => {
    return {
        type: actions.CREATE_PROPERTY,
        payload: property
    }
}
const setAllProperties: ActionCreator<IAction<Array<IProperty>>> = (properties: Array<IProperty>): IAction<Array<IProperty>> => {
    return {
        type: actions.SET_ALL_PROPERTIES,
        payload: properties
    }
}
const setFilterText: ActionCreator<IAction<string>> = (filterText: string): IAction<string> => {
    return {
        type: actions.SET_FILTER_TEXT,
        payload: filterText
    }
}
const setWorkingOnIt: ActionCreator<IAction<boolean>> = (isWorkingOnIt: boolean): IAction<boolean> => {
    return {
        type: actions.SET_WORKING_ON_IT,
        payload: isWorkingOnIt
    }
}
const setUserHasPermissions: ActionCreator<IAction<boolean>> = (userHasPermission: boolean): IAction<boolean> => {
    return {
        type: actions.SET_USER_PERMISSIONS,
        payload: userHasPermission
    }
}
const setMessageData: ActionCreator<IAction<IMessageData>> = (messageData: IMessageData): IAction<IMessageData> => {
    return {
        type: actions.SET_USER_PERMISSIONS,
        payload: messageData
    }
}

const getAllProperties = () => {
    return function (dispatch: Dispatch<IAction<Array<IProperty>>>) {
        return api.getProperties().then(
            (properties: Array<IProperty>) => {
                dispatch(setAllProperties(properties));
            }
        );
    };
}

const createProperty = (property: IProperty) => {
    return function (dispatch: Dispatch<IAction<IProperty>>) {
        dispatch(setWorkingOnIt(true));
        return api.createProperty(property).then(
            (property: IProperty) => {
               //dispatch(addProperty(property));
               dispatch(getAllProperties());
            }
        );
    };
}

const updateProperty = (property: IProperty) => {
    return function (dispatch: Dispatch<IAction<IProperty>>) {
        dispatch(setWorkingOnIt(true));
        return api.updateProperty(property).then(
            (property: IProperty) => {
                //dispatch(addProperty(property));
               dispatch(getAllProperties());
            }
        );
    };
}

const deleteProperty = (property: IProperty) => {
    return function (dispatch: Dispatch<IAction<IProperty>>) {
        dispatch(setWorkingOnIt(true));
        return api.deleteProperty(property).then(
            (property: IProperty) => {
                //dispatch(addProperty(property));
               dispatch(getAllProperties());
            }
        );
    };
}

const spPropertyBagActionsCreatorMap: ISpPropertyBagActionCreatorsMapObject = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    setFilterText,
    setWorkingOnIt,
    setUserHasPermissions,
    setMessageData
}

export default spPropertyBagActionsCreatorMap;
