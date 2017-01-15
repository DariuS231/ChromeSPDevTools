
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

export interface IInitialState {
    isWorkingOnIt: boolean,
    userHasPermission: boolean,
    filterText: string,
    messageData: IMessageData,
    webProperties: Array<IProperty>,
}

export interface IPropertyBagActions {
    updateProperty: Function,
    deleteProperty: Function,
    getAllProperties: Function,
    setFilterText: Function,
    setWorkingOnIt: Function,
    setUserHasPermissions: Function,
    setMessageData: Function
}

export interface IMapDispatchToProps {
    actions:IPropertyBagActions 
}

export interface SpPropertyBagProps {
    closeWindowFunction: any,
    currentUserHasPermissions: boolean,
    isWorkingOnIt: boolean,
    webProperties: Array<IProperty>,
    messageData: IMessageData,
    filterText: string,
    getAllProperties: Function
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean,
    webProperties: Array<IProperty>,
    isWorkingOnIt: boolean,
    messageData: IMessageData,
    filterText: string
}
export interface IMapStateToPropsState {
    spPropertyBag: IInitialState
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