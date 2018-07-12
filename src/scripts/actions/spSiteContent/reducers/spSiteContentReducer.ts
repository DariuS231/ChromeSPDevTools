import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IAllContentAndMessage, IInitialState, ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions } from "./../constants/spSiteContentConstants";

const initialState: IInitialState = {
    filterText: "",
    isWorkingOnIt: true,
    messageData: { message: "", showMessage: false, type: MessageBarType.info },
    openInNewTab: true,
    showAll: false,
    siteLists: []
};

export const spSiteContentReducer = (state: IInitialState = initialState, action: IAction<any>): IInitialState => {
    switch (action.type) {
        case actions.SET_SITE_CONTENT:
            const allSiteContent: ISiteContent[] = action.payload;
            return { ...state, isWorkingOnIt: false, siteLists: allSiteContent };
        case actions.SET_SITE_CONTENT_AND_MESSAGE:
            const allSiteContentAndMessage: IAllContentAndMessage = action.payload;
            return {
                ...state,
                isWorkingOnIt: false,
                messageData: allSiteContentAndMessage.messageData,
                siteLists: allSiteContentAndMessage.siteContent
            };
        case actions.SET_SHOW_ALL:
            const showAll: boolean = action.payload;
            return { ...state, showAll };
        case actions.SET_OPEN_IN_NEW_TAB:
            const openInNewTab: boolean = action.payload;
            return { ...state, openInNewTab };
        case actions.SET_TEXT_FILTER:
            const filterText: string = action.payload;
            return { ...state, filterText };
        case actions.SET_MESSAGE_DATA:
            const messageData: IMessageData = action.payload;
            return { ...state, isWorkingOnIt: false, messageData };
        case actions.SET_WORKING_ON_IT:
            const isWorkingOnIt: boolean = action.payload;
            return { ...state, isWorkingOnIt };
        case actions.SET_FAVOURITE:
            const item: ISiteContent = action.payload;
            const filtered = state.siteLists.map((list: ISiteContent) => {
                if (item.id === list.id) {
                    return item;
                } else {
                    return list;
                }
            });
            return { ...state, siteLists: filtered };
        default:
            return state;
    }
};
