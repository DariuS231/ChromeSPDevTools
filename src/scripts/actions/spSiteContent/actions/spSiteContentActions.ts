import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpSiteContentApi from "../api/spSiteContentApi";
// tslint:disable-next-line:max-line-length
import { IAllContentAndMessage, ISiteContent, ISpSiteContentActionCreatorsMapObject } from "../interfaces/spSiteContentInterfaces";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, SpSiteContentConstants as constants } from "./../constants/spSiteContentConstants";

const api: SpSiteContentApi = new SpSiteContentApi();



const setAllSiteContent: ActionCreator<IAction<ISiteContent[]>> =
    (siteContent: ISiteContent[]): IAction<ISiteContent[]> => {
        return {
            payload: siteContent,
            type: actions.SET_SITE_CONTENT
        };
    };


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

const handleAsyncError: ActionCreator<IAction<IMessageData>> =
    (errorMessage: string, exceptionMessage: string): IAction<IMessageData> => {
        // tslint:disable-next-line:no-console
        console.log(exceptionMessage);
        return {
            payload: {
                message: errorMessage,
                showMessage: true,
                type: MessageBarType.error
            },
            type: actions.HANDLE_ASYNC_ERROR
        };
    };

const getAllSiteContent = (messageData?: IMessageData) => {
    return (dispatch: Dispatch<IAction<ISiteContent[]>>) => {
        return api.getLists().then((siteContent: ISiteContent[]) => {
            if (typeof messageData !== "undefined") {
                dispatch(setAllSiteContentAndMessage(siteContent, messageData));
            } else {
                dispatch(setAllSiteContent(siteContent));
            }
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_GET_ALL_SITE_CONTENT, reason));
        });
    };
};

const setListVisibility = (item: ISiteContent) => {
    return (dispatch: Dispatch<IAction<ISiteContent>>) => {
        dispatch(setWorkingOnIt(true));
        return api.setListVisibility(item).then(() => {
            const msg = "The List " + item.title + " is now " + (!item.hidden ? "Hidden" : "visible") + ".";
            const messagaeData = {
                message: msg,
                showMessage: true,
                type: MessageBarType.success
            } as IMessageData;
            dispatch(getAllSiteContent(messagaeData));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_SET_LIST_VISIBILITY, reason));
        });
    };
};

const setListAttachments = (item: ISiteContent) => {
    return (dispatch: Dispatch<IAction<ISiteContent>>) => {
        dispatch(setWorkingOnIt(true));
        return api.setAttachments(item).then(() => {
            // tslint:disable-next-line:max-line-length
            const msg = "Users " + (!item.enableAttachments ? "CAN" : "CAN NOT") + " attach files to items in this list " + item.title + ".";
            const messagaeData = {
                message: msg,
                showMessage: true,
                type: MessageBarType.success
            } as IMessageData;
            dispatch(getAllSiteContent(messagaeData));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_SET_LIST_ATTACHMENTS_ENABLE, reason));
        });
    };
};

const recycleList = (item: ISiteContent) => {
    return (dispatch: Dispatch<IAction<ISiteContent>>) => {
        dispatch(setWorkingOnIt(true));
        return api.recycleList(item).then(() => {
            const msg = "The List " + item.title + " has been deleted.";
            const messagaeData = {
                message: msg,
                showMessage: true,
                type: MessageBarType.success
            } as IMessageData;
            dispatch(getAllSiteContent(messagaeData));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_SET_LIST_NO_CRAWL, reason));
        });
    };
};

const setListNoCrawl = (item: ISiteContent) => {
    return (dispatch: Dispatch<IAction<ISiteContent>>) => {
        dispatch(setWorkingOnIt(true));
        return api.setNoCrawl(item).then(() => {
            // tslint:disable-next-line:max-line-length
            const msg = "The items in " + item.title + " will " + (!item.noCrawl ? "NOT" : "NOW") + " be visible in search results.";
            const messagaeData = {
                message: msg,
                showMessage: true,
                type: MessageBarType.success
            } as IMessageData;
            dispatch(getAllSiteContent(messagaeData));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_SET_LIST_NO_CRAWL, reason));
        });
    };
};

const reIndexList = (item: ISiteContent) => {
    return (dispatch: Dispatch<IAction<ISiteContent>>) => {
        return api.reIndex(item).then((dialogResult: SP.UI.DialogResult) => {
            if (dialogResult === SP.UI.DialogResult.OK) {
                dispatch(setMessageData({
                    message: "The requeste has been sent, patience my young padawan...",
                    showMessage: true,
                    type: MessageBarType.success
                } as IMessageData));
            }
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_REINDEX_LIST, reason));
        });
    };
};

const setFilter: ActionCreator<IAction<string>> = (filterText: string): IAction<string> => {
    return {
        payload: filterText,
        type: actions.SET_TEXT_FILTER
    };
};

const setMessageData: ActionCreator<IAction<IMessageData>> = (messageData: IMessageData): IAction<IMessageData> => {
    return {
        payload: messageData,
        type: actions.SET_MESSAGE_DATA
    };
};

const setShowAll: ActionCreator<IAction<boolean>> = (showAll: boolean): IAction<boolean> => {
    return {
        payload: showAll,
        type: actions.SET_SHOW_ALL
    };
};

const setWorkingOnIt: ActionCreator<IAction<boolean>> = (isWorkingOnIt: boolean): IAction<boolean> => {
    return {
        payload: isWorkingOnIt,
        type: actions.SET_WORKING_ON_IT
    };
};

const setOpenInNewWindow: ActionCreator<IAction<boolean>> = (openInNewWindow: boolean): IAction<boolean> => {
    return {
        payload: openInNewWindow,
        type: actions.SET_OPEN_IN_NEW_TAB
    };
};

const spSiteContentActionsCreatorMap: ISpSiteContentActionCreatorsMapObject = {
    getAllSiteContent,
    setShowAll,
    setOpenInNewWindow,
    setFilter,
    setListVisibility,
    setMessageData,
    reIndexList,
    setListNoCrawl,
    setListAttachments,
    recycleList
};

export default spSiteContentActionsCreatorMap;
