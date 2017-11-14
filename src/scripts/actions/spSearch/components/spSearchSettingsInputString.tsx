import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";

interface ISpSearchSettingsInputStringProps {
    label: string;
    value: string;
    action: any;
    onKeyPress: (ev: any) => void;
    validation?: (value: string) => boolean;
    validationError?: string;
    placeHolder?: string;
    changeValueOnError?: boolean;
}

const SpSearchSettingsInputString: React.StatelessComponent<ISpSearchSettingsInputStringProps>
    = (props: ISpSearchSettingsInputStringProps) => {

        const getErrorMessage = (value: string): string => {
            let errorMessage: string;
            if (!!props.validation) {
                errorMessage = props.validation(value)
                    ? ""
                    : props.validationError;
            } else {
                errorMessage = "";
            }
            if (props.changeValueOnError && errorMessage !== "") {
                props.action(value);
            }
            return errorMessage;
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
                placeholder={props.placeHolder || ""}
                onKeyPress={props.onKeyPress}  />
        );

    };

export default SpSearchSettingsInputString;
