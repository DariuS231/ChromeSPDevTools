
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux'
import { IMessageData, IAction } from './../../common/interfaces'

export interface IProperty {
    key: string,
    value: string
}


export interface IInitialState {
    isWorkingOnIt: boolean,
    userHasPermission: boolean,
    filterText: string,
    messageData: IMessageData,
    webProperties: Array<IProperty>
}

export interface ISpPropertyBagActionCreatorsMapObject extends ActionCreatorsMapObject {
    createProperty: (property: IProperty) => (dispatch: Dispatch<IAction<IProperty>>) => Promise<void>,
    updateProperty: (property: IProperty) => (dispatch: Dispatch<IAction<IProperty>>) => Promise<void>,
    deleteProperty: (property: IProperty) => (dispatch: Dispatch<IAction<IProperty>>) => Promise<void>,
    getAllProperties: () => (dispatch: Dispatch<IAction<Array<IProperty>>>) => Promise<void>,
    checkUserPermissions: (permissionKing: SP.PermissionKind) => (dispatch: Dispatch<IAction<Array<IProperty>>>) => Promise<void>,
    setFilterText: ActionCreator<IAction<string>>,
    setWorkingOnIt: ActionCreator<IAction<boolean>>,
    setUserHasPermissions: ActionCreator<IAction<boolean>>,
    setMessageData: ActionCreator<IAction<IMessageData>>

}

export interface IMapDispatchToProps {
    actions: ISpPropertyBagActionCreatorsMapObject
}

export interface SpPropertyBagProps {
    closeWindowFunction: any,
    currentUserHasPermissions: boolean,
    isWorkingOnIt: boolean,
    webProperties: Array<IProperty>,
    messageData: IMessageData,
    filterText: string,
    actions: ISpPropertyBagActionCreatorsMapObject
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

export interface IMapStateToProps {
    currentUserHasPermissions: boolean,
    webProperties: Array<IProperty>,
    isWorkingOnIt: boolean,
    messageData: IMessageData,
    filterText: string
}