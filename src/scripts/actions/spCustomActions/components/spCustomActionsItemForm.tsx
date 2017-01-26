
import * as React from 'react';
import { CustomActionType } from './../constants/enums';
import { ViewMode } from './../../common/enums';
import { SpCustomActionsItemInput } from './spCustomActionsItemInput'
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ICustomAction } from '../interfaces/spCustomActionsInterfaces';

interface SpCustomActionsItemFormProps {
    item: ICustomAction,
    isViewMode: boolean,
    onInputChange: (value: string, inputKey: string) => void
    topButtonTex: string,
    topButtonOnClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | Button>,
    bottomButtonTex: string,
    bottomButtonOnClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | Button>
}

export const SpCustomActionsItemForm: React.StatelessComponent<SpCustomActionsItemFormProps> = (props: SpCustomActionsItemFormProps) => {
    const internalLoc = props.item.locationInternal;
    const isViewMoideProp = props.isViewMode;
    const isScriptBlock = (internalLoc === 'ScriptBlock');
    let choideOptions = [
        { key: 'ScriptBlock', text: 'Script Block', disabled: isViewMoideProp, isChecked: (internalLoc === 'ScriptBlock') },
        { key: 'ScriptLink', text: 'Script Link', disabled: isViewMoideProp, isChecked: (internalLoc === 'ScriptLink') },
        { key: 'StandardMenu', text: 'Standard Menu', disabled: isViewMoideProp, isChecked: (internalLoc === 'StandardMenu') }
    ];

    const onLocationChange = (option: IChoiceGroupOption, evt?: React.FormEvent<HTMLInputElement>) => {
        props.onInputChange(option.key, 'locationInternal');
    }
    let scriptTxtBoxLabel:string = '';
    let scriptTxtBoxKey:string = '';
    let scriptTxtBoxValue:string = '';
    let scriptTxtBoxIsMultipleLine:boolean = false;
    switch (internalLoc) {
                case 'ScriptLink':
                    scriptTxtBoxLabel = 'Script Link';
                    scriptTxtBoxKey = 'scriptLink';
                    scriptTxtBoxValue = props.item.scriptSrc;
                    break;
                case 'ScriptBlock':
                    scriptTxtBoxLabel = 'Script Block';
                    scriptTxtBoxKey = 'scriptBlock';
                    scriptTxtBoxValue = props.item.scriptBlock;
                    scriptTxtBoxIsMultipleLine = true;
                    break;
                case 'StandardMenu':
                    scriptTxtBoxLabel = 'Standard Menu';
                    scriptTxtBoxKey = 'url';
                    scriptTxtBoxValue = props.item.url;
                    break;

            }

    return <div className='ms-ListBasicExample-itemCell  ms-Grid-row' data-is-focusable={true}>
        <div className='ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11'>
            {!isViewMoideProp && <SpCustomActionsItemInput inputKey="title" label="Title" value={props.item.title} disabled={isViewMoideProp} onValueChange={props.onInputChange} />}
            <SpCustomActionsItemInput inputKey="name" label="Name" value={props.item.name} disabled={isViewMoideProp} onValueChange={props.onInputChange} />
            {!isViewMoideProp && <SpCustomActionsItemInput inputKey="description" label="Description" value={props.item.description} disabled={isViewMoideProp} onValueChange={props.onInputChange} />}
            {!isViewMoideProp && <SpCustomActionsItemInput inputKey="imageUrl" label="Image Url" value={props.item.imageUrl} disabled={isViewMoideProp} onValueChange={props.onInputChange} />}
            {!isViewMoideProp && <SpCustomActionsItemInput inputKey="group" label="Group" value={props.item.group} disabled={isViewMoideProp} onValueChange={props.onInputChange} />}
            <SpCustomActionsItemInput inputKey="sequence" label="Sequence" value={props.item.sequence} disabled={isViewMoideProp} type="number" required={true} onValueChange={props.onInputChange} />
            <ChoiceGroup options={choideOptions} label="Location" onChanged={onLocationChange} />
            <SpCustomActionsItemInput inputKey={scriptTxtBoxKey} label={scriptTxtBoxLabel} value={ scriptTxtBoxValue } disabled={isViewMoideProp} multipleLine={scriptTxtBoxIsMultipleLine} required={true} onValueChange={props.onInputChange} />
        </div>
        <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
            <Button buttonType={ButtonType.icon} icon={props.topButtonTex} rootProps={{ title: props.topButtonTex }} ariaLabel={props.topButtonTex} onClick={props.topButtonOnClick} />
            <Button buttonType={ButtonType.icon} icon={props.bottomButtonTex} rootProps={{ title: props.bottomButtonTex }} ariaLabel={props.bottomButtonTex} onClick={props.bottomButtonOnClick} />
        </div>
    </div>;

}
