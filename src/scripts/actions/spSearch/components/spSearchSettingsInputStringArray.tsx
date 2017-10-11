import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

interface SpSearchSettingsInputStringArrayProps {
    label: string,
    value: string[],
    action: any
}
const SpSearchSettingsInputStringArray: React.StatelessComponent<SpSearchSettingsInputStringArrayProps> = (props: SpSearchSettingsInputStringArrayProps) => {

    const oninputChange = (newValue: string) => {

        props.action(newValue.split(','));
    }
    return <TextField label={props.label} type="text" value={props.value.join(',')} onChanged={oninputChange} />;

};

export default SpSearchSettingsInputStringArray;
