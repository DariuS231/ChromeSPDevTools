import { EventSubscription } from "fbemitter";
import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as React from "react";
import { actions } from "../actions/spSiteContentActions";
import { SpSiteContentConstants as constants } from "../constants/spSiteContentConstants";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { spSiteContentStore as store } from "../store/spSiteContentStore";
import MessageBar from "./../../common/components/MessageBar";
import { WorkingOnIt } from "./../../common/components/WorkingOnIt";
import { IMessageData } from "./../../common/interfaces";
import { SpSiteContentFilter } from "./spSiteContentFilter";
import { SpSiteContentList } from "./spSiteContentList";

interface ISpSiteContentState {
    isWorkingOnIt: boolean;
    siteLists: ISiteContent[];
    messageData: IMessageData;
    showAll: boolean;
    openInNewTab: boolean;
    filterText: string;
}

export default class SpSiteContent extends React.Component<{}, ISpSiteContentState> {
    protected subscription: EventSubscription;
    constructor() {
        super();
        this.state = this.getStoreState();
    }
    public render() {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            return (
                <div className="action-container sp-siteContent">
                    <MessageBar
                        message={this.state.messageData.message}
                        messageType={this.state.messageData.type}
                        showMessage={this.state.messageData.showMessage}
                    />
                    <SpSiteContentFilter
                        showAll={this.state.showAll}
                        openInNewTab={this.state.openInNewTab}
                    />
                    <SpSiteContentList
                        items={this.state.siteLists}
                        linkTarget={this.state.openInNewTab ? "_blank" : "_self"}
                    />
                </div>);

        }
    }
    protected onChange = () => {
        this.setState(this.getStoreState());
    }
    private getStoreState(): ISpSiteContentState {
        return {
            filterText: store.getFilterText(),
            isWorkingOnIt: store.getWorkinOnIt(),
            messageData: store.getMessageData(),
            openInNewTab: store.getOpenInNewTag(),
            showAll: store.getShowAll(),
            siteLists: store.getSiteContent()
        };
    }
    private componentDidMount() {
        this.subscription = store.addListener(constants.changeEvent, this.onChange);
        actions.getAllSiteContent();
    }
    private componentWillUnmount(): void {
        this.subscription.remove();
    }
}
