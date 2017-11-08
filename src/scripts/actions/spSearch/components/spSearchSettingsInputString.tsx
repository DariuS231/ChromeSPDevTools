import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";

interface ISpSearchSettingsInputStringProps {
    label: string;
    value: string;
    action: any;
    validation?: (value: string) => boolean;
    validationError?: string;
    placeHolder?: string;
    changeValueOnError?: boolean;
}

const SpSearchSettingsInputString: React.StatelessComponent<ISpSearchSettingsInputStringProps> = (props: ISpSearchSettingsInputStringProps) => {

    const getErrorMessage = (value: string): string => {
        let errorMessgae: string;
        if (!!props.validation) {
            errorMessgae = props.validation(value)
                ? ""
                : props.validationError;
        } else {
            errorMessgae = "";
        }
        if (props.changeValueOnError && errorMessgae !== "") {
            props.action(value);
        }
        return errorMessgae;
    };
    const oninputChange = (newValue: string) => {
        props.action(newValue);
    };
    return (
        <TextField
            label={props.label}
            type="text"
            value={props.value}
            onChanged={oninputChange}
            onGetErrorMessage={getErrorMessage}
            placeholder={props.placeHolder || ""} />
    );

};

export default SpSearchSettingsInputString;
