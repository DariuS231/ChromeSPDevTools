import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import SpCustomActionsItemForm from './spCustomActionsItemForm'
import propertyActionsCreatorsMap from '../actions/SpCustomActionsActions';
import { IMapStateToPropsState, ICustomAction } from '../interfaces/spCustomActionsInterfaces';
import { CustomActionType } from './../constants/enums';

interface IMapStateToPropsSpCustomActionsItemEdit {
    customActionType: CustomActionType,
    item: ICustomAction,
}

interface IMapDispatchToPropsSpCustomActionsItemEdit {
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => void,
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => void
}

interface SpCustomActionsItemEditProps {
    customActionType: CustomActionType,
    item: ICustomAction,
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => void,
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => void
}
interface SpCustomActionsItemEditState {
    item: ICustomAction
}
class SpCustomActionsItemEdit extends React.Component<SpCustomActionsItemEditProps, SpCustomActionsItemEditState> {
    private onInputChange(value: string, key: string) {
        let newObj: any = {};
        newObj[key] = value;
        this.setState({
            item: Object.assign({}, this.state.item, newObj)
        });
    }

    private saveItem() {

    }

    public render(): JSX.Element {
        return (<SpCustomActionsItemForm item={this.props.item} onInputChange={this.onInputChange} onSaveButtonClick={this.saveItem} />);
    }
}


const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToPropsSpCustomActionsItemEdit => {
    const caGuid = ownProps.params.guid;
    let ca: ICustomAction = {
        id: '',
        name: '',
        title: '',
        description: '',
        group: '',
        imageUrl: '',
        location: '',
        locationInternal: '',
        registrationType: 0,
        scriptBlock: '',
        scriptSrc: '',
        sequence: 1,
        url: '',
    }
    if (caGuid) {
        const filtered = state.spCustomActions.customActions.filter((item: ICustomAction, index: number) => {
            return item.id === caGuid;
        });
        if (filtered.length > 0) {
            ca = filtered[0];
        }
    }
    return {
        customActionType: state.spCustomActions.customActionType,
        item: ca
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