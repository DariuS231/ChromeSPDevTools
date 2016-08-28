/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import WorkingOnIt from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import { MessageType } from './../common/enums';
import { SpCustomActionsStyles as styles } from './../common/Styles'

interface SpCustomActionsProps {
    appContainerId: string,
    closeWindowFunction:any
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
            showMessage: false,
            messageType: MessageType.Info,
            message: ''
        } as SpCustomActionsState;
    }
    private getCustomActions() {
        let ctx = SP.ClientContext.get_current();
        let web = ctx.get_web();

        ctx.load(web);

        let onSuccess: Function = Function.createDelegate(this, (sender: any, err: any) => {

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
            return (
                <div style={styles.contentStyles}>
                    <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                    <ul style={styles.list}>

                    </ul>
                </div>);

        }
    }
}