import * as React from 'react';
import { IProperty } from '../interfaces/spPropertyBagInterfaces'
import { Button as ButtonUIF, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

interface spPropertyBagNewItemFormProps {
    newProperty: IProperty,
    onValueInputChange: (value: string) => void,
    onKeyInputChange: (value: string) => void,
    addBtnClick: (event: any) => void
}

export const SpPropertyBagNewItemForm: React.StatelessComponent<spPropertyBagNewItemFormProps> = (props: spPropertyBagNewItemFormProps) => {

    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <h2>New web property</h2>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <TextField placeholder='New property name' label="Property Name" value={props.newProperty.key} onChanged={props.onKeyInputChange} />
                </div>
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <TextField placeholder='New property value' label="Property Value" value={props.newProperty.value} onChanged={props.onValueInputChange} />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                </div>
                <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2 spProp-create-button">
                    <ButtonUIF buttonType={ButtonType.primary} onClick={props.addBtnClick} disabled={ props.newProperty.key === '' || props.newProperty.value === '' } >
                        Create
                    </ButtonUIF>
                </div>
            </div>
        </div>)
};
