
import * as React from 'react';
import { SpCustomActionsItemInput } from './spCustomActionsItemInput'
import { ICustomAction } from '../interfaces/spCustomActionsInterfaces';


interface SpCustomActionsItemFormStandarMenuProps {
    item: ICustomAction,
    onInputChange: (value: string, inputKey: string) => void
}

const SpCustomActionsItemFormStandarMenu: React.StatelessComponent<SpCustomActionsItemFormStandarMenuProps> = (props: SpCustomActionsItemFormStandarMenuProps) => {
    return <div className='ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11'>
        <SpCustomActionsItemInput inputKey="title" label="Title" value={props.item.title} onValueChange={props.onInputChange} />
        <SpCustomActionsItemInput inputKey="name" label="Name" value={props.item.name} onValueChange={props.onInputChange} />
        <SpCustomActionsItemInput inputKey="description" label="Description" value={props.item.description} onValueChange={props.onInputChange} />
        <SpCustomActionsItemInput inputKey="imageUrl" label="Image Url" value={props.item.imageUrl} onValueChange={props.onInputChange} />
        <SpCustomActionsItemInput inputKey="group" label="Group" value={props.item.group} onValueChange={props.onInputChange} />
        <SpCustomActionsItemInput inputKey="sequence" label="Sequence" value={props.item.sequence} type="number" required={true} onValueChange={props.onInputChange} />
        <SpCustomActionsItemInput inputKey="url" label="Url" value={props.item.url} required={true} onValueChange={props.onInputChange} />
    </div>;
}

export default SpCustomActionsItemFormStandarMenu;