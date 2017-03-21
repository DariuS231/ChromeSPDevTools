import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpCustomActionsApi from "../api/spCustomActionsApi";
import { ICustomAction, ISpCustomActionsActionCreatorsMapObject } from "../interfaces/spCustomActionsInterfaces";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";
import { CustomActionType } from "./../constants/enums";

const api = new SpCustomActionsApi();

const modifyCustomAction: ActionCreator<IAction<ICustomAction>> =
    (customAction: ICustomAction): IAction<ICustomAction> => {
        return {
            payload: customAction,
            type: actions.UPDATE_CUSTOM_ACTION
        };
    };
const removeCustomAction: ActionCreator<IAction<ICustomAction>> =
    (customAction: ICustomAction): IAction<ICustomAction> => {
        return {
            payload: customAction,
            type: actions.DELETE_CUSTOM_ACTION
        };
    };
const addCustomAction: ActionCreator<IAction<ICustomAction>> =
    (customAction: ICustomAction): IAction<ICustomAction> => {
        return {
            payload: customAction,
            type: actions.CREATE_CUSTOM_ACTION
        };
    };
const setAllProperties: ActionCreator<IAction<ICustomAction[]>> =
    (properties: ICustomAction[]): IAction<ICustomAction[]> => {
        return {
            payload: properties,
            type: actions.SET_ALL_CUSTOM_ACTIONS
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

const getAllCustomActions = (caType: CustomActionType) => {
    return (dispatch: Dispatch<IAction<ICustomAction[]>>) => {
        return api.getCustomActions(caType).then(
            (customActionsRet: ICustomAction[]) => {
                dispatch(setAllProperties(customActionsRet));
            }
        ).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_GET_ALL_CUSTOM_ACTIONS, reason));
        });
    };
};

const createCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return (dispatch: Dispatch<IAction<ICustomAction>>) => {
        dispatch(setWorkingOnIt(true));
        return api.createCustomAction(customAction, caType).then(
            (customActionRet: ICustomAction) => {
                dispatch(addCustomAction(customActionRet));
            }
        ).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_CREATE_CUSTOM_ACTION, reason));
        });
    };
};

const updateCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return (dispatch: Dispatch<IAction<ICustomAction>>) => {
        dispatch(setWorkingOnIt(true));
        return api.updateCustomAction(customAction, caType).then(
            (customActionRet: ICustomAction) => {
                dispatch(modifyCustomAction(customActionRet));
            }
        ).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_UPDATE_CUSTOM_ACTION, reason));
        });
    };
};

const deleteCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return (dispatch: Dispatch<IAction<ICustomAction>>) => {
        dispatch(setWorkingOnIt(true));
        return api.deleteCustomAction(customAction, caType).then(
            (customActionRet: ICustomAction) => {
                dispatch(removeCustomAction(customActionRet));
            }
        ).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_DELETE_CUSTOM_ACTION, reason));
        });
    };
};
const checkUserPermissions = (permissionKing: SP.PermissionKind, caType: CustomActionType) => {
    return (dispatch: Dispatch<IAction<ICustomAction>>) => {
        return api.checkUserPermissions(permissionKing).then(
            (hasPermissions: boolean) => {
                if (hasPermissions) {
                    dispatch(setUserHasPermissions(true));
                    dispatch(getAllCustomActions(caType));
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

const spCustomActionsActionsCreatorMap: ISpCustomActionsActionCreatorsMapObject = {
    createCustomAction,
    updateCustomAction,
    deleteCustomAction,
    getAllCustomActions,
    checkUserPermissions,
    setFilterText,
    setWorkingOnIt,
    setUserHasPermissions,
    setMessageData
};

export default spCustomActionsActionsCreatorMap;
