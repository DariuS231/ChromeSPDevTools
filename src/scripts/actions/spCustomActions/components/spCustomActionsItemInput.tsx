
import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

interface SpCustomActionsItemInputProps {
    label: string,
    key: string,
    value: string,
    disabled: boolean,
    multipleLine?: boolean,
    required?: boolean,
    type?: string,
    onValueChange: (value: string, key: string) => void
}

export const SpCustomActionsItemInput: React.StatelessComponent<SpCustomActionsItemInputProps> = (props: SpCustomActionsItemInputProps) => {
    const onTextBoxValueChange = (str: string) => {
        props.onValueChange(str, props.key);
        return false;
    }
    const getErrorMessage = (value: string): string => {
        return (this.props.required && value === '') ? 'The value can not be empty' : '';
    }
    return <TextField
        multiple={props.multipleLine}
        onGetErrorMessage={getErrorMessage}
        label={props.label}
        value={props.value}
        type={!!props.type ? "text" : props.type}
        disabled={props.disabled}
        onChanged={onTextBoxValueChange} />
}
