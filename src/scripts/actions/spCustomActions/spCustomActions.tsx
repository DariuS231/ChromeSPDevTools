/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { WorkingOnIt } from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import Utils from './../common/utils';
import { ViewMode } from './../common/enums';
import SpCustomActionItem from './customActionItem'
import { SpCustomActionList } from './spCustomActionList'
import { MessageBarType, FocusZone, FocusZoneDirection, List, Button, ButtonType, SearchBox } from './../../../../node_modules/office-ui-fabric-react/lib/index';

interface SpCustomActionsProps {
    closeWindowFunction: any
}
interface SpCustomActionsState {
    isWorkingOnIt: boolean,
    showMessage: boolean,
    messageType: MessageBarType,
    mode: ViewMode,
    message: string,
    customActions: Array<ICustomAction>,
    filterText:string
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
            customActions: [],
            filterText:''
        } as SpCustomActionsState;
        this.onFilterChange = this.onFilterChange.bind(this);
    }
    private workingOnIt(show: boolean): void {
        this.setState({
            isWorkingOnIt: show
        } as SpCustomActionsState);
    }
    private showMessage(messageType: MessageBarType, message: string): void {
        this.setState({ messageType: messageType, message: message, showMessage: true } as SpCustomActionsState)
    }

    private getCustomActions(message: string, messageType: MessageBarType): void {
        let ctx = SP.ClientContext.get_current();
        let web = ctx.get_web();
        let sca = web.get_userCustomActions();

        ctx.load(web);
        ctx.load(sca);
        let onSuccess = (sender: any, err: any) => {
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
                message: message,
                messageType: messageType,
                showMessage: message !== '',
                isWorkingOnIt: false
            } as SpCustomActionsState);
        };
        let onError = (sender: any, err: any) => {
            SP.UI.Notify.addNotification("Failed to get web custom actions...<br>" + err.get_message(), false);
            console.log(err);
            this.props.closeWindowFunction();
        };
        ctx.executeQueryAsync(onSuccess, onError);
    }
    
    private onFilterChange(str: string) {
        this.setState({ filterText: str } as SpCustomActionsState);
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
        this.getCustomActions('', MessageBarType.success);
    }
    public render(): JSX.Element {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt />
        } else {
            if (this.state.mode === ViewMode.View) {
                const filter:string = this.state.filterText.toLowerCase();
                const list = filter !== '' 
                    ? this.state.customActions.filter((ca: ICustomAction, index: number) => {
                        return ca.name.toLowerCase().indexOf(filter) >= 0;
                    })
                    : this.state.customActions;
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
                        <div className="ms-Grid filters-container"> 
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                                    <SearchBox onChange={this.onFilterChange}/>
                                </div>
                                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6"> </div>
                            </div>
                        </div>
                        <SpCustomActionList
                            customActions={list}
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