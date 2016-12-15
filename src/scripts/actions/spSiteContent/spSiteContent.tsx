/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { WorkingOnIt } from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import api from './../api/SpSiteContent'

import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { List } from 'office-ui-fabric-react/lib/List';
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
        api.getLists().then((items: Array<ISiteContent>) => {
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

                    <List
                        items={lists}
                        onRenderCell={(item, index) => (
                            <div className='ms-ListBasicExample-itemCell' data-is-focusable={true}>
                                <Image className={'ms-ListBasicExample-itemImage' + (item.hidden ? ' hidden-spList' : '')} src={item.imageUrl} width={25} height={25} />
                                <div className='ms-ListBasicExample-itemContent'>
                                    <a title={item.title} alt={item.title} href={item.listUrl} className='ms-ListBasicExample-itemName ms-font-l ms-fontColor-themePrimary ms-fontWeight-semibold' target={target}>
                                        {item.title}
                                    </a>
                                    <div className='ms-ListBasicExample-itemIndex'>{`${item.itemCount} Items`}</div>
                                    {
                                        item.newFormUrl
                                            ? <a target={target} href={item.newFormUrl} title="New Item" className="ms-ListItem-action"><i className="ms-Icon ms-Icon--AddTo"></i>New Item</a>
                                            : null
                                    }
                                </div>
                                <div className="ms-ListItem-actions">
                                    <a target={target} href={item.settingsUrl} title="Settings" className="ms-ListItem-action"><i className="ms-Icon ms-Icon--Settings"></i></a>
                                    <a target={target} href={item.permissionsPageUrl} title={`Permissions: ${item.title}`} className="ms-ListItem-action"><i className="ms-Icon ms-Icon--SecurityGroup"></i></a>
                                </div>
                            </div>
                        )}
                        />
                </div>);

        }
    }
}