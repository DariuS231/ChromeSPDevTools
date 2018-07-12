/* tslint:disable:max-line-length */

import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import propertyActionsCreatorsMap from "../actions/spPropertyBagActions";
import { IMapStateToProps, IMapStateToPropsState, ISpPropertyBagActionCreatorsMapObject, ISpPropertyBagProps } from "../interfaces/spPropertyBagInterfaces";
import FilterTextBox from "./../../common/components/filterTextBox";
import MessageBar from "./../../common/components/messageBar";
import { WorkingOnIt } from "./../../common/components/workingOnIt";
import { SpPropertyBagList } from "./spPropertyBagList";
import SpPropertyBagNewItem from "./spPropertyBagNewItem";

interface IMapDispatchToISpPropertyBagProps {
    actions: ISpPropertyBagActionCreatorsMapObject;
}
class SpPropertyBag extends React.Component<ISpPropertyBagProps, {}> {
    public searchComponent: HTMLElement;
    constructor() {
        super();
        this.onMessageClose = this.onMessageClose.bind(this);
        this.filterRef = this.filterRef.bind(this);
    }
    public render() {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            const hasPermissions: boolean = this.props.currentUserHasPermissions;
            return (
                <div className="action-container sp-peropertyBags">
                    <MessageBar onCloseMessageClick={this.onMessageClose} message={this.props.messageData.message}
                        messageType={this.props.messageData.type} showMessage={this.props.messageData.showMessage} />
                    {hasPermissions && <FilterTextBox referenceCallBack={this.filterRef} filterStr={this.props.filterText} setFilterText={this.props.actions.setFilterText} />}
                    {hasPermissions && <SpPropertyBagList items={this.props.webProperties} filterString={this.props.filterText} />}
                    {hasPermissions && <SpPropertyBagNewItem addProperty={this.props.actions.createProperty} />}
                </div>
            );
        }
    }

    private filterRef(element: HTMLElement): void {
        this.searchComponent = element;
    }
    private componentDidMount() {
        this.props.actions.checkUserPermissions(SP.PermissionKind.manageWeb);
    }
    private onMessageClose() {
        this.props.actions.setMessageData({
            message: "",
            showMessage: false,
            type: MessageBarType.info
        });
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        currentUserHasPermissions: state.spPropertyBag.userHasPermission,
        filterText: state.spPropertyBag.filterText,
        isWorkingOnIt: state.spPropertyBag.isWorkingOnIt,
        messageData: state.spPropertyBag.messageData,
        webProperties: state.spPropertyBag.webProperties
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToISpPropertyBagProps => {
    return {
        actions: bindActionCreators(propertyActionsCreatorsMap, dispatch) as any
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpPropertyBag);

/* tslint:enable:max-line-length */
