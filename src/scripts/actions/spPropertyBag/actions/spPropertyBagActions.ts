
import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpPropertyBagApi from "../api/spPropertyBagApi";
import { IProperty, ISpPropertyBagActionCreatorsMapObject } from "../interfaces/spPropertyBagInterfaces";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";

const api = new SpPropertyBagApi();

const modifyProperty: ActionCreator<IAction<IProperty>> = (property: IProperty): IAction<IProperty> => {
    return {
        payload: property,
        type: actions.UPDATE_PROPERTY
    };
};
const removeProperty: ActionCreator<IAction<IProperty>> = (property: IProperty): IAction<IProperty> => {
    return {

        payload: property,
        type: actions.DELETE_PROPERTY
    };
};
const addProperty: ActionCreator<IAction<IProperty>> = (property: IProperty): IAction<IProperty> => {
    return {
        payload: property,
        type: actions.CREATE_PROPERTY
    };
};
const setAllProperties: ActionCreator<IAction<IProperty[]>> = (properties: IProperty[]): IAction<IProperty[]> => {
    return {

        payload: properties,
        type: actions.SET_ALL_PROPERTIES
    };
};
const setFilterText: ActionCreator<IAction<string>> = (filterText: string): IAction<string> => {
    return {
        payload: filterText,
        type: actions.SET_FILTER_TEXT
    };
};
const setWorkingOnIt: ActionCreator<IAction<boolean>> = (isWorkingOnIt: boolean): IAction<boolean> => {
    return {
        payload: isWorkingOnIt,
        type: actions.SET_WORKING_ON_IT
    };
};
const setUserHasPermissions: ActionCreator<IAction<boolean>> = (userHasPermission: boolean): IAction<boolean> => {
    return {
        payload: userHasPermission,
        type: actions.SET_USER_PERMISSIONS
    };
};
const setMessageData: ActionCreator<IAction<IMessageData>> = (messageData: IMessageData): IAction<IMessageData> => {
    return {
        payload: messageData,
        type: actions.SET_MESSAGE_DATA
    };
};
const handleAsyncError: ActionCreator<IAction<IMessageData>> =
    (errorMessage: string, exceptionMessage: string): IAction<IMessageData> => {
        // tslint:disable-next-line:no-console
        console.log(exceptionMessage);
        return {
            payload: {
                message: errorMessage,
                showMessage: true,
                type: MessageBarType.error
            },
            type: actions.HANDLE_ASYNC_ERROR
        };
    };
const getAllProperties = () => {
    return (dispatch: Dispatch<IAction<IProperty[]>>) => {
        return api.getProperties().then((properties: IProperty[]) => {
            dispatch(setAllProperties(properties));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_GET_ALL_PROPERTIES, reason));
        });
    };
};

const createProperty = (property: IProperty) => {
    return (dispatch: Dispatch<IAction<IProperty>>) => {
        dispatch(setWorkingOnIt(true));
        return api.createProperty(property).then((retProperty: IProperty) => {
            dispatch(addProperty(retProperty));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_CREATE_PROPERTY, reason));
        });
    };
};

const updateProperty = (property: IProperty) => {
    return (dispatch: Dispatch<IAction<IProperty>>) => {
        dispatch(setWorkingOnIt(true));
        return api.updateProperty(property).then((retProperty: IProperty) => {
            dispatch(modifyProperty(retProperty));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_UPDATE_PROPERTY, reason));
        });
    };
};

const deleteProperty = (property: IProperty) => {
    return (dispatch: Dispatch<IAction<IProperty>>) => {
        dispatch(setWorkingOnIt(true));
        return api.deleteProperty(property).then((retProperty: IProperty) => {
            dispatch(removeProperty(retProperty));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_DELETE_PROPERTY, reason));
        });
    };
};
const checkUserPermissions = (permissionKing: SP.PermissionKind) => {
    return (dispatch: Dispatch<IAction<IProperty>>) => {
        return api.checkUserPermissions(permissionKing).then(
            (hasPermissions: boolean) => {
                if (hasPermissions) {
                    dispatch(setUserHasPermissions(true));
                    dispatch(getAllProperties());
                } else {
                    dispatch(setWorkingOnIt(false));
                    dispatch(setMessageData({
                        message: constants.MESSAGE_USER_NO_PERMISSIONS,
                        showMessage: true,
                        type: MessageBarType.error
                    }));
                }
            }
        ).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_CHECK_USER_PERMISSIONS, reason));
        });
    };
};

const spPropertyBagActionsCreatorMap: ISpPropertyBagActionCreatorsMapObject = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    checkUserPermissions,
    setFilterText,
    setWorkingOnIt,
    setUserHasPermissions,
    setMessageData
};

export default spPropertyBagActionsCreatorMap;
