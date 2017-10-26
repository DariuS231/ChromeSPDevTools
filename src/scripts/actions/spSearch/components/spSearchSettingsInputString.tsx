import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

interface SpSearchSettingsInputStringProps {
    label: string,
    value: string,
    action: any,
    validation?: (value: string) => boolean,
    validationError?: string,
    placeHolder?: string
}
const SpSearchSettingsInputString: React.StatelessComponent<SpSearchSettingsInputStringProps> = (props: SpSearchSettingsInputStringProps) => {

    const getErrorMessage = (value: string): string => {
        if (!!props.validation) {
            return props.validation(value)
                ? ''
                : props.validationError;
        } else {
            return "";
        }
    }
    const oninputChange = (newValue: string) => {
        props.action(newValue);
    }
    return <TextField
        label={props.label}
        type="text"
        value={props.value}
        onChanged={oninputChange}
        onGetErrorMessage={getErrorMessage}
        placeholder={props.placeHolder || ""}  />;

};

export default SpSearchSettingsInputString;
