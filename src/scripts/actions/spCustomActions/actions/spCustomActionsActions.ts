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

const getAllCustomActions = (caType: CustomActionType) => {
    return (dispatch: Dispatch<IAction<ICustomAction[]>>) => {
        return api.getCustomActions(caType).then(
            (customActionsRet: ICustomAction[]) => {
                dispatch(setAllProperties(customActionsRet));
            }
        );
    };
};

const createCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return (dispatch: Dispatch<IAction<ICustomAction>>) => {
        dispatch(setWorkingOnIt(true));
        return api.createCustomAction(customAction, caType).then(
            (customActionRet: ICustomAction) => {
                dispatch(addCustomAction(customActionRet));
            }
        );
    };
};

const updateCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return (dispatch: Dispatch<IAction<ICustomAction>>) => {
        dispatch(setWorkingOnIt(true));
        return api.updateCustomAction(customAction, caType).then(
            (customActionRet: ICustomAction) => {
                dispatch(modifyCustomAction(customActionRet));
            }
        );
    };
};

const deleteCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return (dispatch: Dispatch<IAction<ICustomAction>>) => {
        dispatch(setWorkingOnIt(true));
        return api.deleteCustomAction(customAction, caType).then(
            (customActionRet: ICustomAction) => {
                dispatch(removeCustomAction(customActionRet));
            }
        );
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
        );
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
