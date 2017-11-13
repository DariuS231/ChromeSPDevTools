import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

interface ISpSearchSettingsInputNumberProps {
    label: string;
    value: number;
    action: any;
    onKeyPress: (ev: any) => void;
}
const SpSearchSettingsInputNumber: React.StatelessComponent<ISpSearchSettingsInputNumberProps>
    = (props: ISpSearchSettingsInputNumberProps) => {

        const oninputChange = (newValue: number) => {
            props.action(newValue);
        }
        return (
            <TextField
                label={props.label}
                type="number"
                value={props.value.toString()}
                onChanged={oninputChange}
                onKeyPress={props.onKeyPress} />
        );

    };

export default SpSearchSettingsInputNumber;
