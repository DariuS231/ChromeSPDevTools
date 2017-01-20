
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux'
import { IMessageData } from './../../common/interfaces'

export interface ICustomAction {
    name: any,
    description: any,
    id: any,
    title: any,
    registrationType: any,
    scriptSrc: any,
    scriptBlock: any,
    location: any,
    locationInternal: string,
    sequence: any,
    [key: string]: string //To allow index references with ICustomAction objects 
}

export interface IAction<T> {
    readonly type: string
    readonly payload: T
}

export interface IInitialState {
    isWorkingOnIt: boolean,
    userHasPermission: boolean,
    filterText: string,
    messageData: IMessageData,
    customActions: Array<ICustomAction>
}

export interface ISpCustomActionsActionCreatorsMapObject extends ActionCreatorsMapObject {
    createCustomAction: (customAction: ICustomAction) => (dispatch: Dispatch<IAction<ICustomAction>>) => Promise<void>,
    updateCustomAction: (customAction: ICustomAction) => (dispatch: Dispatch<IAction<ICustomAction>>) => Promise<void>,
    deleteCustomAction: (customAction: ICustomAction) => (dispatch: Dispatch<IAction<ICustomAction>>) => Promise<void>,
    getAllCustomActions: () => (dispatch: Dispatch<IAction<Array<ICustomAction>>>) => Promise<void>,
    checkUserPermissions: (permissionKing: SP.PermissionKind) => (dispatch: Dispatch<IAction<Array<ICustomAction>>>) => Promise<void>,
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