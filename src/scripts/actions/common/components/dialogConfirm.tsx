import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog";
import * as React from "react";

interface IDialogConfirmProps {
    dialogTitle: string;
    dialogText: string;
    onOk: () => void;
    onCancel?: () => void;
    okBtnText?: string;
    cancelBtnText?: string;
}
interface IDialogConfirmState {
    showDialog: boolean;
}
export class DialogConfirm extends React.Component<IDialogConfirmProps, IDialogConfirmState> {

    constructor() {
        super();
        this.state = {
            showDialog: false
        };
        this._closeDialog = this._closeDialog.bind(this);
        this._okBtnClick = this._okBtnClick.bind(this);
        this._cancelBtnClick = this._cancelBtnClick.bind(this);
    }

    public render() {
        return (
            <div>
                <Dialog
                    isOpen={this.state.showDialog}
                    type={DialogType.normal}
                    onDismiss={this._closeDialog}
                    title={this.props.dialogTitle}
                    subText={this.props.dialogText}
                    isBlocking={true}
                >
                    <DialogFooter>
                        <Button
                            buttonType={ButtonType.primary}
                            onClick={this._okBtnClick}>
                            {this.props.okBtnText || "Save"}
                        </Button>
                        <Button onClick={this._cancelBtnClick}>{this.props.cancelBtnText || "Cancel"}</Button>
                    </DialogFooter>
                </Dialog>
            </div>
        );
    }

    private _closeDialog() {
        this.setState({ showDialog: false });
    }
    private _okBtnClick() {
        this.props.onOk();
        this.setState({ showDialog: false });
    }
    private _cancelBtnClick() {
        if (typeof this.props.onCancel !== "undefined") {
            this.props.onCancel();
        }
        this.setState({ showDialog: false });
    }
}
