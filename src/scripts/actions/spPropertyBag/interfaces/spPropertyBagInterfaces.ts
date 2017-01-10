
import { ActionCreatorsMapObject } from 'redux'

export interface IAction<T, P> {
    readonly type: T
    readonly payload: P
}

export interface IWindowsState {
    isWorkingOnIt: boolean,
    userHasPermission: boolean,
    filterText: string,
    messageData: IMessageData
}

export interface IActions {
    setFilterText: Function,
    setWorkingOnIt: Function,
    setUserHasPermissions: Function,
    setMessageData: Function
}

export interface IMapDispatchToProps {
    actions: IActions
}

export interface SpPropertyBagProps {
    closeWindowFunction: any,
    currentUserHasPermissions: boolean,
    isWorkingOnIt: boolean,
    webProperties: Array<IKeyValue>,
    messageData: IMessageData,
    filterText: string,
    actions: IActions
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean,
    webProperties: Array<IKeyValue>,
    isWorkingOnIt: boolean,
    messageData: IMessageData,
    filterText: string
}
export interface IMapStateToPropsState {
    window: IWindowsState,
    properties: Array<IKeyValue>
}

export interface IOwnProps {
    closeWindowFunction: Function
}


export interface IMapStateToProps {
    currentUserHasPermissions: boolean,
    webProperties: Array<IKeyValue>,
    isWorkingOnIt: boolean,
    messageData: IMessageData,
    filterText: string
}
export interface IMapStateToPropsState {
    window: IWindowsState,
    properties: Array<IKeyValue>
}