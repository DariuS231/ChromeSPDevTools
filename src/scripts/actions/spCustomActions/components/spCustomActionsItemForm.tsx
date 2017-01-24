
import * as React from 'react';
import { CustomActionType } from './../constants/enums';
import { ViewMode } from './../../common/enums';
import { SpCustomActionsItemInput } from './spCustomActionsItemInput'
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ICustomAction } from './../../common/interfaces'

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
    const choideOptions = [
        { key: 'ScriptBlock', text: 'Script Block', disabled: isViewMoideProp, isChecked: (internalLoc === 'ScriptBlock') },
        { key: 'ScriptLink', text: 'Script Link', disabled: isViewMoideProp, isChecked: (internalLoc === 'ScriptLink') }
    ];

    const onLocationChange = (option: IChoiceGroupOption, evt?: React.FormEvent<HTMLInputElement>) => {
        props.onInputChange(option.key, 'locationInternal');
    }

    return <div className='ms-ListBasicExample-itemCell  ms-Grid-row' data-is-focusable={true}>
        <div className='ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11'>
            {!isViewMoideProp && <SpCustomActionsItemInput inputKey="title" label="Title" value={props.item.title} disabled={isViewMoideProp} onValueChange={props.onInputChange} />}
            <SpCustomActionsItemInput inputKey="name" label="Name" value={props.item.name} disabled={isViewMoideProp} onValueChange={props.onInputChange} />
            {!isViewMoideProp && <SpCustomActionsItemInput inputKey="description" label="Description" value={props.item.description} disabled={isViewMoideProp} onValueChange={props.onInputChange} />}
            <SpCustomActionsItemInput inputKey="sequence" label="Sequence" value={props.item.sequence} disabled={isViewMoideProp} type="number" required={true} onValueChange={props.onInputChange} />
            <ChoiceGroup options={choideOptions} label="Location" onChanged={onLocationChange} />
            <SpCustomActionsItemInput inputKey={isScriptBlock ? 'scriptBlock' : 'scriptSrc'} label={isScriptBlock ? 'Script Code' : 'Script Src'} value={isScriptBlock ? props.item.scriptBlock : props.item.scriptSrc} disabled={isViewMoideProp} multipleLine={isScriptBlock || false} required={true} onValueChange={props.onInputChange} />
        </div>
        <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
            <Button buttonType={ButtonType.icon} icon={props.topButtonTex} rootProps={{ title: props.topButtonTex }} ariaLabel={props.topButtonTex} onClick={props.topButtonOnClick} />
            <Button buttonType={ButtonType.icon} icon={props.bottomButtonTex} rootProps={{ title: props.bottomButtonTex }} ariaLabel={props.bottomButtonTex} onClick={props.bottomButtonOnClick} />
        </div>
    </div>;

}
