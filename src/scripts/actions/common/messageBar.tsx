/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
/// <reference path="./../common/enums.ts"/>
import * as React from 'react';
import {Enums} from './enums'


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

            let styles: any = {
                divContainer: {
                    padding: '5px',
                    margin: 0
                },
                span: {
                    margin: 0,
                    padding: 0
                }
            }
            let messageTitle: string;
            switch (this.props.messageType) {
                case Enums.MessageType.Error:
                    styles.divContainer['backgroundColor'] = 'rgba(255, 0, 0, 0.6)';
                    styles.divContainer['border'] = '1px rgb(255, 0, 0) solid';
                    messageTitle = "Error"
                    break;
                case Enums.MessageType.Success:
                    styles.divContainer['backgroundColor'] = 'rgba(49, 149, 36, 0.6)';
                    styles.divContainer['border'] = '1px rgb(49, 149, 36) solid';
                    messageTitle = "Success"
                    break;
                case Enums.MessageType.Info:
                    styles.divContainer['backgroundColor'] = 'rgba(10, 117, 224, 0.6)';
                    styles.divContainer['border'] = '1px rgb(10, 117, 224) solid';
                    messageTitle = "Info"
                    break;
            }

            return <div style={styles.divContainer}>
                <span style={styles.span}>
                    <strong>{messageTitle} </strong>{this.props.message}
                </span>
            </div>
        }
    }
}