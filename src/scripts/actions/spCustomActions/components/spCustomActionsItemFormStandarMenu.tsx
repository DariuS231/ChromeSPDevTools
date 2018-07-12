
import * as React from "react";
import { ICustomAction } from "../interfaces/spCustomActionsInterfaces";
import { SpCustomActionsItemInput } from "./spCustomActionsItemInput";
import { SpCustomActionsItemSelect } from "./spCustomActionsItemSelect";

interface ISpCustomActionsItemFormStandarMenuProps {
    item: ICustomAction;
    onInputChange: (value: string, inputKey: string) => void;
}

const SpCustomActionsItemFormStandarMenu: React.StatelessComponent<ISpCustomActionsItemFormStandarMenuProps> =
    (props: ISpCustomActionsItemFormStandarMenuProps) => {
        const options: any[] = [
            {
                key: "ActionsMenu",
                text: "ActionsMenu"
            }, {
                key: "SiteActions",
                text: "SiteActions"
            }
        ];
        return (
            <div className="ms-ListBasicSpChromeDevTool-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11">
                <SpCustomActionsItemInput inputKey="title" label="Title"
                    value={props.item.title} onValueChange={props.onInputChange} />
                <SpCustomActionsItemInput inputKey="name" label="Name"
                    value={props.item.name} onValueChange={props.onInputChange} />
                <SpCustomActionsItemInput inputKey="description" label="Description"
                    value={props.item.description} onValueChange={props.onInputChange} />
                <SpCustomActionsItemInput inputKey="imageUrl" label="Image Url" value={props.item.imageUrl}
                    onValueChange={props.onInputChange} />
                <SpCustomActionsItemSelect selectKey="group" label="Group" value={props.item.group} required={true}
                    onValueChange={props.onInputChange} options={options} />
                <SpCustomActionsItemInput inputKey="sequence" label="Sequence" value={props.item.sequence}
                    type="number" required={true} onValueChange={props.onInputChange} />
                <SpCustomActionsItemInput inputKey="url" label="Url" value={props.item.url} required={true}
                    onValueChange={props.onInputChange} />
            </div>);
    };

export default SpCustomActionsItemFormStandarMenu;
