
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
    webProperties: Array<IProperty>
}

export interface IPropertyBagActions {
    createProperty: (property: IProperty) => IAction<string, IProperty>,
    updateProperty: (property: IProperty) => IAction<string, IProperty>,
    deleteProperty: (property: IProperty) => IAction<string, IProperty>,
    getAllProperties: () => Function,
    setAllProperties: (properties: Array<IProperty>) => IAction<string, Array<IProperty>>,
    setFilterText: (filterText: string) => IAction<string, string>,
    setWorkingOnIt: (isWorkingOnIt: boolean) => IAction<string, boolean>,
    setUserHasPermissions: (userHasPermissions: boolean) => IAction<string, boolean>,
    setMessageData: (messageData: IMessageData) => IAction<string, IMessageData>
}

export interface IMapDispatchToProps {
    actions: IPropertyBagActions
}

export interface SpPropertyBagProps {
    closeWindowFunction: any,
    currentUserHasPermissions: boolean,
    isWorkingOnIt: boolean,
    webProperties: Array<IProperty>,
    messageData: IMessageData,
    filterText: string,
    actions: IPropertyBagActions
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