import { ActionsId as actions, constants } from './../constants/constants'
import { ICustomAction, IAction, ISpCustomActionsActionCreatorsMapObject } from '../interfaces/spCustomActionsInterfaces'
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import SpCustomActionsApi from '../api/spCustomActionsApi'
import { IMessageData } from './../../common/interfaces'
import { CustomActionType } from './../constants/enums';


const api = new SpCustomActionsApi();

const modifyCustomAction: ActionCreator<IAction<ICustomAction>> = (customAction: ICustomAction): IAction<ICustomAction> => {
    return {
        type: actions.UPDATE_CUSTOM_ACTION,
        payload: customAction
    }
}
const removeCustomAction: ActionCreator<IAction<ICustomAction>> = (customAction: ICustomAction): IAction<ICustomAction> => {
    return {
        type: actions.DELETE_CUSTOM_ACTION,
        payload: customAction
    }
}
const addCustomAction: ActionCreator<IAction<ICustomAction>> = (customAction: ICustomAction): IAction<ICustomAction> => {
    return {
        type: actions.CREATE_CUSTOM_ACTION,
        payload: customAction
    }
}
const setAllProperties: ActionCreator<IAction<Array<ICustomAction>>> = (properties: Array<ICustomAction>): IAction<Array<ICustomAction>> => {
    return {
        type: actions.SET_ALL_CUSTOM_ACTIONS,
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
        type: actions.SET_MESSAGE_DATA,
        payload: messageData
    }
}

const getAllCustomActions = (caType: CustomActionType) => {
    return function (dispatch: Dispatch<IAction<Array<ICustomAction>>>) {
        return api.getCustomActions(caType).then(
            (properties: Array<ICustomAction>) => {
                dispatch(setAllProperties(properties));
            }
        );
    };
}

const createCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return function (dispatch: Dispatch<IAction<ICustomAction>>) {
        dispatch(setWorkingOnIt(true));
        return api.createCustomAction(customAction, caType).then(
            (customAction: ICustomAction) => {
                dispatch(addCustomAction(customAction));
            }
        );
    };
}

const updateCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return function (dispatch: Dispatch<IAction<ICustomAction>>) {
        dispatch(setWorkingOnIt(true));
        return api.updateCustomAction(customAction, caType).then(
            (customAction: ICustomAction) => {
                dispatch(modifyCustomAction(customAction));
            }
        );
    };
}

const deleteCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return function (dispatch: Dispatch<IAction<ICustomAction>>) {
        dispatch(setWorkingOnIt(true));
        return api.deleteCustomAction(customAction, caType).then(
            (customAction: ICustomAction) => {
                dispatch(removeCustomAction(customAction));
            }
        );
    };
}
const checkUserPermissions = (permissionKing: SP.PermissionKind,caType: CustomActionType) => {
    return function (dispatch: Dispatch<IAction<ICustomAction>>) {
        return api.checkUserPermissions(permissionKing).then(
            (hasPermissions: boolean) => {
                if (hasPermissions) {
                    dispatch(setUserHasPermissions(true));
                    dispatch(getAllCustomActions(caType));
                } else {
                    dispatch(setWorkingOnIt(false));
                    dispatch(setMessageData({
                        showMessage: true,
                        message: constants.MESSAGE_USER_NO_PERMISSIONS,
                        type: MessageBarType.error
                    }));
                }
            }
        );
    };
}

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
}

export default spCustomActionsActionsCreatorMap;
