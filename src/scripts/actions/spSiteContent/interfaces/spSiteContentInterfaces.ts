import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import { IAction, IMessageData } from "./../../common/interfaces";

export interface ISiteContent {
    id: string;
    title: string;
    description: string;
    hidden: boolean;
    itemCount: number;
    imageUrl: string;
    created: any;
    lastModified: any;
    listUrl: string;
    settingsUrl: string;
    newFormUrl: string;
    permissionsPageUrl: string;
}

export interface IInitialState {
    isWorkingOnIt: boolean;
    siteLists: ISiteContent[];
    messageData: IMessageData;
    showAll: boolean;
    openInNewTab: boolean;
    filterText: string;
}

export interface ISpSiteContentActionCreatorsMapObject extends ActionCreatorsMapObject {
    getAllSiteContent: () => (dispatch: Dispatch<IAction<ISiteContent[]>>) => Promise<void>;
    setShowAll: ActionCreator<IAction<boolean>>;
    setOpenInNewWindow: ActionCreator<IAction<boolean>>;
    setFilter: ActionCreator<IAction<string>>;
}

export interface IMapDispatchToProps {
    actions: ISpSiteContentActionCreatorsMapObject;
}

export interface ISpSiteContentProps {
    isWorkingOnIt: boolean;
    siteLists: ISiteContent[];
    messageData: IMessageData;
    showAll: boolean;
    openInNewTab: boolean;
    filterText: string;
    actions: ISpSiteContentActionCreatorsMapObject;
}

export interface IMapStateToProps {
    isWorkingOnIt: boolean;
    siteLists: ISiteContent[];
    messageData: IMessageData;
    showAll: boolean;
    openInNewTab: boolean;
    filterText: string;
}
export interface IMapStateToPropsState {
    spSiteContent: IInitialState;
}

export interface IMapStateToProps {
    isWorkingOnIt: boolean;
    siteLists: ISiteContent[];
    messageData: IMessageData;
    showAll: boolean;
    openInNewTab: boolean;
    filterText: string;
}
