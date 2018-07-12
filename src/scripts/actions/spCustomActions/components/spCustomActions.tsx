import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import propertyActionsCreatorsMap from "../actions/spCustomActionsActions";
import {
    IMapStateToProps,
    IMapStateToPropsState,
    ISpCustomActionsActionCreatorsMapObject,
    ISpCustomActionsProps
} from "../interfaces/spCustomActionsInterfaces";
import FilterTextBox from "./../../common/components/filterTextBox";
import MessageBar from "./../../common/components/messageBar";
import { WorkingOnIt } from "./../../common/components/workingOnIt";
import { SpCustomActionsButtom } from "./spCustomActionsButtom";
import { SpCustomActionList } from "./spCustomActionsList";

interface IMapDispatchToISpCustomActionsProps {
    actions: ISpCustomActionsActionCreatorsMapObject;
}
class SpCustomActions extends React.Component<ISpCustomActionsProps, {}> {
    constructor() {
        super();
        this.onMessageClose = this.onMessageClose.bind(this);
    }
    public render(): JSX.Element {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            return (
                <div>
                    <MessageBar onCloseMessageClick={this.onMessageClose} message={this.props.messageData.message}
                        messageType={this.props.messageData.type} showMessage={this.props.messageData.showMessage} />
                    <FilterTextBox setFilterText={this.props.actions.setFilterText} filterStr={this.props.filterText}
                        parentOverrideClass="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4 ms-u-smPush2 buttonContainer" >
                        <SpCustomActionsButtom />
                    </FilterTextBox>
                    <SpCustomActionList customActions={this.props.customActions} caType={this.props.customActionType}
                        filterText={this.props.filterText} deleteCustomAction={this.props.actions.deleteCustomAction} />
                </div>);
        }
    }

    private onMessageClose() {
        this.props.actions.setMessageData({
            message: "",
            showMessage: false,
            type: MessageBarType.info
        });
    }
    private componentDidMount(): void {
        this.props.actions.checkUserPermissions(SP.PermissionKind.manageWeb, this.props.customActionType);
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        currentUserHasPermissions: state.spCustomActionsReducer.userHasPermission,
        customActionType: state.spCustomActionsReducer.customActionType,
        customActions: state.spCustomActionsReducer.customActions,
        filterText: state.spCustomActionsReducer.filterText,
        isWorkingOnIt: state.spCustomActionsReducer.isWorkingOnIt,
        messageData: state.spCustomActionsReducer.messageData
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToISpCustomActionsProps => {
    return {
        actions: bindActionCreators(propertyActionsCreatorsMap, dispatch) as any
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpCustomActions);
