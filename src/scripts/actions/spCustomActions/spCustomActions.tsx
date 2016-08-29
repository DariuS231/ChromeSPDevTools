/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import WorkingOnIt from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import { MessageType } from './../common/enums';
import SpCustomActionItem from './customActionItem'
import { SpCustomActionsStyles as styles } from './../common/Styles'

interface SpCustomActionsProps {
    appContainerId: string,
    closeWindowFunction: any
}
interface SpCustomActionsState {
    isWorkingOnIt: boolean,
    showMessage: boolean,
    messageType: MessageType,
    message: string,
    customActions: Array<ICustomAction>
}

export default class SpCustomActions extends React.Component<SpCustomActionsProps, SpCustomActionsState> {
    constructor() {
        super();
        this.state = {
            isWorkingOnIt: true,
            showMessage: false,
            messageType: MessageType.Info,
            message: '',
            customActions: []
        } as SpCustomActionsState;
    }
    private getCustomActions() {
        let ctx = SP.ClientContext.get_current();
        let web = ctx.get_web();
        let sca = web.get_userCustomActions();

        ctx.load(web);
        ctx.load(sca);
        let onSuccess: Function = Function.createDelegate(this, (sender: any, err: any) => {
            let enumerator = sca.getEnumerator();
            let items: Array<ICustomAction> = [];
            while (enumerator.moveNext()) {
                let current = enumerator.get_current();
                items.push({
                    name: current.get_name(),
                    description: current.get_description(),
                    id: current.get_id(),
                    title: current.get_title(),
                    registrationType: current.get_registrationType(),
                    scriptSrc: current.get_scriptSrc(),
                    scriptBlock: current.get_scriptBlock(),
                    location: current.get_location(),
                    sequence: current.get_sequence()
                });
            }
            items.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            this.setState({
                customActions: items,
                isWorkingOnIt: false
            } as SpCustomActionsState);
        });
        let onError: Function = Function.createDelegate(this, (sender: any, err: any) => {
            SP.UI.Notify.addNotification("Failed to get web custom actions...<br>" + err.get_message(), false);
            console.log(err);
            this.props.closeWindowFunction(this.props.appContainerId);
        });
        ctx.executeQueryAsync(onSuccess, onError);
    }

    private componentDidMount() {
        this.getCustomActions();
    }
    public render() {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt/>
        } else {
            var customActions = this.state.customActions.map((list: ICustomAction, index: number) => { 
                return (<SpCustomActionItem item={list} key={index} />); 
            });
            return (
                <div style={styles.contentStyles}>
                    <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                    <ul style={styles.list}>
                        {customActions}
                    </ul>
                </div>);

        }
    }
}