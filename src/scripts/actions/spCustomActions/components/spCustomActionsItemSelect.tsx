
import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

interface SpCustomActionsItemSelectProps {
    label: string,
    selectKey: string,
    value: any,
    options: Array<IDropdownOption>,
    disabled?: boolean,
    required?: boolean,
    onValueChange: (value: string, key: string) => void
}

export const SpCustomActionsItemSelect: React.StatelessComponent<SpCustomActionsItemSelectProps> = (props: SpCustomActionsItemSelectProps) => {
    const onTextBoxValueChange = (item: IDropdownOption) => {
        props.onValueChange(item.key.toString(), props.selectKey);
        return false;
    }
    return <Dropdown label={props.label} selectedKey={props.value || ''} disabled={props.disabled} onChanged={onTextBoxValueChange} options={props.options} />
}
