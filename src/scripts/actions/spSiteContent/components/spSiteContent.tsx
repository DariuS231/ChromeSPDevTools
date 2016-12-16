/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="./../../common/interfaces.ts"/>

import * as React from 'react';
import { WorkingOnIt } from './../../common/WorkingOnIt';
import MessageBar from './../../common/MessageBar';
import SpSiteContentApi from './../api/spSiteContentApi'
import {SpSiteContentList} from './spSiteContentList' 
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

interface SpSiteContentProps {
    closeWindowFunction: any
}
interface SpSiteContentState {
    isWorkingOnIt: boolean,
    siteLists: Array<ISiteContent>,
    showMessage: boolean,
    messageType: MessageBarType,
    message: string,
    showAll: boolean,
    openInNewTab: boolean,
    filterText: string
}


export default class SpSiteContent extends React.Component<SpSiteContentProps, SpSiteContentState> {
    api:SpSiteContentApi;
    constructor() {
        super();
        this.state = {
            isWorkingOnIt: true,
            siteLists: [],
            showMessage: false,
            messageType: MessageBarType.info,
            message: '',
            showAll: false,
            openInNewTab: true,
            filterText: ''
        } as SpSiteContentState;

        this.onFilterChange = this.onFilterChange.bind(this);
        this.api = new SpSiteContentApi();
    }
    private showAll(e: any) {
        let showAllNewVal: boolean = e.target.checked;
        let messageText: string = showAllNewVal ?
            'Showing all lists and libraries.' :
            'Showing only hidden lists and libraries.';
        this.setState({
            showAll: showAllNewVal,
            messageType: MessageBarType.info,
            showMessage: true,
            message: messageText
        } as SpSiteContentState);
    }
    private openInNewTab(e: any) {
        let openInNewTabNewVal: boolean = e.target.checked;
        let messageText: string = openInNewTabNewVal ?
            'List and libraries links will open in a new tab.' :
            'List and libraries links will open in the current tab.';
        this.setState({
            openInNewTab: openInNewTabNewVal,
            messageType: MessageBarType.info,
            showMessage: true,
            message: messageText
        } as SpSiteContentState);
    }
    private componentDidMount() {
        this.api.getLists().then((items: Array<ISiteContent>) => {
            this.setState({
                siteLists: items,
                isWorkingOnIt: false
            } as SpSiteContentState);
        }).catch((reason: any) => {
            SP.UI.Notify.addNotification("Failed to get web lists...<br>" + reason, false);
            console.log(reason);
            this.props.closeWindowFunction();
        });
    }

    private onFilterChange(str: string) {
        this.setState({ filterText: str } as SpSiteContentState);
    }
    public render() {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt />
        } else {
            var lists: any;
            if (this.state.showAll) {
                lists = this.state.siteLists;
            } else {
                lists = this.state.siteLists.filter((list: ISiteContent, index: number) => {
                    return list.hidden;
                });
            }
            const filter = this.state.filterText.toLowerCase();
            if (filter !== '') {
                lists = lists.filter((list: ISiteContent, index: number) => {
                    return list.title.toLowerCase().indexOf(filter) >= 0;
                });
            }
            let target = this.state.openInNewTab ? '_blank' : '_self';
            return (
                <div className="action-container sp-siteContent">
                    <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                    <div className="ms-Grid filters-container">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                                <SearchBox onChange={this.onFilterChange} />
                            </div>
                            <div className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3">
                                <Checkbox label='Show all' defaultChecked={this.state.showAll} onChange={this.showAll.bind(this)} /></div>
                            <div className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3">
                                <Checkbox label='Open in new Tab' defaultChecked={this.state.openInNewTab} onChange={this.openInNewTab.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <SpSiteContentList items={lists} linkTarget={target} />
                </div>);

        }
    }
}