
import { ActionCreatorsMapObject } from 'redux'
import { ItemMode } from './../constants/enums'

export interface IProperty {
    key: string,
    value: string,
    itemMode: ItemMode
}

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

export interface IPropertyActions {
    updateProperty: Function,
    deleteProperty: Function,
    getAllProperties: Function
}

export interface IMapDispatchToProps {
    actions: IActions,
    propertyActions:IPropertyActions 
}

export interface IMapDispatchToPropsFilter {
    actions: IActions
}

export interface SpPropertyBagProps {
    closeWindowFunction: any,
    currentUserHasPermissions: boolean,
    isWorkingOnIt: boolean,
    webProperties: Array<IProperty>,
    messageData: IMessageData,
    filterText: string,
    actions: IActions,
    propertyActions:IPropertyActions 
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean,
    webProperties: Array<IProperty>,
    isWorkingOnIt: boolean,
    messageData: IMessageData,
    filterText: string
}
export interface IMapStateToPropsState {
    window: IWindowsState,
    properties: Array<IProperty>
}

export interface IOwnProps {
    closeWindowFunction: Function
}


export interface IMapStateToProps {
    currentUserHasPermissions: boolean,
    webProperties: Array<IProperty>,
    isWorkingOnIt: boolean,
    messageData: IMessageData,
    filterText: string
}
export interface IMapStateToPropsState {
    window: IWindowsState,
    properties: Array<IProperty>
}