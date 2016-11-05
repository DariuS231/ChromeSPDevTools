/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { WorkingOnIt } from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import Utils from './../common/utils';
import { ViewMode } from './../common/enums';
import SpCustomActionItem from './customActionItem'
import { SpCustomActionList } from './spCustomActionList'
import { MessageBarType, FocusZone, FocusZoneDirection, List, Button, ButtonType } from './../../../../node_modules/office-ui-fabric-react/lib/index';

interface SpCustomActionsProps {
    closeWindowFunction: any
}
interface SpCustomActionsState {
    isWorkingOnIt: boolean,
    showMessage: boolean,
    messageType: MessageBarType,
    mode: ViewMode,
    message: string,
    customActions: Array<ICustomAction>
}

export default class SpCustomActions extends React.Component<SpCustomActionsProps, SpCustomActionsState> {
    constructor() {
        super();
        this.state = {
            isWorkingOnIt: true,
            showMessage: false,
            messageType: MessageBarType.info,
            mode: ViewMode.View,
            message: '',
            customActions: []
        } as SpCustomActionsState;
    }
    private workingOnIt(show: boolean): void {
        this.setState({
            isWorkingOnIt: show
        } as SpCustomActionsState);
    }
    private showMessage(messageType: MessageBarType, message: string): void {
        this.setState({ messageType: messageType, message: message, showMessage: true } as SpCustomActionsState)
    }

    private getCustomActions(): void {
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
                let scriptSrc = current.get_scriptSrc();
                items.push({
                    name: current.get_name(),
                    description: current.get_description(),
                    id: current.get_id(),
                    title: current.get_title(),
                    registrationType: current.get_registrationType(),
                    scriptSrc: scriptSrc,
                    scriptBlock: current.get_scriptBlock(),
                    locationInternal: (scriptSrc ? 'ScriptLink' : 'ScriptBlock'),
                    location: current.get_location(),
                    sequence: current.get_sequence()
                } as ICustomAction);
            }

            items = items.filter((item, index) => {
                return item.scriptBlock !== '' || item.scriptSrc !== '';
            }).sort((a, b) => {
                return a.sequence > b.sequence ? 1 : -1;
            });
            this.setState({
                customActions: items,
                mode: ViewMode.View,
                isWorkingOnIt: false
            } as SpCustomActionsState);
        });
        let onError: Function = Function.createDelegate(this, (sender: any, err: any) => {
            SP.UI.Notify.addNotification("Failed to get web custom actions...<br>" + err.get_message(), false);
            console.log(err);
            this.props.closeWindowFunction();
        });
        ctx.executeQueryAsync(onSuccess, onError);
    }
    private onNewCuatomActionClick(e: any): void {
        this.setState({
            mode: ViewMode.New
        } as SpCustomActionsState);
    }
    private changeMode(e: any) {
        this.setState({ mode: (this.state.mode === ViewMode.View ? ViewMode.Edit : ViewMode.View) } as SpCustomActionsState);
    }

    private componentDidMount(): void {
        this.getCustomActions();
    }
    public render(): JSX.Element {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt />
        } else {
            if (this.state.mode === ViewMode.View) {
                return (
                    <div className="action-container sp-customActions">
                        {
                            (this.state.showMessage && this.state.message) ?
                                <MessageBar
                                    message={this.state.message}
                                    messageType={this.state.messageType}
                                    showMessage={this.state.showMessage} />
                                :
                                null
                        }
                        <SpCustomActionList
                            customActions={this.state.customActions}
                            workingOnIt={this.workingOnIt.bind(this)}
                            showMessage={this.showMessage.bind(this)}
                            reloadCActions={this.getCustomActions.bind(this)} />
                        <Button buttonType={ButtonType.primary}
                            onClick={this.onNewCuatomActionClick.bind(this)} >
                            New Custom Action
                        </Button>
                    </div>);
            } else {
                return (
                    <div className="action-container sp-customActions">
                        <SpCustomActionItem
                            workingOnIt={this.workingOnIt.bind(this)}
                            showMessage={this.showMessage.bind(this)}
                            reloadCActions={this.getCustomActions.bind(this)} />
                    </div>);
            }
        }
    }
}