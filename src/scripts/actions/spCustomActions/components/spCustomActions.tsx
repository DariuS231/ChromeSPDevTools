import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { WorkingOnIt } from './../../common/WorkingOnIt';
import MessageBar from './../../common/MessageBar';
import Utils from './../../common/utils';
import { ViewMode } from './../../common/enums';
import { CustomActionType } from './../constants/enums';
import SpCustomActionItem from './customActionItem'
import { SpCustomActionList } from './spCustomActionList'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { List } from 'office-ui-fabric-react/lib/List';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ICustomAction } from './../../common/interfaces'
import propertyActionsCreatorsMap from '../actions/SpCustomActionsActions';
import {
    SpCustomActionsProps,
    IMapStateToPropsState,
    IMapStateToProps,
    ISpCustomActionsActionCreatorsMapObject
} from '../interfaces/spCustomActionsInterfaces'

interface IMapDispatchToSpCustomActionsProps {
    actions: ISpCustomActionsActionCreatorsMapObject
}

class SpCustomActions extends React.Component<SpCustomActionsProps, {}> {
    constructor() {
        super();

        this.onFilterChange = this.onFilterChange.bind(this);
    }
    private workingOnIt(show: boolean): void {
        // this.setState({
        //     isWorkingOnIt: show
        // } as SpCustomActionsState);
    }
    private showMessage(messageType: MessageBarType, message: string): void {
        // this.setState({ messageType: messageType, message: message, showMessage: true } as SpCustomActionsState)
    }

    private onFilterChange(str: string) {
        // this.setState({ filterText: str } as SpCustomActionsState);
    }
    private onNewCuatomActionClick(e: any): void {
        // this.setState({
        //     mode: ViewMode.New
        // } as SpCustomActionsState);
    }
    private changeMode(e: any) {
        //this.setState({ mode: (this.state.mode === ViewMode.View ? ViewMode.Edit : ViewMode.View) } as SpCustomActionsState);
    }

    private componentDidMount(): void {
        this.props.actions.getAllCustomActions(CustomActionType.Web);
        //this.getCustomActions('', MessageBarType.success);
    }
    public getCustomActions() {

    }
    public render(): JSX.Element {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />
        } else {
            if (this.props.mode === ViewMode.View) {
                const filter: string = this.props.filterText.toLowerCase();
                const list = filter !== ''
                    ? this.props.customActions.filter((ca: ICustomAction, index: number) => {
                        return ca.name.toLowerCase().indexOf(filter) >= 0;
                    })
                    : this.props.customActions;
                return (
                    <div className="action-container sp-customActions">

                        <MessageBar
                            message={this.props.messageData.message}
                            messageType={this.props.messageData.type}
                            showMessage={this.props.messageData.showMessage} />

                        <div className="ms-Grid filters-container">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                                    <SearchBox onChange={this.onFilterChange} />
                                </div>
                                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6"> </div>
                            </div>
                        </div>
                        <SpCustomActionList
                            customActions={list}
                            workingOnIt={this.workingOnIt.bind(this)}
                            showMessage={this.showMessage.bind(this)}
                            reloadCActions={this.getCustomActions.bind(this)}
                            type={this.props.customActionType} />
                        <Button buttonType={ButtonType.primary}
                            onClick={this.onNewCuatomActionClick.bind(this)} >
                            New Custom Action
                        </Button>
                    </div>);
            } else {
                return (
                    <div className="action-container sp-customActions">
                        <SpCustomActionItem
                            workingOnIt={this.workingOnIt.bind(this)}
                            showMessage={this.showMessage.bind(this)}
                            reloadCActions={this.getCustomActions.bind(this)}
                            caType={this.props.customActionType} />
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
        mode: state.spCustomActions.mode,
        customActionType: state.spCustomActions.customActionType
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToSpCustomActionsProps => {
    return {
        actions: bindActionCreators(propertyActionsCreatorsMap, dispatch) as any
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpCustomActions);

