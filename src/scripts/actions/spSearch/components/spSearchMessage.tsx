import { MessageBar as MsBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as React from "react";
import { IMessageData } from "../../common/interfaces";

interface ISpSearchMessageProps {
    messageData: IMessageData;
}

const SpSearchMessage: React.StatelessComponent<ISpSearchMessageProps> = (props: ISpSearchMessageProps) => {
    if (props.messageData.showMessage) {
        return (
            <MsBar messageBarType={props.messageData.type} isMultiline={true}>
                {props.messageData.type} - {props.messageData.message}
            </MsBar>
        );
    } else {
        return null;
    }

};

export default SpSearchMessage;
