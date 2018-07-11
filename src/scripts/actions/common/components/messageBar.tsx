import { MessageBar as MsBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as React from "react";
import Utils from "../utils";

interface IMessageBarProps {
    messageType: MessageBarType;
    message: string;
    showMessage: boolean;
    onCloseMessageClick?: Function;
}
interface IMessageBarState {
    showMessage: boolean;
}

export default class MessageBar extends React.Component<IMessageBarProps, IMessageBarState> {
    constructor() {
        super();
        this.state = { showMessage: false };
        this.onDismissClick = this.onDismissClick.bind(this);
    }
    public render() {
        if (!this.state.showMessage) {
            return null;
        } else {
            return (
                <MsBar messageBarType={this.props.messageType} onDismiss={this.onDismissClick}>
                    {Utils.capitalize(MessageBarType[this.props.messageType])} - {this.props.message}
                </MsBar>
            );
        }
    }
    public componentDidMount() {
        this.setState({ showMessage: this.props.showMessage });
    }
    public componentWillReceiveProps(nextProps: any) {
        this.setState({
            showMessage: nextProps.showMessage
        });
    }

    protected onDismissClick(ev?: React.MouseEvent<HTMLButtonElement>) {
        this.onCloseClick(ev);
        return false;
    }
    private onCloseClick(e: any) {
        e.preventDefault();
        this.setState({
            showMessage: false
        });
        if (this.props.onCloseMessageClick !== null) {
            this.props.onCloseMessageClick();
        }
        return false;
    }
}
