
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import { FeatureScope } from "../constants/enums";
import { IAction, IMessageData } from "./../../common/interfaces";

export interface IFeature {
    id: string;
    name: string;
    description: string;
    activated: boolean;
    scope: FeatureScope;
    logo: string;
}

export interface IInitialState {
    isWorkingOnIt: boolean;
    userHasPermission: boolean;
    filterText: string;
    messageData: IMessageData;
    webFeatures: IFeature[];
    siteFeatures: IFeature[];
}

export interface ISpFeaturesActionCreatorsMapObject extends ActionCreatorsMapObject {
    activateFeature: (feature: IFeature) => (dispatch: Dispatch<IAction<IFeature>>) => Promise<void>;
    deActivateFeature: (feature: IFeature) => (dispatch: Dispatch<IAction<IFeature>>) => Promise<void>;
    checkUserPermissions: (permissionKing: SP.PermissionKind) =>
        (dispatch: Dispatch<IAction<IFeature[]>>) => Promise<void>;
    setFilterText: ActionCreator<IAction<string>>;
    setWorkingOnIt: ActionCreator<IAction<boolean>>;
    setNoPermissions: ActionCreator<IAction<boolean>>;
    setMessageData: ActionCreator<IAction<IMessageData>>;
}

export interface IMapDispatchToProps {
    actions: ISpFeaturesActionCreatorsMapObject;
}

export interface ISpFeaturesProps {
    currentUserHasPermissions: boolean;
    isWorkingOnIt: boolean;
    webFeatures: IFeature[];
    siteFeatures: IFeature[];
    messageData: IMessageData;
    filterText: string;
    actions: ISpFeaturesActionCreatorsMapObject;
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean;
    webFeatures: IFeature[];
    siteFeatures: IFeature[];
    isWorkingOnIt: boolean;
    messageData: IMessageData;
    filterText: string;
}
export interface IMapStateToPropsState {
    spFeatures: IInitialState;
}

export interface IMapStateToProps {
    currentUserHasPermissions: boolean;
    webFeatures: IFeature[];
    siteFeatures: IFeature[];
    isWorkingOnIt: boolean;
    messageData: IMessageData;
    filterText: string;
}
