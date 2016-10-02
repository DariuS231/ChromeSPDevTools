/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
/// <reference path="./../common/enums.ts"/>
import * as React from 'react';
import {MessageType} from './enums'

interface MessageBarProps {
    messageType: MessageType,
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
        e.preventDefault();
        this.setState({
            showMessage: false
        });
        return false;
    }
    public render() {
        if (!this.state.showMessage) {
            return <div></div>;
        } else {
            let messageTitle: string = '';
            let messageBarClass: string = '';
            let messageBarIcon: string = '';
            switch (this.props.messageType) {
                case MessageType.Error:
                    messageTitle = "Error";
                    messageBarClass = 'ms-MessageBar--error';
                    messageBarIcon = 'ms-Icon--ErrorBadge';
                    break;
                case MessageType.Success:
                    messageTitle = "Success"
                    messageBarClass = 'ms-MessageBar--success';
                    messageBarIcon = 'ms-Icon--Completed';
                    break;
                case MessageType.Info:
                    messageTitle = "Info"
                    messageBarIcon = 'ms-Icon--Info';
                    break;
            }
            return <div className={"ms-MessageBar ms-MessageBar ms-MessageBar-multiline " + messageBarClass }>
                <div className="ms-MessageBar-content">
                    <div className="ms-MessageBar-icon">
                        <i className={"ms-Icon " + messageBarIcon}></i>
                    </div>
                    <div className="ms-MessageBar-actionables">
                        <button title="Close" className="ms-MessageBar-dismissal ms-Button ms-Button--icon" onClick={this.onCloseClick.bind(this) }>
                            <span className="ms-Button-icon">
                                <i className="ms-Icon ms-Icon--Cancel"></i>
                            </span>
                            <span className="ms-Button-label">
                            </span>
                        </button>
                        <div className="ms-MessageBar-text">
                            <span className="ms-MessageBar-innerTextPadding">
                                {messageTitle} - {this.props.message}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
}