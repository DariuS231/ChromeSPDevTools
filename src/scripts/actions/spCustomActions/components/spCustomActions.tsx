import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { WorkingOnIt } from './../../common/components/WorkingOnIt';
import MessageBar from './../../common/components/MessageBar';
import { ViewMode } from './../../common/enums';
import { CustomActionType } from './../constants/enums';
import SpCustomActionItem from './spCustomActionsItem'
import { SpCustomActionList } from './spCustomActionsList'
import FilterTextBox from './../../common/components/filterTextBox';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import propertyActionsCreatorsMap from '../actions/SpCustomActionsActions';
import { SpCustomActionsProps, IMapStateToPropsState, IMapStateToProps, ISpCustomActionsActionCreatorsMapObject } from '../interfaces/spCustomActionsInterfaces'

interface IMapDispatchToSpCustomActionsProps {
    actions: ISpCustomActionsActionCreatorsMapObject
}

class SpCustomActions extends React.Component<SpCustomActionsProps, {}> {
    constructor() {
        super();
    }
    private onNewCuatomActionClick(e: any): void {

    }

    private componentDidMount(): void {
        this.props.actions.getAllCustomActions(this.props.customActionType);
    }

    public render(): JSX.Element {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />
        } else {
            if (this.props.mode === ViewMode.View) {
                return (
                    <div className="action-container sp-customActions">
                        <MessageBar message={this.props.messageData.message} messageType={this.props.messageData.type} showMessage={this.props.messageData.showMessage} />
                        <FilterTextBox setFilterText={this.props.actions.setFilterText} filterStr={this.props.filterText} />
                        <SpCustomActionList customActions={this.props.customActions} type={this.props.customActionType} filtertText={this.props.filterText} />
                        <Button buttonType={ButtonType.primary} onClick={this.onNewCuatomActionClick.bind(this)} >New Custom Action</Button>
                    </div>);
            } else {
                return (
                    <div className="action-container sp-customActions">
                        <SpCustomActionItem caType={this.props.customActionType} />
                    </div>);
            }
        }
    }
}



const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        currentUserHasPermissions: state.spCustomActions.userHasPermission,
        customActions: state.spCustomActions.customActions,
        isWorkingOnIt: state.spCustomActions.isWorkingOnIt,
        messageData: state.spCustomActions.messageData,
        filterText: state.spCustomActions.filterText,
        mode: state.spCustomActions.mode
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToSpCustomActionsProps => {
    return {
        actions: bindActionCreators(propertyActionsCreatorsMap, dispatch) as any
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpCustomActions);

