import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import { IAction, IMessageData } from "./../../common/interfaces";

export interface IProperty {
    isFavourite: boolean;
    key: string;
    value: string;
}

export interface IInitialState {
    isWorkingOnIt: boolean;
    userHasPermission: boolean;
    filterText: string;
    messageData: IMessageData;
    webProperties: IProperty[];
}

export interface ISpPropertyBagActionCreatorsMapObject extends ActionCreatorsMapObject {
    createProperty: (property: IProperty) => (dispatch: Dispatch<IAction<IProperty>>) => Promise<void>;
    updateProperty: (property: IProperty) => (dispatch: Dispatch<IAction<IProperty>>) => Promise<void>;
    deleteProperty: (property: IProperty) => (dispatch: Dispatch<IAction<IProperty>>) => Promise<void>;
    getAllProperties: () => (dispatch: Dispatch<IAction<IProperty[]>>) => Promise<void>;
    checkUserPermissions: (permissionKing: SP.PermissionKind) =>
        (dispatch: Dispatch<IAction<IProperty[]>>) => Promise<void>;
    setFavourite: ActionCreator<IAction<IProperty>>;
    setFilterText: ActionCreator<IAction<string>>;
    setWorkingOnIt: ActionCreator<IAction<boolean>>;
    setUserHasPermissions: ActionCreator<IAction<boolean>>;
    setMessageData: ActionCreator<IAction<IMessageData>>;

}

export interface IMapDispatchToProps {
    actions: ISpPropertyBagActionCreatorsMapObject;
}

export interface ISpPropertyBagProps {
    closeWindowFunction: any;
    currentUserHasPermissions: boolean;
    isWorkingOnIt: boolean;
    webProperties: IProperty[];
    messageData: IMessageData;
    filterText: string;
    actions: ISpPropertyBagActionCreatorsMapObject;
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean;
    webProperties: IProperty[];
    isWorkingOnIt: boolean;
    messageData: IMessageData;
    filterText: string;
}
export interface IMapStateToPropsState {
    spPropertyBag: IInitialState;
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean;
    webProperties: IProperty[];
    isWorkingOnIt: boolean;
    messageData: IMessageData;
    filterText: string;
}
