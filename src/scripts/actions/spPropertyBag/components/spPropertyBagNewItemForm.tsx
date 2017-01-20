import * as React from 'react';
import { IProperty } from '../interfaces/spPropertyBagInterfaces'
import { Button as ButtonUIF, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { constants } from './../constants/constants';

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
                <h2>{constants.NEW_PROPERTY_TITLE}</h2>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <TextField placeholder={constants.NEW_PROPERTY_KEY_TITLE} label={constants.NEW_PROPERTY_KEY_PLACEHOLDER} value={props.newProperty.key} onChanged={props.onKeyInputChange} />
                </div>
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <TextField placeholder={constants.NEW_PROPERTY_VALUE_TITLE} label={constants.NEW_PROPERTY_VALUE_PLACEHOLDER} value={props.newProperty.value} onChanged={props.onValueInputChange} />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                </div>
                <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2 spProp-create-button">
                    <ButtonUIF buttonType={ButtonType.primary} onClick={props.addBtnClick} disabled={props.newProperty.key === constants.EMPTY_STRING || props.newProperty.value === constants.EMPTY_STRING} >
                        {constants.CREATE_TEXT}
                    </ButtonUIF>
                </div>
            </div>
        </div>)
};
