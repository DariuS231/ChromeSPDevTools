import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import Dispatcher from "../dispatcher/spSiteContentDispatcher";
import { ActionsID } from "../enums/spSiteContentEnum";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import SpSiteContentApi from "./../api/spSiteContentApi";
import { SpSiteContentConstants as constants } from "./../constants/spSiteContentConstants";

class SpSiteContentActions {
    private api: SpSiteContentApi;
    constructor() {
        this.api = new SpSiteContentApi();
    }
    public getAllSiteContent() {
        this.api.getLists().then((items: ISiteContent[]) => {
            Dispatcher.dispatch({
                data: items,
                type: ActionsID.SET_SITE_CONTENT
            });
        }).catch((reason: any) => {
            Dispatcher.dispatch({
                data: {
                    message: constants.getContentErrorMessage,
                    showMessage: true,
                    type: MessageBarType.error
                },
                type: ActionsID.SET_MESSAGE_DATA
            });
        });

    }
    public setShowAll(showAll: boolean) {
        Dispatcher.dispatch({
            data: {
                messageData: {
                    message: showAll ? constants.showingAllItemsMessage : constants.showingHiddenItemsMessage,
                    showMessage: true,
                    type: MessageBarType.info
                },
                showAll
            },
            type: ActionsID.SET_SHOW_ALL
        });
    }
    public setOpenInNewWindow(openInNewTab: boolean) {
        Dispatcher.dispatch({
            data: {
                messageData: {
                    message: openInNewTab ? constants.openInNewTab : constants.noOpenInNewTab,
                    showMessage: true,
                    type: MessageBarType.info
                },
                openInNewTab
            },
            type: ActionsID.SET_OPEN_IN_NEW_TAB
        });
    }
    public setFilter(filterStr: string) {
        Dispatcher.dispatch({
            data: filterStr,
            type: ActionsID.SET_TEXT_FILTER
        });
    }
}

export const actions = new SpSiteContentActions();
