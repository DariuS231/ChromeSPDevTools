/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import Utils from './../common/utils';
import { Button, MessageBar as MsBar, MessageBarType, Label, Link } from './../../../../node_modules/office-ui-fabric-react/lib/index';

interface MessageBarProps {
    messageType: MessageBarType,
    message: string,
    showMessage: boolean
}
interface MessageBarState {
    showMessage: boolean
}

export default class MessageBar extends React.Component<MessageBarProps, MessageBarState> {

    constructor() {
        super();
        this.state = {
            showMessage: false
        }
    }
    componentDidMount() {
        this.setState({
            showMessage: this.props.showMessage
        });
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState({
            showMessage: nextProps.showMessage
        });
    }
    private onCloseClick(e: any) {
        //e.preventDefault();
        this.setState({
            showMessage: false
        });
        return false;
    }
    public render() {
        if (!this.state.showMessage) {
            return <div></div>;
        } else {
            return <MsBar messageBarType={ this.props.messageType } onDismiss={ (e) => { this.onCloseClick(e); return false; } }>
                {Utils.capitalize(MessageBarType[this.props.messageType]) } - {this.props.message}
            </MsBar>;
        }
    }
}