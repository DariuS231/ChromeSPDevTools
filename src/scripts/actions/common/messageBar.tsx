/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
/// <reference path="./../common/enums.ts"/>
import * as React from 'react';
import {Enums} from './enums'
import { MessageBarStyles as styles } from './Styles'

interface MessageBarProps {
    messageType: Enums.MessageType,
    message: string,
    showMessage: boolean
}
interface MessageBarState {
    showMessage: boolean
}

export default class MessageBar extends React.Component<MessageBarProps, MessageBarState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showMessage: this.props.showMessage
        }
        if (this.props.showMessage) {
            setTimeout(function () {
                this.setState({ showMessage: false });
            }.bind(this), 5000);
        }
    }

    public render() {
        if (!this.state.showMessage) {
            return <div></div>;
        } else {
            let messageTitle: string;
            let containerStyle: any;
            switch (this.props.messageType) {
                case Enums.MessageType.Error:
                    containerStyle = styles.Error
                    messageTitle = "Error"
                    break;
                case Enums.MessageType.Success:
                    containerStyle = styles.Success
                    messageTitle = "Success"
                    break;
                case Enums.MessageType.Info:
                    containerStyle = styles.Info
                    messageTitle = "Info"
                    break;
            }
            return <div style={containerStyle}>
                <span style={styles.span}>
                    <strong>{messageTitle} </strong>{this.props.message}
                </span>
            </div>
        }
    }
}