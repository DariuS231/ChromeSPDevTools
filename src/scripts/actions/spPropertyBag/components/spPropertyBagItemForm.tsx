import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { constants } from "./../constants/constants";

interface ISpPropertyBagItemFormProps {
    inputId: string;
    inputValue: string;
    keyValue: string;
    isEditMode: boolean;
    getErrorMessage: (value: string) => string | PromiseLike<string>;
    onInputValueChange: (newValue: any) => void;
    topBtnClick: React.EventHandler<React.MouseEvent<Button | HTMLButtonElement | HTMLAnchorElement>>;
    bottomBtnClick: React.EventHandler<React.MouseEvent<Button | HTMLButtonElement | HTMLAnchorElement>>;
}

export const SpPropertyBagItemForm: React.StatelessComponent<ISpPropertyBagItemFormProps> =
    (props: ISpPropertyBagItemFormProps) => {
    const topBtnText: string = props.isEditMode ? constants.SAVE_TEXT : constants.DELETE_TEXT;
    const bottomBtnText: string = props.isEditMode ? constants.CANCEL_TEXT : constants.EDIT_TEXT;

    return (<div className="ms-ListBasicExample-itemCell  ms-Grid-row" data-is-focusable={true}>
        <div className="ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11">
            <TextField
                id={props.inputId}
                onGetErrorMessage={props.getErrorMessage}
                label={props.keyValue}
                value={props.inputValue}
                disabled={!props.isEditMode}
                onChanged={props.onInputValueChange}
            />
        </div>
        <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
            <Button
                buttonType={ButtonType.icon}
                icon={topBtnText}
                rootProps={{ title: topBtnText }}
                ariaLabel={topBtnText}
                onClick={props.topBtnClick}
            />
            <Button
                buttonType={ButtonType.icon}
                icon={bottomBtnText}
                rootProps={{ title: bottomBtnText }}
                ariaLabel={bottomBtnText}
                onClick={props.bottomBtnClick}
            />
        </div>
    </div>);
};
