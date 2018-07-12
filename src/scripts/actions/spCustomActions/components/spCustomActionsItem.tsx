
import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import propertyActionsCreatorsMap from "../actions/spCustomActionsActions";
import { ICustomAction, IMapStateToPropsState } from "../interfaces/spCustomActionsInterfaces";
import { IconButton } from "./../../common/components/iconButton";
import { IconRouteLink } from "./../../common/components/iconRouteLink";
import { ViewMode } from "./../../common/enums";
import Utils from "./../../common/utils";
import { CustomActionType } from "./../constants/enums";
import { SpCustomActionsItemInput } from "./spCustomActionsItemInput";

interface ICustomActionItemProps {
    item: ICustomAction;
    caType: CustomActionType;
    deleteCustomAction: (ca: ICustomAction, caType: CustomActionType) => void;
}

const CustomActionItem: React.StatelessComponent<ICustomActionItemProps> = (props: ICustomActionItemProps) => {

    const deleteCustomAction = (event: any) => {
        event.preventDefault();
        if (confirm("Are you sure you want to remove this Custom Action?")) {
            props.deleteCustomAction(props.item, props.caType);
        }
        return false;
    };

    let valueInput: JSX.Element;
    switch (props.item.location) {
        case "Microsoft.SharePoint.StandardMenu":
            valueInput = (<TextField resizable={false} label="Url" value={props.item.url} disabled={true} />);
            break;
        case "ScriptLink":
            if (props.item.scriptSrc) {
                valueInput = (
                    <TextField resizable={false} label="Script Src" value={props.item.scriptSrc} disabled={true} />);
            } else {
                valueInput = (
                    <TextField resizable={false} label="Script Block" value={props.item.scriptBlock} disabled={true}
                        multiline={true} />
                );
            }
            break;
        default:
            valueInput = null;
            break;
    }

    return (
        <div className="ms-ListBasicSpChromeDevTool-itemCell  ms-Grid-row" data-is-focusable={true}>
            <div className="ms-ListBasicSpChromeDevTool-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11">
                <TextField resizable={false} label="Name" value={props.item.name} disabled={true} />
                <TextField resizable={false} label="Sequence" value={props.item.sequence.toString()} disabled={true} />
                <TextField resizable={false} label="Location" value={props.item.location} disabled={true} />
                {valueInput}
            </div>
            <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                <IconButton icon="Delete" onClick={deleteCustomAction} title="Delete" />
                <IconRouteLink icon="Edit" route={"item/" + props.item.id} title="Edit" />
            </div>
        </div>);

};

export default CustomActionItem;
