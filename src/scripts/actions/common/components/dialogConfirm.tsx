import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog";
import * as React from "react";
import { constants } from "../constants";

interface IDialogConfirmProps {
    dialogTitle: string;
    dialogText: string;
    onOk: () => void;
    onCancel?: () => void;
    okBtnText?: string;
    cancelBtnText?: string;
}

export const DialogConfirm: React.StatelessComponent<IDialogConfirmProps> = (props: IDialogConfirmProps) => {

    const _cancelBtnClick = () => {
        if (typeof props.onCancel !== constants.TYPE_OF_UNDEFINED) {
            props.onCancel();
        }
    }

    return (
        <Dialog isOpen={true} type={DialogType.normal} title={props.dialogTitle}
            subText={props.dialogText} isBlocking={true} >
            <DialogFooter>
                <Button buttonType={ButtonType.primary} onClick={props.onOk}>
                    {props.okBtnText || constants.BUTTON_TEX_OK}
                </Button>
                <Button onClick={_cancelBtnClick}>{props.cancelBtnText || constants.BUTTON_TEX_CANCEL}</Button>
            </DialogFooter>
        </Dialog>
    );
};
