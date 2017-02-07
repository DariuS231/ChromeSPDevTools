import * as React from "react";
import { connect } from "react-redux"
import { bindActionCreators, Dispatch } from "redux"
import { WorkingOnIt } from "./../../common/components/WorkingOnIt";
import MessageBar from "./../../common/components/MessageBar";
import { SpCustomActionList } from "./spCustomActionsList"
import { SpCustomActionsButtom } from "./spCustomActionsButtom"
import FilterTextBox from "./../../common/components/filterTextBox";
import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import propertyActionsCreatorsMap from "../actions/SpCustomActionsActions";
import { ISpCustomActionsProps, IMapStateToPropsState, IMapStateToProps, ISpCustomActionsActionCreatorsMapObject } from "../interfaces/spCustomActionsInterfaces";

interface IMapDispatchToISpCustomActionsProps {
    actions: ISpCustomActionsActionCreatorsMapObject
}
class SpCustomActions extends React.Component<ISpCustomActionsProps, {}> {
    private componentDidMount(): void {
        this.props.actions.checkUserPermissions(SP.PermissionKind.manageWeb, this.props.customActionType);
    }

    public render(): JSX.Element {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />
        } else {
            return (<div>
                <MessageBar message={this.props.messageData.message} messageType={this.props.messageData.type} showMessage={this.props.messageData.showMessage} />
                <FilterTextBox setFilterText={this.props.actions.setFilterText} filterStr={this.props.filterText} parentOverrideClass="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4 ms-u-smPush2" >
                    <SpCustomActionsButtom />
                </FilterTextBox>
                <SpCustomActionList customActions={this.props.customActions} caType={this.props.customActionType} filtertText={this.props.filterText} deleteCustomAction={this.props.actions.deleteCustomAction} />
            </div>);
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
        customActionType: state.spCustomActions.customActionType
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToISpCustomActionsProps => {
    return {
        actions: bindActionCreators(propertyActionsCreatorsMap, dispatch) as any
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpCustomActions);
