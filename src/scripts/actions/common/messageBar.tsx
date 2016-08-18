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
        let divContainer = {
            padding: '5px',
            margin: 0
        }

        let btnStyles = {
            display: 'inline-block',
            height: '16px',
            borderRadius: '5px',
            padding: '3px 10px 4px 25px',
            margin: '5px',
            backgroundPosition: '10% 50%',
            backgroundRepeat: 'no-repeat',
            textDecoration: 'none',
            color: 'black',
            fontWeight: 'bold'
        }

        let tableCellStyle = {
            padding: '5px'
        }

        let inputStyles = {
            width: '240px'
        }

        let styles = {
            span: {
                margin: 0,
                padding: 0
            },
            Error: Object.assign({
                backgroundColor: 'rgba(255, 0, 0, 0.6)',
                border: '1px rgb(255, 0, 0,) solid'
            }, divContainer),
            Success: Object.assign({
                backgroundColor: 'rgba(49, 149, 36, 0.6)',
                border: '1px rgb(49, 149, 36) solid'
            }, divContainer),
            Info: Object.assign({
                backgroundColor: 'rgba(10, 117, 224, 0.6)',
                border: '1px rgb(10, 117, 224) solid'
            }, divContainer)
        }

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