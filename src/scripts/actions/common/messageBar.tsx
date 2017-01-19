/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import Utils from './../common/utils';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { MessageBar as MsBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Link } from 'office-ui-fabric-react/lib/Link';

interface MessageBarProps {
    messageType: MessageBarType,
    message: string,
    showMessage: boolean,
    onCloseMessageClick?: Function
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
        e.preventDefault();
        this.setState({
            showMessage: false
        });
        if(this.props.onCloseMessageClick !== null){
            this.props.onCloseMessageClick();
        }
        return false;
    }
    public render() {
        if (!this.state.showMessage) {
            return null;
        } else {
            return <MsBar messageBarType={ this.props.messageType } onDismiss={ (e) => { this.onCloseClick(e); return false; } }>
                {Utils.capitalize(MessageBarType[this.props.messageType]) } - {this.props.message}
            </MsBar>;
        }
    }
}