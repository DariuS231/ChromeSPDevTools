/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import WorkingOnIt from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import { MessageType } from './../common/enums';
import { SpCustomActionsStyles as styles } from './../common/Styles'

interface SpCustomActionsProps {

}
interface SpCustomActionsState {
    isWorkingOnIt: boolean,
    showMessage: boolean,
    messageType: MessageType,
    message: string
}

export default class SpCustomActions extends React.Component<SpCustomActionsProps, SpCustomActionsState> {
    constructor() {
        super();
        this.state = {
            isWorkingOnIt: true,
            siteLists: [],
            showMessage: false,
            messageType: MessageType.Info,
            message: '',
            showHidden: true,
            openInNewTab: true
        } as SpCustomActionsState;
    }
    private getCustomActions() {
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
                this.setState({
                    siteLists: items,
                    isWorkingOnIt: false
                } as SpCustomActionsState);
            }
            items.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
        });
        let onError: Function = Function.createDelegate(this, function () { console.log("ERROR"); });
        ctx.executeQueryAsync(onSuccess, onError);
    }

    private componentDidMount() {
        this.getCustomActions();
    }
    public render() {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt/>
        } else {
            return (
                <div style={styles.contentStyles}>
                    <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                    <ul style={styles.list}>

                    </ul>
                </div>);

        }
    }
}