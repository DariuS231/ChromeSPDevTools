/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import WorkingOnIt from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import { SpSiteContentStyles as styles } from './../common/Styles'
import SpSiteContentItem  from './spSiteContentItem';

import {
    Checkbox, MessageBarType
} from './../../../../node_modules/office-ui-fabric-react/lib/index';

interface SpSiteContentProps {
    closeWindowFunction: any
}
interface SpSiteContentState {
    isWorkingOnIt: boolean,
    siteLists: Array<ISiteContent>,
    showMessage: boolean,
    messageType: MessageBarType,
    message: string,
    showHidden: boolean,
    openInNewTab: boolean
}

export default class SpSiteContent extends React.Component<SpSiteContentProps, SpSiteContentState> {
    constructor() {
        super();
        this.state = {
            isWorkingOnIt: true,
            siteLists: [],
            showMessage: false,
            messageType: MessageBarType.info,
            message: '',
            showHidden: true,
            openInNewTab: true
        } as SpSiteContentState;
    }
    private getLists() {
        let ctx = SP.ClientContext.get_current();
        let web = ctx.get_web();

        let siteConetent = web.get_lists();
        ctx.load(web);
        ctx.load(siteConetent, 'Include(RootFolder,Title,Id,Hidden,ItemCount,Created,ImageUrl,LastItemModifiedDate,Description,ParentWebUrl)');

        let onSuccess: Function = Function.createDelegate(this, (sender: any, err: any) => {

            let items: Array<ISiteContent> = [], listEnumerator: any = siteConetent.getEnumerator();

            while (listEnumerator.moveNext()) {
                let oList: any = listEnumerator.get_current();
                let listId: any = oList.get_id();
                let listItem: ISiteContent = {
                    id: listId,
                    title: oList.get_title(),
                    description: oList.get_description(),
                    hidden: oList.get_hidden(),
                    itemCount: oList.get_itemCount(),
                    imageUrl: oList.get_imageUrl(),
                    created: oList.get_created(),
                    lastModified: oList.get_lastItemModifiedDate(),
                    listUrl: oList.get_rootFolder().get_serverRelativeUrl(),
                    settingsUrl: oList.get_parentWebUrl() + '/_layouts/15/listedit.aspx?List=' + listId
                }
                items.push(listItem);
            }
            items.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
            this.setState({
                siteLists: items,
                isWorkingOnIt: false
            } as SpSiteContentState);
        });
        let onError: Function = Function.createDelegate(this, (sender: any, err: any) => {
            SP.UI.Notify.addNotification("Failed to get web lists...<br>" + err.get_message(), false);
            console.log(err);
            this.props.closeWindowFunction();
        });
        ctx.executeQueryAsync(onSuccess, onError);
    }
    private showHidden(e: any) {
        let showHiddenNewVal: boolean = e.target.checked;
        let messageText: string = showHiddenNewVal ?
            'Showing hidden lists and libraries.' :
            'Not showing hidden lists and libraries.';
        this.setState({
            showHidden: showHiddenNewVal,
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
        this.getLists();
    }
    private testingTogggle(toggle: any) {
        debugger;
        console.log(toggle);
        return false;
    }
    public render() {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt/>
        } else {
            var lists: any;
            if (this.state.showHidden) {
                lists = this.state.siteLists;
            } else {
                lists = this.state.siteLists.filter((list: ISiteContent, index: number) => {
                    return !list.hidden;
                });
            }

            var siteContent = lists.map((list: ISiteContent, index: number) => { return (<SpSiteContentItem item={list} key={index} openInNewTab={this.state.openInNewTab} />); });
            return (
                <div style={styles.contentStyles}>
                    <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                    <div style={styles.checksContainer}>
                        <div style={styles.check}>
                            <Checkbox
                                label='Show hidden'
                                defaultChecked={ this.state.showHidden }
                                onChange={ this.showHidden.bind(this) } />

                        </div>
                        <div style={styles.lastCheck}>
                            <Checkbox
                                label='Show hidden'
                                defaultChecked={ this.state.openInNewTab }
                                onChange={ this.openInNewTab.bind(this) } />
                        </div>
                    </div>
                    <ul style={styles.list}>
                        {siteContent}
                    </ul>
                </div>);

        }
    }
}