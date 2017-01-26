
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux'
import { IMessageData, IAction } from './../../common/interfaces'
import { ViewMode } from './../../common/enums';
import { CustomActionType } from './../constants/enums';

export interface ICustomAction {
    name: string,
    description: string,
    id: string,
    title: string,
    group:string,
    registrationType: number,
    scriptSrc: string,
    scriptBlock: string,
    location: string,
    locationInternal: string,
    sequence: number,
    imageUrl: string,
    url: string,
    [key: string]: any //To allow index references with ICustomAction objects 
}

export interface IInitialState {
    isWorkingOnIt: boolean,
    userHasPermission: boolean,
    filterText: string,
    messageData: IMessageData,
    customActions: Array<ICustomAction>
}

export interface ISpCustomActionsActionCreatorsMapObject extends ActionCreatorsMapObject {
    createCustomAction: (customAction: ICustomAction, caType: CustomActionType) => (dispatch: Dispatch<IAction<ICustomAction>>) => Promise<void>,
    updateCustomAction: (customAction: ICustomAction, caType: CustomActionType) => (dispatch: Dispatch<IAction<ICustomAction>>) => Promise<void>,
    deleteCustomAction: (customAction: ICustomAction, caType: CustomActionType) => (dispatch: Dispatch<IAction<ICustomAction>>) => Promise<void>,
    getAllCustomActions: (caType: CustomActionType) => (dispatch: Dispatch<IAction<Array<ICustomAction>>>) => Promise<void>,
    checkUserPermissions: (permissionKing: SP.PermissionKind, caType: CustomActionType) => (dispatch: Dispatch<IAction<Array<ICustomAction>>>) => Promise<void>,
    setFilterText: ActionCreator<IAction<string>>,
    setWorkingOnIt: ActionCreator<IAction<boolean>>,
    setUserHasPermissions: ActionCreator<IAction<boolean>>,
    setMessageData: ActionCreator<IAction<IMessageData>>

}

export interface IMapDispatchToProps {
    actions: ISpCustomActionsActionCreatorsMapObject
}

export interface SpCustomActionsProps {
    closeWindowFunction: any,
    currentUserHasPermissions: boolean,
    isWorkingOnIt: boolean,
    customActions: Array<ICustomAction>,
    messageData: IMessageData,
    filterText: string,
    customActionType:CustomActionType,
    actions: ISpCustomActionsActionCreatorsMapObject
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean,
    customActions: Array<ICustomAction>,
    isWorkingOnIt: boolean,
    messageData: IMessageData,
    filterText: string
}
export interface IMapStateToPropsState {
    spCustomActions: IInitialState
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean,
    customActions: Array<ICustomAction>,
    isWorkingOnIt: boolean,
    messageData: IMessageData,
    filterText: string
}