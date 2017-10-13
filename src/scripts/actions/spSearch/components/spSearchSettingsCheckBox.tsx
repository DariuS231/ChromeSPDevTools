import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import * as React from "react";

interface SpSearchSettingsCheckBoxProps {
    label: string;
    checked: boolean;
    action: any;
}

const SpSearchSettingsCheckBox: React.StatelessComponent<SpSearchSettingsCheckBoxProps> = (props: SpSearchSettingsCheckBoxProps) => {
    const onTrimDuplicateChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        props.action(checked);
    }
    return <Checkbox label={props.label} checked={props.checked} onChange={onTrimDuplicateChange} />;
};

export default SpSearchSettingsCheckBox;