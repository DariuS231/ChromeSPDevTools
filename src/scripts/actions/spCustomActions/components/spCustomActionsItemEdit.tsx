import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'react-router';
import propertyActionsCreatorsMap from '../actions/SpCustomActionsActions';
import { IMapStateToPropsState, ICustomAction } from '../interfaces/spCustomActionsInterfaces';
import { CustomActionType } from './../constants/enums';
import { customActionLocationHelper } from '../helpers/customActionLocation'
import { hashHistory } from 'react-router'

interface IMapStateToPropsSpCustomActionsItemEdit {
    customActionType: CustomActionType,
    item: ICustomAction
}

interface IMapDispatchToPropsSpCustomActionsItemEdit {
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>,
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>
}

interface SpCustomActionsItemEditProps {
    customActionType: CustomActionType,
    item: ICustomAction,
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>,
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => Promise<void>
}
interface SpCustomActionsItemEditState {
    item: ICustomAction
}
class SpCustomActionsItemEdit extends React.Component<SpCustomActionsItemEditProps, SpCustomActionsItemEditState> {
    constructor(props: SpCustomActionsItemEditProps) {
        super(props);
        this.state = { item: this.props.item }
        this.saveItem = this.saveItem.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    private saveItem() {
        if (this.state.item.id !== '') {
            this.props.updateCustomAction(this.state.item, this.props.customActionType).then(()=>{
                hashHistory.push('/');
            });
        } else {
            this.props.createCustomAction(this.state.item, this.props.customActionType).then(()=>{
                hashHistory.push('/');
            });
        }
    }
    private onInputChange(value: string, key: string) {
        let newObj: any = {};
        newObj[key] = value;
        this.setState({ item: Object.assign({}, this.state.item, newObj) });
    }

    public render(): JSX.Element {
        let titleStr: string;
        if (this.props.item.id === '') {
            titleStr = "New Custom Action " + this.props.item.location;
        } else {
            titleStr = "Custom Action id " + this.props.item.id;
        }
        return (<div>
            <div className='ms-Grid-row'>
                <div className="ms-ListItem-actions ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <h2 className="ms-font-xl ms-fontSize-xl ms-u-textAlignCenter edit-form-title">{titleStr}</h2>
                </div>
            </div>
            <div className='ms-ListBasicExample-itemCell  ms-Grid-row' data-is-focusable={true}>
                {
                    customActionLocationHelper.getFormComponent(this.state.item, this.onInputChange)
                }
                <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                    <Button buttonType={ButtonType.icon} icon="Save" rootProps={{ title: "Save" }} ariaLabel="Save" onClick={this.saveItem} />
                    <Link title="Cancel" aria-label="Cancel" className="ms-Button ms-Button--icon" to={'/'}>
                        <span className="ms-Button-icon"><i className="ms-Icon ms-Icon--Cancel"></i></span><span className="ms-Button-label" ></span>
                    </Link>
                </div>
            </div>
        </div>);
    }
}


const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToPropsSpCustomActionsItemEdit => {
    const caGuid: string = ownProps.params.guid;
    const newCaType: string = ownProps.params.type;
    let ca: ICustomAction = null;
    if (caGuid) {
        const filtered = state.spCustomActions.customActions.filter((item: ICustomAction) => {
            return item.id === caGuid;
        });
        if (filtered.length > 0) {
            ca = filtered[0];
        }
    } else if (newCaType) {
        let locationString: string = customActionLocationHelper.getSpLocationNameByType(newCaType);
        ca = {
            id: '', name: '', title: '', description: '', group: '', imageUrl: '',
            locationInternal: '', registrationType: 0, scriptBlock: '', scriptSrc: '', sequence: 1,
            url: '', location: locationString
        }

    }
    return {
        customActionType: state.spCustomActions.customActionType,
        item: ca
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToPropsSpCustomActionsItemEdit => {
    return {
        createCustomAction: (ca: ICustomAction, caType: CustomActionType): Promise<void> => {
            return dispatch(propertyActionsCreatorsMap.createCustomAction(ca, caType));
        },
        updateCustomAction: (ca: ICustomAction, caType: CustomActionType): Promise<void> => {
            return dispatch(propertyActionsCreatorsMap.updateCustomAction(ca, caType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpCustomActionsItemEdit);