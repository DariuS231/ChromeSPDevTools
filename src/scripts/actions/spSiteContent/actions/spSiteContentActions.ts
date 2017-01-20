import Dispatcher from "../dispatcher/spSiteContentDispatcher";
import { ActionsID } from '../enums/spSiteContentEnum';
import SpSiteContentApi from './../api/spSiteContentApi';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { SpSiteContentConstants as constants } from './../constants/spSiteContentConstants';

class SpSiteContentActions {
    private api: SpSiteContentApi;
    constructor() {
        this.api = new SpSiteContentApi();
    }
    public getAllSiteContent() {
        this.api.getLists().then((items: Array<ISiteContent>) => {
            Dispatcher.dispatch({
                type: ActionsID.SET_SITE_CONTENT,
                data: items
            });
        }).catch((reason: any) => {
            console.log(reason);
            Dispatcher.dispatch({
                type: ActionsID.SET_MESSAGE_DATA,
                data: {
                    showMessage: true,
                    message: constants.getContentErrorMessage,
                    type: MessageBarType.error
                }
            });
        });

    }
    public setShowAll(showAll: boolean) {
        Dispatcher.dispatch({
            type: ActionsID.SET_SHOW_ALL,
            data: {
                showAll: showAll,
                messageData: {
                    showMessage: true,
                    message: showAll ? constants.showingAllItemsMessage : constants.showingHiddenItemsMessage,
                    type: MessageBarType.info
                }
            }
        });
    }
    public setOpenInNewWindow(openInNewTab: boolean) {
        Dispatcher.dispatch({
            type: ActionsID.SET_OPEN_IN_NEW_TAB,
            data: {
                openInNewTab:openInNewTab,
                messageData: {
                    showMessage: true,
                    message: openInNewTab ? constants.OpenInNewTab : constants.NoOpenInNewTab,
                    type: MessageBarType.info
                }
            }
        });
    }
    public setFilter(filterStr: string) {
        Dispatcher.dispatch({
            type: ActionsID.SET_TEXT_FILTER,
            data: filterStr
        });
    }
}

export const actions = new SpSiteContentActions();