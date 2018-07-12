import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import spFeaturesActionsCreatorMap from "../actions/spFeaturesActions";
import {
    IFeature, IMapDispatchToProps, IMapStateToProps,
    IMapStateToPropsState, ISpFeaturesProps
} from "../interfaces/spFeaturesInterfaces";
import FilterTextBox from "./../../common/components/filterTextBox";
import MessageBar from "./../../common/components/messageBar";
import { WorkingOnIt } from "./../../common/components/workingOnIt";
import SpFeaturesList from "./spFeaturesList";

class SpFeatures extends React.Component<ISpFeaturesProps, {}> {
    constructor() {
        super();
        this.onMessageClose = this.onMessageClose.bind(this);
        this.onToggleClick = this.onToggleClick.bind(this);
    }
    public render() {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            const hasPermissions: boolean = this.props.currentUserHasPermissions;
            /* tslint:disable:max-line-length */

            return (
                <div className="sp-features action-container">
                    <MessageBar onCloseMessageClick={this.onMessageClose} message={this.props.messageData.message}
                        messageType={this.props.messageData.type} showMessage={this.props.messageData.showMessage} />
                    {hasPermissions && <FilterTextBox filterStr={this.props.filterText} setFilterText={this.props.actions.setFilterText} />}
                    {hasPermissions && <SpFeaturesList onToggleClick={this.onToggleClick} items={this.props.webFeatures} filterString={this.props.filterText} listTitle="Web Features" tablesClassName="web-feature-table" />}
                    {hasPermissions && <SpFeaturesList onToggleClick={this.onToggleClick} items={this.props.siteFeatures} filterString={this.props.filterText} listTitle="Site Features" tablesClassName="site-feature-table" />}
                </div>);
            /* tslint:enable:max-line-length */
        }
    }
    public componentDidMount() {
        this.props.actions.checkUserPermissions(SP.PermissionKind.manageWeb);
    }
    private onMessageClose() {
        this.props.actions.setMessageData({
            message: "",
            showMessage: false,
            type: MessageBarType.info
        });
    }
    private onToggleClick(feature: IFeature): void {
        if (feature.activated) {
            this.props.actions.deActivateFeature(feature);
        } else {
            this.props.actions.activateFeature(feature);
        }
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        currentUserHasPermissions: state.spFeatures.userHasPermission,
        filterText: state.spFeatures.filterText,
        isWorkingOnIt: state.spFeatures.isWorkingOnIt,
        messageData: state.spFeatures.messageData,
        siteFeatures: state.spFeatures.siteFeatures,
        webFeatures: state.spFeatures.webFeatures
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToProps => {
    return {
        actions: bindActionCreators(spFeaturesActionsCreatorMap, dispatch) as any
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpFeatures);
