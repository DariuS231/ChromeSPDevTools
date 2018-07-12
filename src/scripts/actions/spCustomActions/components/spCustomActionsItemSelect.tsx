
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import * as React from "react";

interface ISpCustomActionsItemSelectProps {
    label: string;
    selectKey: string;
    value: any;
    options: IDropdownOption[];
    disabled?: boolean;
    required?: boolean;
    onValueChange: (value: string, key: string) => void;
}

export const SpCustomActionsItemSelect: React.StatelessComponent<ISpCustomActionsItemSelectProps> =
    (props: ISpCustomActionsItemSelectProps) => {
        const onTextBoxValueChange = (item: IDropdownOption) => {
            props.onValueChange(item.key.toString(), props.selectKey);
            return false;
        };
        const isValid: boolean = !props.required || props.value !== "";
        const errorMessage: string = "The value can not be empty";
        return (
            <div>
                <Dropdown label={props.label} selectedKey={props.value || ""} disabled={props.disabled}
                    onChanged={onTextBoxValueChange} options={props.options} />
                {isValid || <div className="ms-u-screenReaderOnly">{errorMessage}</div>}
                {isValid || <span><p className="ms-TextField-errorMessage ms-u-slideDownIn20">{errorMessage}</p></span>}
            </div>);
    };
