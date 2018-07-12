
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";

interface ISpCustomActionsItemInputProps {
    label: string;
    inputKey: string;
    value: any;
    disabled?: boolean;
    multipleLine?: boolean;
    required?: boolean;
    type?: string;
    onValueChange: (value: string, key: string) => void;
}

export const SpCustomActionsItemInput: React.StatelessComponent<ISpCustomActionsItemInputProps> =
    (props: ISpCustomActionsItemInputProps) => {
        const onTextBoxValueChange = (str: string) => {
            props.onValueChange(str, props.inputKey);
            return false;
        };
        const getErrorMessage = (value: string): string => {
            return (props.required && value === "") ? "The value can not be empty" : "";
        };
        return (
            <TextField multiline={props.multipleLine} resizable={false} onGetErrorMessage={getErrorMessage}
                label={props.label} value={props.value || ""} type={!!props.type ? "text" : props.type}
                disabled={props.disabled} onChanged={onTextBoxValueChange} />);
    };
