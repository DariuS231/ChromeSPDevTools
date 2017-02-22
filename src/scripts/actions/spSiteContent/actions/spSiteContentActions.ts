import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpSiteContentApi from "../api/spSiteContentApi";
import { ISiteContent, ISpSiteContentActionCreatorsMapObject } from "../interfaces/spSiteContentInterfaces";
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

const handleAsyncError: ActionCreator<IAction<IMessageData>> =
    (errorMessage: string, exceptionMessage: string): IAction<IMessageData> => {
        // tslint:disable-next-line:no-console
        console.log(exceptionMessage);
        return {
            payload: {
                message: errorMessage,
                showMessage: true,
                type: MessageBarType.success
            },
            type: actions.HANDLE_ASYNC_ERROR
        };
    };

const getAllSiteContent = () => {
    return (dispatch: Dispatch<IAction<ISiteContent[]>>) => {
        return api.getLists().then((siteContent: ISiteContent[]) => {
            dispatch(setAllSiteContent(siteContent));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_GET_ALL_SITE_CONTENT, reason));
        });
    };
};

const setListVisibility = (item: ISiteContent) => {
    return (dispatch: Dispatch<IAction<ISiteContent>>) => {
        dispatch(setWorkingOnIt(true));
        return api.setListVisibility(item.id, !item.hidden).then(() => {
            dispatch(getAllSiteContent());
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_SET_LIST_VISIBILITY, reason));
        });
    };
};

const setFilter: ActionCreator<IAction<string>> = (filterText: string): IAction<string> => {
    return {
        payload: filterText,
        type: actions.SET_TEXT_FILTER
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
    setListVisibility
};

export default spSiteContentActionsCreatorMap;
