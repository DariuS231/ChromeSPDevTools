import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpCustomActionsApi from "../api/spCustomActionsApi";
import { ICustomAction, ISpCustomActionsActionCreatorsMapObject } from "../interfaces/spCustomActionsInterfaces";
import { ActionFactory } from "./../../common/actionFactory";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";
import { CustomActionType } from "./../constants/enums";

const api = new SpCustomActionsApi();

const modifyCustomAction = ActionFactory<ICustomAction>(actions.UPDATE_CUSTOM_ACTION);
const removeCustomAction = ActionFactory<ICustomAction>(actions.DELETE_CUSTOM_ACTION);
const addCustomAction = ActionFactory<ICustomAction>(actions.CREATE_CUSTOM_ACTION);
const setAllProperties = ActionFactory<ICustomAction[]>(actions.SET_ALL_CUSTOM_ACTIONS);
const setFilterText = ActionFactory<string>(actions.SET_FILTER_TEXT);
const setWorkingOnIt = ActionFactory<boolean>(actions.SET_WORKING_ON_IT);
const setUserHasPermissions = ActionFactory<boolean>(actions.SET_USER_PERMISSIONS);
const setMessageData = ActionFactory<IMessageData>(actions.SET_MESSAGE_DATA);

const getAllCustomActions = (caType: CustomActionType) => {
    return async (dispatch: Dispatch<IAction<ICustomAction[]>>) => {
        try {
            const customActionsRet: ICustomAction[] = await api.getCustomActions(caType);
            dispatch(setAllProperties(customActionsRet));
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_GET_ALL_CUSTOM_ACTIONS,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const createCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return async (dispatch: Dispatch<IAction<ICustomAction>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const customActionRet: ICustomAction = await api.createCustomAction(customAction, caType);
            dispatch(addCustomAction(customActionRet));
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_CREATE_CUSTOM_ACTION,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const updateCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return async (dispatch: Dispatch<IAction<ICustomAction>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const customActionRet: ICustomAction = await api.updateCustomAction(customAction, caType);
            dispatch(modifyCustomAction(customActionRet));
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_UPDATE_CUSTOM_ACTION,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const deleteCustomAction = (customAction: ICustomAction, caType: CustomActionType) => {
    return async (dispatch: Dispatch<IAction<ICustomAction>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const customActionRet: ICustomAction = await api.deleteCustomAction(customAction, caType);
            dispatch(removeCustomAction(customActionRet));
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_DELETE_CUSTOM_ACTION,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const checkUserPermissions = (permissionKing: SP.PermissionKind, caType: CustomActionType) => {
    return async (dispatch: Dispatch<IAction<ICustomAction>>) => {
        try {

            const hasPermissions: boolean = await api.checkUserPermissions(permissionKing);
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
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_CHECK_USER_PERMISSIONS,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
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
