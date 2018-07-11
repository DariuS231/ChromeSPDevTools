import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

interface ISpSearchSettingsInputStringArrayProps {
    label: string;
    value: string[];
    action: any;
    onKeyPress: (ev: any) => void;
    placeHolder?: string;
}
const SpSearchSettingsInputStringArray: React.StatelessComponent<ISpSearchSettingsInputStringArrayProps>
    = (props: ISpSearchSettingsInputStringArrayProps) => {

        const oninputChange = (newValue: string) => {
            const array: string[] = !!newValue ? newValue.split(",") : [];
            props.action(array);
        }
        return (
            <TextField
                label={props.label}
                type="text"
                value={props.value.join(",")}
                onChanged={oninputChange}
                placeholder={props.placeHolder || ""}
                onKeyPress={props.onKeyPress} />
        );

    };

export default SpSearchSettingsInputStringArray;
