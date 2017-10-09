import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import { IAction, IMessageData } from "./../../common/interfaces";

export interface ISiteContent {
    id: string;
    title: string;
    description: string;
    hidden: boolean;
    itemCount: number;
    imageUrl: string;
    isFavourite: boolean;
    created: Date;
    lastModified: Date;
    listUrl: string;
    settingsUrl: string;
    newFormUrl: string;
    permissionsPageUrl: string;
    reIndexUrl: string;
    enableAttachments: boolean;
    baseTemplate: number;
    baseType: number;
    noCrawl: boolean;
    userCanAddItems: boolean;
    userCanManageList: boolean;
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
    setFavourite: ActionCreator<IAction<ISiteContent>>;
    setFilter: ActionCreator<IAction<string>>;
    // tslint:disable-next-line:max-line-length
    setListVisibility: (item: ISiteContent) => (dispatch: Dispatch<IAction<ISiteContent[]>>) => Promise<void>;
    reIndexList: (item: ISiteContent) => (dispatch: Dispatch<IAction<ISiteContent[]>>) => Promise<void>;
    setListNoCrawl: (item: ISiteContent) => (dispatch: Dispatch<IAction<ISiteContent[]>>) => Promise<void>;
    setListAttachments: (item: ISiteContent) => (dispatch: Dispatch<IAction<ISiteContent[]>>) => Promise<void>;
    setMessageData: ActionCreator<IAction<IMessageData>>;
    recycleList: (item: ISiteContent) => (dispatch: Dispatch<IAction<ISiteContent[]>>) => Promise<void>;
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

export interface IAllContentAndMessage {
    siteContent: ISiteContent[];
    messageData: IMessageData;
}
