
import { EventEmitter } from "fbemitter";
import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { SpSiteContentConstants as constants } from "../constants/spSiteContentConstants";
import Dispatcher from "../dispatcher/spSiteContentDispatcher";
import { ActionsID } from "../enums/spSiteContentEnum";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { IMessageData } from "./../../common/interfaces";

interface IPayLoad {
    type: ActionsID;
    data: any;
}
interface IStore {
    isWorkingOnIt: boolean;
    siteLists: ISiteContent[];
    messageData: IMessageData;
    showAll: boolean;
    openInNewTab: boolean;
    filterText: string;
}

class SpSiteContentStore extends EventEmitter {
    private _store: IStore = {
        filterText: "",
        isWorkingOnIt: true,
        messageData: {
            message: "",
            showMessage: false,
            type: MessageBarType.info
        },
        openInNewTab: true,
        showAll: false,
        siteLists: []
    };
    constructor() {
        super();
        this.registerDispatcher();
    }

    public getSiteContent(): ISiteContent[] {
        let items: ISiteContent[] = this._store.siteLists;
        if (!this._store.showAll) {
            items = items.filter((item: ISiteContent, index: number) => {
                return item.hidden;
            });
        }
        const filter = this._store.filterText;
        if (filter !== "") {
            items = items.filter((list: ISiteContent, index: number) => {
                return list.title.toLowerCase().indexOf(filter) >= 0;
            });
        }
        return items;
    }
    public getMessageData(): IMessageData {
        return this._store.messageData;
    }
    public getOpenInNewTag(): boolean {
        return this._store.openInNewTab;
    }
    public getWorkinOnIt(): boolean {
        return this._store.isWorkingOnIt;
    }
    public getShowAll(): boolean {
        return this._store.showAll;
    }
    public getFilterText(): string {
        return this._store.filterText.toLowerCase();
    }
    private registerDispatcher(): void {
        Dispatcher.register((payLoad: IPayLoad) => {
            const emiteChange = true;
            switch (payLoad.type) {
                case ActionsID.SET_SITE_CONTENT:
                    this._store.siteLists = payLoad.data;
                    this._store.isWorkingOnIt = false;
                    break;
                case ActionsID.SET_SHOW_ALL:
                    this._store.showAll = payLoad.data.showAll;
                    this._store.messageData = payLoad.data.messageData;
                    break;
                case ActionsID.SET_OPEN_IN_NEW_TAB:
                    this._store.openInNewTab = payLoad.data.openInNewTab;
                    this._store.messageData = payLoad.data.messageData;
                    break;
                case ActionsID.SET_TEXT_FILTER:
                    this._store.filterText = payLoad.data;
                    break;
                case ActionsID.SET_MESSAGE_DATA:
                    this._store.messageData = payLoad.data;
                    break;
                default:
                    break;
            }
            if (emiteChange) {
                this.emit(constants.changeEvent);
            }
        });
    }

}

export const spSiteContentStore = new SpSiteContentStore();
