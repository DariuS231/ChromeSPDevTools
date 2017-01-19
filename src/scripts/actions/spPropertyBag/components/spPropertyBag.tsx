/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="./../../common/interfaces.ts"/>
/// <reference path="./../../common/enums.ts"/>

import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import SpPropertyBagNewItem from './SpPropertyBagNewItem';
import SpPropertyBagFilter from './spPropertyBagFilter';
import { SpPropertyBagList } from './spPropertyBagList';
import { WorkingOnIt } from './../../common/WorkingOnIt';
import MessageBar from './../../common/MessageBar';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import propertyActionsCreatorsMap from '../actions/spPropertyBagActions';
import {
    SpPropertyBagProps,
    IMapStateToPropsState,
    IMapStateToProps,
    ISpPropertyBagActionCreatorsMapObject
} from '../interfaces/spPropertyBagInterfaces'

interface IMapDispatchToSpPropertyBagProps {
    actions: ISpPropertyBagActionCreatorsMapObject
}
class SpPropertyBag extends React.Component<SpPropertyBagProps, {}> {
    constructor(){
        super();
        this.onMessageClose = this.onMessageClose.bind(this);
    }
    private componentDidMount() {
        this.props.actions.getAllProperties();
    }
    private onMessageClose(){
        this.props.actions.setMessageData({
            showMessage: false,
            message: '',
            type: MessageBarType.info
        });
    }
    public render() {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            return (<div className="action-container sp-peropertyBags">
                <MessageBar onCloseMessageClick={this.onMessageClose} message={this.props.messageData.message} messageType={this.props.messageData.type} showMessage={this.props.messageData.showMessage} />
                <SpPropertyBagFilter filterStr={this.props.filterText} setFilterText={this.props.actions.setFilterText} />
                <SpPropertyBagList items={this.props.webProperties} filterString={this.props.filterText} />
                <SpPropertyBagNewItem addProperty={this.props.actions.createProperty} />
            </div>);
        }
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        currentUserHasPermissions: state.spPropertyBag.userHasPermission,
        webProperties: state.spPropertyBag.webProperties,
        isWorkingOnIt: state.spPropertyBag.isWorkingOnIt,
        messageData: state.spPropertyBag.messageData,
        filterText: state.spPropertyBag.filterText
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToSpPropertyBagProps => {
    return {
        actions: bindActionCreators(propertyActionsCreatorsMap, dispatch) as any
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpPropertyBag);

