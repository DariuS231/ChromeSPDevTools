import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

interface SpSearchSettingsInputNumberProps {
    label: string,
    value: number,
    action: any
}
const SpSearchSettingsInputNumber: React.StatelessComponent<SpSearchSettingsInputNumberProps> = (props: SpSearchSettingsInputNumberProps) => {

    const oninputChange = (newValue: number) => {
        props.action(newValue);
    }
    return <TextField label={props.label} type="number" value={props.value.toString()} onChanged={oninputChange} />;

};

export default SpSearchSettingsInputNumber;
