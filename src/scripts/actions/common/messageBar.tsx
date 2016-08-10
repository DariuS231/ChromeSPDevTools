/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.tsx"/>
/// <reference path="./../common/enums.tsx"/>
import * as React from 'react';
import {Enums} from './enums'


interface MessageBarProps {
    messageType:Enums.MessageType,
    message:string, 
    showMessage:boolean    
}
interface MessageBarState { }

export default class MessageBar extends React.Component<MessageBarProps, MessageBarState> {

    public render() {
        if(!this.props.showMessage){
            return <div></div>;
        } else{
                
            let styles:any = {
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