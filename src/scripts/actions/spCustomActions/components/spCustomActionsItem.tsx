
import * as React from "react";
import { connect } from "react-redux"
import { bindActionCreators, Dispatch } from "redux"
import { CustomActionType } from "./../constants/enums";
import { ViewMode } from "./../../common/enums";
import Utils from "./../../common/utils";
import { ICustomAction, IMapStateToPropsState } from "../interfaces/spCustomActionsInterfaces";
import propertyActionsCreatorsMap from "../actions/SpCustomActionsActions";
import { SpCustomActionsItemInput } from "./spCustomActionsItemInput";
import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Link } from "react-router";

interface CustomActionItemProps {
    item: ICustomAction,
    caType: CustomActionType,
    deleteCustomAction: (ca: ICustomAction, caType: CustomActionType) => void
}

const CustomActionItem: React.StatelessComponent<CustomActionItemProps> = (props: CustomActionItemProps) => {

    const deleteCustomAction = (e: any) => {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this Custom Action?")) {
            this.props.deleteCustomAction(this.props.item, this.props.caType);
        }
        return false;
    }

    let valueInput: JSX.Element;
    switch(props.item.location){
        case "Microsoft.SharePoint.StandardMenu":
            valueInput = (<TextField resizable={false} label="Url" value={props.item.url} disabled={true} />);
            break;
        case "ScriptLink":
            if(props.item.scriptSrc){
                valueInput = (<TextField resizable={false} label="Script Src" value={props.item.scriptSrc} disabled={true} />);
            } else {
                valueInput = (<TextField resizable={false} label="Script Block" value={props.item.scriptBlock} disabled={true} multiline={true} />) ;
            }
            break;
    }

    return <div className="ms-ListBasicExample-itemCell  ms-Grid-row" data-is-focusable={true}>
        <div className="ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11">
            <TextField resizable={false} label="Name" value={props.item.name} disabled={true} />
            <TextField resizable={false} label="Sequence" value={props.item.sequence.toString()} disabled={true} />
            <TextField resizable={false} label="Location" value={props.item.location} disabled={true} />
            {valueInput}
        </div>
        <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
            <Button buttonType={ButtonType.icon} icon="Delete" rootProps={{ title: "Delete" }} ariaLabel="Delete" onClick={deleteCustomAction} />
            <Link title="Edit" aria-label="Edit" className="ms-Button ms-Button--icon" to={"item/" + props.item.id}>
                <span className="ms-Button-icon"><i className="ms-Icon ms-Icon--Edit"></i></span><span className="ms-Button-label" ></span>
            </Link>
        </div>
    </div>;

}

export default CustomActionItem;
