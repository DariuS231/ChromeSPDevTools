import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { WorkingOnIt } from './../../common/components/WorkingOnIt';
import MessageBar from './../../common/components/MessageBar';
import FilterTextBox from './../../common/components/filterTextBox';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import SpFeaturesList from './spFeaturesList';
import spFeaturesActionsCreatorMap from '../actions/spFeaturesActions';
import { IMapStateToPropsState, IMapStateToProps, IMapDispatchToProps, IFeature, SpFeaturesProps } from '../interfaces/spFeaturesInterfaces'


class SpFeatures extends React.Component<SpFeaturesProps, {}> {
    constructor() {
        super();
        this.onMessageClose = this.onMessageClose.bind(this);
        this.onToggleClick = this.onToggleClick.bind(this);
    }
    private componentDidMount() {
        this.props.actions.checkUserPermissions(SP.PermissionKind.manageWeb);
    }
    private onMessageClose() {
        this.props.actions.setMessageData({
            showMessage: false,
            message: '',
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
    public render() {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            const hasPermissions: boolean = this.props.currentUserHasPermissions;
            return (<div className='sp-features action-container'>
                <MessageBar onCloseMessageClick={this.onMessageClose} message={this.props.messageData.message} messageType={this.props.messageData.type} showMessage={this.props.messageData.showMessage} />
                {hasPermissions && <FilterTextBox filterStr={this.props.filterText} setFilterText={this.props.actions.setFilterText} />}
                {hasPermissions && <SpFeaturesList onToggleClick={this.onToggleClick} items={this.props.webFeatures} filterString={this.props.filterText} listTitle="Web Features" tablesClassName='web-feature-table' />}
                {hasPermissions && <SpFeaturesList onToggleClick={this.onToggleClick} items={this.props.siteFeatures} filterString={this.props.filterText} listTitle="Site Features" tablesClassName='site-feature-table' />}
            </div>);
        }
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        currentUserHasPermissions: state.spFeatures.userHasPermission,
        siteFeatures: state.spFeatures.siteFeatures,
        webFeatures: state.spFeatures.webFeatures,
        isWorkingOnIt: state.spFeatures.isWorkingOnIt,
        messageData: state.spFeatures.messageData,
        filterText: state.spFeatures.filterText
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToProps => {
    return {
        actions: bindActionCreators(spFeaturesActionsCreatorMap, dispatch) as any
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpFeatures);

