
import * as React from 'react';
import { CustomActionType } from './../constants/enums';
import { SpCustomActionsItemInput } from './spCustomActionsItemInput'
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ICustomAction } from '../interfaces/spCustomActionsInterfaces';
import { Link } from 'react-router';

interface SpCustomActionsItemFormProps {
    item: ICustomAction,
    onInputChange: (value: string, inputKey: string) => void,
    onSaveButtonClick: (e: any) => void
}

const SpCustomActionsItemForm: React.StatelessComponent<SpCustomActionsItemFormProps> = (props: SpCustomActionsItemFormProps) => {
    const internalLoc = props.item.locationInternal;
    const isScriptBlock = (internalLoc === 'ScriptBlock');
    let choideOptions = [
        { key: 'ScriptBlock', text: 'Script Block', disabled: false, isChecked: (internalLoc === 'ScriptBlock') },
        { key: 'ScriptLink', text: 'Script Link', disabled: false, isChecked: (internalLoc === 'ScriptLink') },
        { key: 'StandardMenu', text: 'Standard Menu', disabled: false, isChecked: (internalLoc === 'StandardMenu') }
    ];

    let scriptTxtBoxLabel: string = '';
    let scriptTxtBoxKey: string = '';
    let scriptTxtBoxValue: string = '';
    let scriptTxtBoxIsMultipleLine: boolean = false;
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
            <SpCustomActionsItemInput inputKey="title" label="Title" value={props.item.title} disabled={false} onValueChange={props.onInputChange} />
            <SpCustomActionsItemInput inputKey="name" label="Name" value={props.item.name} disabled={false} onValueChange={props.onInputChange} />
            <SpCustomActionsItemInput inputKey="description" label="Description" value={props.item.description} disabled={false} onValueChange={props.onInputChange} />
            <SpCustomActionsItemInput inputKey="imageUrl" label="Image Url" value={props.item.imageUrl} disabled={false} onValueChange={props.onInputChange} />
            <SpCustomActionsItemInput inputKey="group" label="Group" value={props.item.group} disabled={false} onValueChange={props.onInputChange} />
            <SpCustomActionsItemInput inputKey="sequence" label="Sequence" value={props.item.sequence} disabled={false} type="number" required={true} onValueChange={props.onInputChange} />
            <SpCustomActionsItemInput inputKey={scriptTxtBoxKey} label={scriptTxtBoxLabel} value={scriptTxtBoxValue} disabled={false} multipleLine={scriptTxtBoxIsMultipleLine} required={true} onValueChange={props.onInputChange} />
        </div>
        <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">

            <Button buttonType={ButtonType.icon} icon="Save" rootProps={{ title: "Save" }} ariaLabel="Save" onClick={props.onSaveButtonClick} />

            <Link title="Cancel" aria-label="Cancel" className="ms-Button ms-Button--icon" to={'/'}>
                <span className="ms-Button-icon"><i className="ms-Icon ms-Icon--Cancel"></i></span><span className="ms-Button-label" ></span>
            </Link>
        </div>
    </div>;

}

export default SpCustomActionsItemForm;