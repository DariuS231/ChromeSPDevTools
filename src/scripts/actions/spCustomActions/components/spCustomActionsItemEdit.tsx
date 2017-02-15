import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import * as React from "react";
import { connect } from "react-redux";
import { createMemoryHistory, Link } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import propertyActionsCreatorsMap from "../actions/SpCustomActionsActions";
import { customActionLocationHelper, ILocationItem } from "../helpers/customActionLocation";
import { ICustomAction, IMapStateToPropsState } from "../interfaces/spCustomActionsInterfaces";
import { CustomActionType } from "./../constants/enums";

interface IMapStateToPropsSpCustomActionsItemEdit {
    customActionType: CustomActionType;
    item: ICustomAction;
    locationItem: ILocationItem;
}

interface IMapDispatchToPropsSpCustomActionsItemEdit {
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>;
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>;
}

interface ISpCustomActionsItemEditProps {
    customActionType: CustomActionType;
    item: ICustomAction;
    locationItem: ILocationItem;
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>;
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>;
}
interface ISpCustomActionsItemEditState {
    item: ICustomAction;
}

        const memoryHistory = createMemoryHistory(window.location);
class SpCustomActionsItemEdit extends React.Component<ISpCustomActionsItemEditProps, ISpCustomActionsItemEditState> {

    constructor(props: ISpCustomActionsItemEditProps) {
        super(props);
        this.state = { item: this.props.item };
        this.saveItem = this.saveItem.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    public render(): JSX.Element {
        let titleStr: string;
        if (this.props.item.id === "") {
            titleStr = "New Custom Action " + this.props.locationItem.name;
        } else {
            titleStr = "Custom Action id " + this.props.item.id;
        }
        return (<div>
            <div className="ms-Grid-row">
                <div className="ms-ListItem-actions ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <h2 className="ms-font-xl ms-fontSize-xl ms-u-textAlignCenter edit-form-title">{titleStr}</h2>
                </div>
            </div>
            <div className="ms-ListBasicExample-itemCell  ms-Grid-row" data-is-focusable={true}>
                {this.props.locationItem.renderForm(this.state.item, this.onInputChange)}
                <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                    <Button
                        buttonType={ButtonType.icon}
                        icon="Save"
                        rootProps={{ title: "Save" }}
                        ariaLabel="Save"
                        onClick={this.saveItem}
                    />
                    <Link title="Cancel" aria-label="Cancel" className="ms-Button ms-Button--icon" to={"/"}>
                        <span className="ms-Button-icon">
                            <i className="ms-Icon ms-Icon--Cancel" />
                        </span>
                        <span className="ms-Button-label" />
                    </Link>
                </div>
            </div>
        </div>);
    }
    private saveItem() {
        if (this.state.item.id !== "") {
            this.props.updateCustomAction(this.state.item, this.props.customActionType).then(() => {
                memoryHistory.push("/");
            });
        } else {
            this.props.createCustomAction(this.state.item, this.props.customActionType).then(() => {
                memoryHistory.push("/");
            });
        }
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
            memoryHistory.push("/");
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
