
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import { IAction, IMessageData } from "./../../common/interfaces";
import { CustomActionType } from "./../constants/enums";

export interface ICustomAction {
    name: string;
    description: string;
    id: string;
    title: string;
    group: string;
    registrationType: number;
    scriptSrc: string;
    scriptBlock: string;
    location: string;
    sequence: number;
    imageUrl: string;
    url: string;
    [key: string]: any; // To allow index references with ICustomAction objects
}

export interface IInitialState {
    isWorkingOnIt: boolean;
    userHasPermission: boolean;
    filterText: string;
    messageData: IMessageData;
    customActions: ICustomAction[];
    customActionType: CustomActionType;
}

export interface ISpCustomActionsActionCreatorsMapObject extends ActionCreatorsMapObject {
    createCustomAction: (customAction: ICustomAction, caType: CustomActionType) =>
        (dispatch: Dispatch<IAction<ICustomAction>>) => Promise<void>;
    updateCustomAction: (customAction: ICustomAction, caType: CustomActionType) =>
        (dispatch: Dispatch<IAction<ICustomAction>>) => Promise<void>;
    deleteCustomAction: (customAction: ICustomAction, caType: CustomActionType) =>
        (dispatch: Dispatch<IAction<ICustomAction>>) => Promise<void>;
    getAllCustomActions: (caType: CustomActionType) =>
        (dispatch: Dispatch<IAction<ICustomAction[]>>) => Promise<void>;
    checkUserPermissions: (permissionKing: SP.PermissionKind, caType: CustomActionType) =>
        (dispatch: Dispatch<IAction<ICustomAction[]>>) => Promise<void>;
    setFilterText: ActionCreator<IAction<string>>;
    setWorkingOnIt: ActionCreator<IAction<boolean>>;
    setUserHasPermissions: ActionCreator<IAction<boolean>>;
    setMessageData: ActionCreator<IAction<IMessageData>>;
}

export interface IMapDispatchToProps {
    actions: ISpCustomActionsActionCreatorsMapObject;
}

export interface ISpCustomActionsProps {
    currentUserHasPermissions: boolean;
    isWorkingOnIt: boolean;
    customActions: ICustomAction[];
    messageData: IMessageData;
    filterText: string;
    customActionType: CustomActionType;
    actions: ISpCustomActionsActionCreatorsMapObject;
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean;
    customActions: ICustomAction[];
    isWorkingOnIt: boolean;
    messageData: IMessageData;
    filterText: string;
    customActionType: CustomActionType;
}
export interface IMapStateToPropsState {
    spCustomActionsReducer: IInitialState;
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean;
    customActions: ICustomAction[];
    isWorkingOnIt: boolean;
    messageData: IMessageData;
    filterText: string;
    customActionType: CustomActionType;
}
