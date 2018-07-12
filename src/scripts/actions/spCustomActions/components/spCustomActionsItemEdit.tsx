import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import propertyActionsCreatorsMap from "../actions/spCustomActionsActions";
import { customActionLocationHelper, ILocationItem } from "../helpers/customActionLocation";
import { ICustomAction, IMapStateToPropsState } from "../interfaces/spCustomActionsInterfaces";
import { spCustomActionsHistory } from "../router/spCustomActionsHistory";
import { IconButton } from "./../../common/components/iconButton";
import { IconRouteLink } from "./../../common/components/iconRouteLink";
import { WorkingOnIt } from "./../../common/components/workingOnIt";
import { CustomActionType } from "./../constants/enums";

interface IMapStateToPropsSpCustomActionsItemEdit {
    customActionType: CustomActionType;
    item: ICustomAction;
    isWorkingOnIt: boolean;
    locationItem: ILocationItem;
}

interface IMapDispatchToPropsSpCustomActionsItemEdit {
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>;
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>;
}

interface ISpCustomActionsItemEditProps {
    customActionType: CustomActionType;
    item: ICustomAction;
    isWorkingOnIt: boolean;
    locationItem: ILocationItem;
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>;
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>;
}
interface ISpCustomActionsItemEditState {
    item: ICustomAction;
}

class SpCustomActionsItemEdit extends React.Component<ISpCustomActionsItemEditProps, ISpCustomActionsItemEditState> {

    constructor(props: ISpCustomActionsItemEditProps) {
        super(props);
        this.state = { item: this.props.item };
        this.saveItem = this.saveItem.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.updateOrCreateSuccess = this.updateOrCreateSuccess.bind(this);
    }

    public render(): JSX.Element {
        let titleStr: string;
        if (this.props.item.id === "") {
            titleStr = "New Custom Action " + this.props.locationItem.name;
        } else {
            titleStr = "Custom Action id " + this.props.item.id;
        }
        const disableSaveBtn: boolean = !this.props.locationItem.validateForm(this.state.item);
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            return (
                <div>
                    <div className="ms-Grid-row">
                        <div className="ms-ListItem-actions ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                            <h2 className="ms-font-xl ms-fontSize-xl ms-u-textAlignCenter edit-form-title">
                                {titleStr}
                            </h2>
                        </div>
                    </div>
                    <div className="ms-ListBasicSpChromeDevTool-itemCell  ms-Grid-row" data-is-focusable={true}>
                        {this.props.locationItem.renderForm(this.state.item, this.onInputChange)}
                        <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                            <IconButton icon="Save" onClick={this.saveItem} title="Save" disabled={disableSaveBtn} />
                            <IconRouteLink icon="Cancel" route="/" title="Cancel" />
                        </div>
                    </div>
                </div>);
        }
    }
    private updateOrCreateSuccess() {
        spCustomActionsHistory.History.push("/");
    }
    private saveItem(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        if (this.state.item.id !== "") {
            this.props.updateCustomAction(this.state.item, this.props.customActionType).then(
                this.updateOrCreateSuccess);
        } else {
            this.props.createCustomAction(this.state.item, this.props.customActionType).then(
                this.updateOrCreateSuccess);
        }
        return false;
    }
    private onInputChange(value: string, key: string) {
        const newObj: any = {};
        newObj[key] = value;
        this.setState({ item: { ...this.state.item, ...newObj } });
    }

}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToPropsSpCustomActionsItemEdit => {
    const caGuid: string = ownProps.params.guid;
    const newCaType: string = ownProps.params.type;
    let ca: ICustomAction = null;
    let locItem: ILocationItem;
    if (caGuid) {
        const filtered = state.spCustomActionsReducer.customActions.filter((item: ICustomAction) => {
            return item.id === caGuid;
        });
        if (filtered.length > 0) {
            ca = filtered[0];
            locItem = customActionLocationHelper.getLocationItem(ca);
        } else {
            spCustomActionsHistory.History.push("/");
        }
    } else if (newCaType) {
        locItem = customActionLocationHelper.getLocationByKey(newCaType);
        ca = {
            description: "", group: "", id: "", imageUrl: "", location: locItem.spLocationName,
            locationInternal: "", name: "", registrationType: 0, scriptBlock: "",
            scriptSrc: "", sequence: 1, title: "", url: ""
        };
    }
    return {
        customActionType: state.spCustomActionsReducer.customActionType,
        item: ca,
        isWorkingOnIt: state.spCustomActionsReducer.isWorkingOnIt,
        locationItem: locItem
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToPropsSpCustomActionsItemEdit => {
    return {
        createCustomAction: (ca: ICustomAction, caType: CustomActionType): Promise<void> => {
            return dispatch(propertyActionsCreatorsMap.createCustomAction(ca, caType));
        },
        updateCustomAction: (ca: ICustomAction, caType: CustomActionType): Promise<void> => {
            return dispatch(propertyActionsCreatorsMap.updateCustomAction(ca, caType));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpCustomActionsItemEdit);
