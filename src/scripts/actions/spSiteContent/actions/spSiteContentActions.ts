import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpSiteContentApi from "../api/spSiteContentApi";
import { Favourites } from "../helpers/favourites"
import {
    IAllContentAndMessage,
    ISiteContent,
    ISpSiteContentActionCreatorsMapObject
} from "../interfaces/spSiteContentInterfaces";
import { ActionFactory } from "./../../common/actionFactory";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, SpSiteContentConstants as constants } from "./../constants/spSiteContentConstants";

const api: SpSiteContentApi = new SpSiteContentApi();

const setAllSiteContent = ActionFactory<ISiteContent[]>(actions.SET_SITE_CONTENT);
const setFilter = ActionFactory<string>(actions.SET_TEXT_FILTER);
const setMessageData = ActionFactory<IMessageData>(actions.SET_MESSAGE_DATA);
const setShowAll = ActionFactory<boolean>(actions.SET_SHOW_ALL);
const setWorkingOnIt = ActionFactory<boolean>(actions.SET_WORKING_ON_IT);
const setOpenInNewWindow = ActionFactory<boolean>(actions.SET_OPEN_IN_NEW_TAB);

const setAllSiteContentAndMessage: ActionCreator<IAction<IAllContentAndMessage>> =
    (siteContent: ISiteContent[], messageData: IMessageData): IAction<IAllContentAndMessage> => {
        return {
            payload: {
                messageData,
                siteContent
            },
            type: actions.SET_SITE_CONTENT_AND_MESSAGE
        };
    };

const getAllSiteContent = (messageData?: IMessageData) => {
    return async (dispatch: Dispatch<IAction<ISiteContent[]>>) => {
        try {
            const siteContent: ISiteContent[] = await api.getLists();
            if (typeof messageData !== "undefined") {
                dispatch(setAllSiteContentAndMessage(siteContent, messageData));
            } else {
                dispatch(setAllSiteContent(siteContent));
            }
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_GET_ALL_SITE_CONTENT,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};
const setFavourite = (item: ISiteContent) => {
    const { isFavourite, id } = item;
    !isFavourite ? Favourites.addToFavourites(id) : Favourites.removeFromFavourites(id);

    return {
        payload: { ...item, isFavourite: !isFavourite },
        type: actions.SET_FAVOURITE
    };
};

const setListVisibility = (item: ISiteContent) => {
    return async (dispatch: Dispatch<IAction<ISiteContent>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const result = await api.setListVisibility(item);
            if (result) {
                const msg = `The List ${item.title} is now ${(!item.hidden ? "Hidden" : "visible")}.`;
                const messageData = {
                    message: msg,
                    showMessage: true,
                    type: MessageBarType.success
                } as IMessageData;
                dispatch(getAllSiteContent(messageData));
            } else {
                throw new Error("Error setListVisibility returned false");
            }
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_SET_LIST_VISIBILITY,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const setListAttachments = (item: ISiteContent) => {
    return async (dispatch: Dispatch<IAction<ISiteContent>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const result = await api.setAttachments(item);
            if (result) {
                const msg = `Users ${(!item.enableAttachments ? "CAN" : "CAN NOT")}
                 attach files to items in this list ${item.title}.`;
                const messageData = {
                    message: msg,
                    showMessage: true,
                    type: MessageBarType.success
                } as IMessageData;
                dispatch(getAllSiteContent(messageData));
            } else {
                throw new Error("Error setAttachments returned false");
            }
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_SET_LIST_ATTACHMENTS_ENABLE,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const recycleList = (item: ISiteContent) => {
    return async (dispatch: Dispatch<IAction<ISiteContent>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const result = await api.recycleList(item);
            if (result) {
                const msg = `The List ${item.title} has been deleted.`;
                const messageData = {
                    message: msg,
                    showMessage: true,
                    type: MessageBarType.success
                } as IMessageData;
                dispatch(getAllSiteContent(messageData));
            } else {
                throw new Error("Error recycleList returned false");
            }
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_SET_LIST_NO_CRAWL,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const setListNoCrawl = (item: ISiteContent) => {
    return async (dispatch: Dispatch<IAction<ISiteContent>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const result = await api.setNoCrawl(item);
            if (result) {
                const msg = `The items in ${item.title} will ${(!item.noCrawl ? "NOT" : "NOW")}
                 be visible in search results.`;
                const messageData = {
                    message: msg,
                    showMessage: true,
                    type: MessageBarType.success
                } as IMessageData;
                dispatch(getAllSiteContent(messageData));
            } else {
                throw new Error("Error recycleList returned false");
            }
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_SET_LIST_NO_CRAWL,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const reIndexList = (item: ISiteContent) => {
    return async (dispatch: Dispatch<IAction<ISiteContent>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const dialogResult: SP.UI.DialogResult = await api.reIndex(item);
            if (dialogResult === SP.UI.DialogResult.OK) {
                dispatch(setMessageData({
                    message: "The request has been sent, patience my young padawan...",
                    showMessage: true,
                    type: MessageBarType.success
                } as IMessageData));
            }
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_REINDEX_LIST,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const spSiteContentActionsCreatorMap: ISpSiteContentActionCreatorsMapObject = {
    getAllSiteContent,
    setShowAll,
    setOpenInNewWindow,
    setFavourite,
    setFilter,
    setListVisibility,
    setMessageData,
    reIndexList,
    setListNoCrawl,
    setListAttachments,
    recycleList
};

export default spSiteContentActionsCreatorMap;
