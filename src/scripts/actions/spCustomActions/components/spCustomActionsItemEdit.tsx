import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import SpCustomActionsItemFormScriptLink from './spCustomActionsItemFormScriptLink'
import SpCustomActionsItemFormStandarMenu from './spCustomActionsItemFormStandarMenu'
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'react-router';
import propertyActionsCreatorsMap from '../actions/SpCustomActionsActions';
import { IMapStateToPropsState, ICustomAction } from '../interfaces/spCustomActionsInterfaces';
import { CustomActionType, CustomActionLocation } from './../constants/enums';
import { CustomActionLocationString } from './../constants/constants';

interface IMapStateToPropsSpCustomActionsItemEdit {
    customActionType: CustomActionType,
    item: ICustomAction,
    itemLocation: CustomActionLocation
}

interface IMapDispatchToPropsSpCustomActionsItemEdit {
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => void,
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => void
}

interface SpCustomActionsItemEditProps {
    customActionType: CustomActionType,
    item: ICustomAction,
    itemLocation: CustomActionLocation,
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => void,
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => void
}
interface SpCustomActionsItemEditState {
    item: ICustomAction
}
class SpCustomActionsItemEdit extends React.Component<SpCustomActionsItemEditProps, SpCustomActionsItemEditState> {
    constructor() {
        super();
        this.saveItem = this.saveItem.bind(this);
        this.formInputs = this.formInputs.bind(this);
    }

    private saveItem() {
        if (this.state.item.id !== '') {
            this.props.updateCustomAction(this.state.item, this.props.customActionType);
        } else {
            this.props.createCustomAction(this.state.item, this.props.customActionType);
        }
    }
    private onInputChange(value: string, key: string) {
        let newObj: any = {};
        newObj[key] = value;
        this.setState({ item: Object.assign({}, this.state.item, newObj) });
    }
    private formInputs(): JSX.Element {
        switch (this.props.itemLocation) {
            case CustomActionLocation.ScriptBlock:
                return <SpCustomActionsItemFormScriptLink item={this.props.item} onInputChange={this.onInputChange} isScriptBlock={true} />;
            case CustomActionLocation.ScriptSrc:
                return <SpCustomActionsItemFormScriptLink item={this.props.item} onInputChange={this.onInputChange} isScriptBlock={false} />;
            case CustomActionLocation.StandarMenu:
                return <SpCustomActionsItemFormStandarMenu item={this.props.item} onInputChange={this.onInputChange} />;
        }
    }
    public render(): JSX.Element {
        return (<div className='ms-ListBasicExample-itemCell  ms-Grid-row' data-is-focusable={true}>
            {this.formInputs()}
            <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                <Button buttonType={ButtonType.icon} icon="Save" rootProps={{ title: "Save" }} ariaLabel="Save" onClick={this.saveItem} />
                <Link title="Cancel" aria-label="Cancel" className="ms-Button ms-Button--icon" to={'/'}>
                    <span className="ms-Button-icon"><i className="ms-Icon ms-Icon--Cancel"></i></span><span className="ms-Button-label" ></span>
                </Link>
            </div>
        </div>
        );
    }
}


const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToPropsSpCustomActionsItemEdit => {
    const caGuid: string = ownProps.params.guid;
    const newCaType: string = ownProps.params.type;
    let ca: ICustomAction = null;
    let itemLocation: CustomActionLocation;
    if (caGuid) {
        const filtered = state.spCustomActions.customActions.filter((item: ICustomAction, index: number) => {
            return item.id === caGuid;
        });
        if (filtered.length > 0) {
            ca = filtered[0];
        }
        switch (ca.location) {
            case CustomActionLocationString.SCRIPTLINK:
                itemLocation = (ca.scriptBlock !== '')
                    ? CustomActionLocation.ScriptSrc
                    : CustomActionLocation.ScriptBlock;
                break;
            case CustomActionLocationString.STANDARMENU:
                itemLocation = CustomActionLocation.StandarMenu;
                break;
        }
    } else if (newCaType) {
        let locationString: string;
        switch (newCaType) {
            case CustomActionLocation[CustomActionLocation.ScriptSrc]:
                itemLocation = CustomActionLocation.ScriptSrc;
                locationString = CustomActionLocationString.SCRIPTLINK;
                break;
            case CustomActionLocation[CustomActionLocation.ScriptBlock]:
                itemLocation = CustomActionLocation.ScriptBlock;
                locationString = CustomActionLocationString.SCRIPTLINK;
                break;
            case CustomActionLocation[CustomActionLocation.StandarMenu]:
                itemLocation = CustomActionLocation.StandarMenu;
                locationString = CustomActionLocationString.STANDARMENU;
                break;
        }

        ca = {
            id: '', name: '', title: '', description: '', group: '', imageUrl: '',
            locationInternal: '', registrationType: 0, scriptBlock: '', scriptSrc: '', sequence: 1,
            url: '', location: locationString
        }

    }
    return {
        customActionType: state.spCustomActions.customActionType,
        item: ca,
        itemLocation: itemLocation
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToPropsSpCustomActionsItemEdit => {
    return {
        createCustomAction: (ca: ICustomAction, caType: CustomActionType) => {
            dispatch(propertyActionsCreatorsMap.createCustomAction(ca, caType));
        },
        updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => {
            dispatch(propertyActionsCreatorsMap.updateCustomAction(ca, caType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpCustomActionsItemEdit);