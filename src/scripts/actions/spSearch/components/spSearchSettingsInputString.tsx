import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

interface SpSearchSettingsInputStringProps {
    label: string,
    value: string,
    action: any
}
const SpSearchSettingsInputString: React.StatelessComponent<SpSearchSettingsInputStringProps> = (props: SpSearchSettingsInputStringProps) => {

    const oninputChange = (newValue: string) => {
        props.action(newValue);
    }
    return <TextField label={props.label} type="text" value={props.value} onChanged={oninputChange} />;

};

export default SpSearchSettingsInputString;
