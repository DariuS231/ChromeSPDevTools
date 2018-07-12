
import * as React from "react";
import { ICustomAction } from "../interfaces/spCustomActionsInterfaces";
import { SpCustomActionsItemInput } from "./spCustomActionsItemInput";

interface ISpCustomActionsItemFormScriptLinkProps {
    item: ICustomAction;
    onInputChange: (value: string, inputKey: string) => void;
    isScriptBlock: boolean;
}

const SpCustomActionsItemFormScriptLink: React.StatelessComponent<ISpCustomActionsItemFormScriptLinkProps> =
    (props: ISpCustomActionsItemFormScriptLinkProps) => {
        let scriptTxtBoxLabel: string = "";
        let scriptTxtBoxKey: string = "";
        let scriptTxtBoxValue: string = "";
        if (props.isScriptBlock) {
            scriptTxtBoxLabel = "Script Block";
            scriptTxtBoxKey = "scriptBlock";
            scriptTxtBoxValue = props.item.scriptBlock;
        } else {
            scriptTxtBoxLabel = "Script Link";
            scriptTxtBoxKey = "scriptSrc";
            scriptTxtBoxValue = props.item.scriptSrc;
        }

        return (
            <div className="ms-ListBasicSpChromeDevTool-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11">
                <SpCustomActionsItemInput inputKey="title" label="Title"
                    value={props.item.title} onValueChange={props.onInputChange} />
                <SpCustomActionsItemInput inputKey="name" label="Name" value={props.item.name}
                    onValueChange={props.onInputChange} />
                <SpCustomActionsItemInput inputKey="description" label="Description"
                    value={props.item.description} onValueChange={props.onInputChange} />
                <SpCustomActionsItemInput inputKey="sequence" label="Sequence" value={props.item.sequence}
                    type="number" required={true} onValueChange={props.onInputChange} />
                <SpCustomActionsItemInput inputKey={scriptTxtBoxKey} label={scriptTxtBoxLabel} value={scriptTxtBoxValue}
                    multipleLine={props.isScriptBlock} required={true} onValueChange={props.onInputChange} />
            </div>);
    };

export default SpCustomActionsItemFormScriptLink;
