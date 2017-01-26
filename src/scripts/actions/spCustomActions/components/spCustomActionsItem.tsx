
import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { CustomActionType } from './../constants/enums';
import { ViewMode } from './../../common/enums';
import Utils from './../../common/utils';
import { SpCustomActionsItemForm } from './SpCustomActionsItemForm'
import { ICustomAction } from '../interfaces/spCustomActionsInterfaces';
import propertyActionsCreatorsMap from '../actions/SpCustomActionsActions';

interface IMapDispatchToCustomActionItemProps {
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => void,
    deleteCustomAction: (ca: ICustomAction, caType: CustomActionType) => void,
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => void
}
interface CustomActionItemProps {
    item?: ICustomAction,
    caType: CustomActionType,
    changeParentMode?: (e: any) => void,
    createCustomAction: (ca: ICustomAction, caType: CustomActionType) => void,
    deleteCustomAction: (ca: ICustomAction, caType: CustomActionType) => void,
    updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => void
}
interface CustomActionItemState {
    mode: ViewMode,
    item: ICustomAction
}

class CustomActionItem extends React.Component<CustomActionItemProps, CustomActionItemState> {
    emptyCa: ICustomAction = {
        name: '', description: '', id: '', title: '', group:'',
        scriptSrc: '', scriptBlock: '', location: '', url: '',
        locationInternal: 'ScriptBlock', sequence: 3
    } as ICustomAction;
    constructor() {
        super();
        this.state = {
            mode: ViewMode.View,
            item: this.emptyCa
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.deleteCustomAction = this.deleteCustomAction.bind(this);
        this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }

    componentDidMount() {
        let propIetm = this.props.item;
        let caItem: ICustomAction = this.emptyCa;
        let caMode: ViewMode = ViewMode.View;
        if (propIetm) {
            caItem = propIetm;
        } else {
            caMode = ViewMode.New;
        }
        this.setState({ item: caItem, mode: caMode } as CustomActionItemState);
    }
    componentWillReceiveProps(newProps: CustomActionItemProps) {

        this.setState({ item: newProps.item } as CustomActionItemState);
    }

    private deleteCustomAction(e: any) {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this Custom Action?")) {
            this.props.deleteCustomAction(this.state.item, this.props.caType);
        }
        return false;
    }


    private onSaveBtnClick(e: any) {
        e.preventDefault();
        if (this.state.mode === ViewMode.Edit) {
            this.props.updateCustomAction(this.state.item, this.props.caType);
        } else {
            this.props.changeParentMode(e);
            this.props.createCustomAction(this.state.item, this.props.caType);
        }
        return false;
    }
    private onInputChange(value: string, key: string) {
        let newObj: any = {};
        newObj[key] = value;
        this.setState({
            item: Object.assign({}, this.state.item, newObj)
        } as CustomActionItemState)
    }

    private changeMode(e: any) {
        e.preventDefault();
        this.setState({
            mode: (this.state.mode === ViewMode.View ? ViewMode.Edit : ViewMode.View),
            item: this.state.item
        });
        return false;
    }

    public render() {
        let isViewMode: boolean = this.state.mode === ViewMode.View;
        const topBtnText = !isViewMode ? 'Save' : 'Delete';
        const bottomBtnText = !isViewMode ? 'Cancel' : 'Edit';

        return <SpCustomActionsItemForm
            item={this.state.item}
            isViewMode={isViewMode}
            onInputChange={this.onInputChange}
            topButtonTex={topBtnText}
            bottomButtonTex={bottomBtnText}
            topButtonOnClick={isViewMode ? this.deleteCustomAction : this.onSaveBtnClick}
            bottomButtonOnClick={this.props.changeParentMode || this.changeMode} />;
    }
}


const mapStateToProps = (state: CustomActionItemState, ownProps: any): {} => {
    return {}
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToCustomActionItemProps => {
    return {
        createCustomAction: (ca: ICustomAction, caType: CustomActionType) => {
            dispatch(propertyActionsCreatorsMap.createCustomAction(ca, caType));
        },
        deleteCustomAction: (ca: ICustomAction, caType: CustomActionType) => {
            dispatch(propertyActionsCreatorsMap.deleteCustomAction(ca, caType));
        },
        updateCustomAction: (ca: ICustomAction, caType: CustomActionType) => {
            dispatch(propertyActionsCreatorsMap.updateCustomAction(ca, caType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomActionItem);
