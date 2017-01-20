/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="./../../common/interfaces.ts"/>
/// <reference path="../interfaces/spSiteContentInterfaces.ts"/>

import * as React from 'react';
import { EventSubscription } from "fbemitter";
import { SpSiteContentConstants as constants } from '../constants/spSiteContentConstants';
import { actions } from '../actions/spSiteContentActions';
import { spSiteContentStore as store } from '../store/spSiteContentStore';
import { SpSiteContentList } from './spSiteContentList';
import { SpSiteContentFilter } from './spSiteContentFilter';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { WorkingOnIt } from './../../common/WorkingOnIt';
import MessageBar from './../../common/MessageBar';
import { IMessageData } from './../../common/interfaces'

interface SpSiteContentProps { }
interface SpSiteContentState {
    isWorkingOnIt: boolean,
    siteLists: Array<ISiteContent>,
    messageData: IMessageData,
    showAll: boolean,
    openInNewTab: boolean,
    filterText: string
}

export default class SpSiteContent extends React.Component<SpSiteContentProps, SpSiteContentState> {
    subscription: EventSubscription;
    constructor() {
        super();
        this.state = this.getStoreState();
    }
    onChange = () => {
        this.setState(this.getStoreState());
    }
    private getStoreState(): SpSiteContentState {
        return {
            isWorkingOnIt: store.getWorkinOnIt(),
            siteLists: store.getSiteContent(),
            messageData: store.getMessageData(),
            showAll: store.getShowAll(),
            openInNewTab: store.getOpenInNewTag(),
            filterText: store.getFilterText()
        };
    }
    private componentDidMount() {
        this.subscription = store.addListener(constants.changeEvent, this.onChange);
        actions.getAllSiteContent();
    }
    private componentWillUnmount(): void {
        this.subscription.remove();
    }
    public render() {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt />
        } else {
            return (
                <div className="action-container sp-siteContent">
                    <MessageBar 
                        message={this.state.messageData.message} 
                        messageType={this.state.messageData.type} 
                        showMessage={this.state.messageData.showMessage} />
                    <SpSiteContentFilter 
                        showAll={this.state.showAll} 
                        openInNewTab={this.state.openInNewTab} />
                    <SpSiteContentList 
                        items={this.state.siteLists} 
                        linkTarget={this.state.openInNewTab ? '_blank' : '_self'} />
                </div>);

        }
    }
}