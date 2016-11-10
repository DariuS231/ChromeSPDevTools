/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { WorkingOnIt } from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';

import {
    Checkbox,
    MessageBarType,
    TextField,
    Image,
    ImageFit,
    List
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
    showAll: boolean,
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
            showAll: false,
            openInNewTab: true
        } as SpSiteContentState;
    }
    private getLists() {
        let ctx = SP.ClientContext.get_current();
        let web = ctx.get_web();

        let siteConetent = web.get_lists();
        ctx.load(web);
        ctx.load(siteConetent, 'Include(RootFolder,Title,Id,Hidden,ItemCount,Created,ImageUrl,LastItemModifiedDate,Description,ParentWebUrl)');

        const onSuccess =  (sender: any, err: any) => {

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
        };
        let onError=  (sender: any, err: any) => {
            SP.UI.Notify.addNotification("Failed to get web lists...<br>" + err.get_message(), false);
            console.log(err);
            this.props.closeWindowFunction();
        };
        ctx.executeQueryAsync(onSuccess, onError);
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
        this.getLists();
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
            let target = this.state.openInNewTab ? '_blank' : '_self';
            return (
                <div className="action-container sp-siteContent">
                    <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                    <div className="checkBoxes-container">
                        <div>
                            <Checkbox label='Show all' defaultChecked={this.state.showAll} onChange={this.showAll.bind(this)} />
                        </div>
                        <div>
                            <Checkbox label='Open in new Tab' defaultChecked={this.state.openInNewTab} onChange={this.openInNewTab.bind(this)} />
                        </div>
                    </div>
                        <List
                            items={lists}
                            onRenderCell={(item, index) => (
                                <div className='ms-ListBasicExample-itemCell' data-is-focusable={true}>
                                    <Image className='ms-ListBasicExample-itemImage' src={item.imageUrl} width={25} height={25} />
                                    <div className='ms-ListBasicExample-itemContent'>
                                        <a title={item.title} alt={item.title} href={item.listUrl} className='ms-ListBasicExample-itemName ms-font-l ms-fontColor-themePrimary ms-fontWeight-semibold' target={target}>
                                            {item.title}
                                        </a>
                                        <div className='ms-ListBasicExample-itemIndex'>{`${item.itemCount} Items`}</div>
                                    </div>
                                    <div className="ms-ListItem-actions">
                                        <a target={target} href={item.settingsUrl} title="Settings" className="ms-ListItem-action"><i className="ms-Icon ms-Icon--Settings"></i></a>
                                    </div>
                                </div>
                            )}
                            />
                </div>);

        }
    }
}