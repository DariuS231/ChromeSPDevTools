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
import propertyActionsCreatorsMap from '../actions/spPropertyBagActions';
import {
    SpPropertyBagProps,
    IMapStateToPropsState,
    IMapStateToProps,
    IMapDispatchToProps,
    IProperty
} from '../interfaces/spPropertyBagInterfaces'

interface IMapDispatchToSpPropertyBagProps {
    getAllProperties: Function
}
class SpPropertyBag extends React.Component<SpPropertyBagProps, {}> {
    private componentDidMount() {
        this.props.getAllProperties();
    }
    public render() {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            return (<div className="action-container sp-peropertyBags">
                <MessageBar message={this.props.messageData.message} messageType={this.props.messageData.type} showMessage={this.props.messageData.showMessage} />
                <SpPropertyBagFilter filterStr={this.props.filterText} />
                <SpPropertyBagList items={this.props.webProperties} filterString={this.props.filterText} />
                <SpPropertyBagNewItem newProperty={this.props.newProperty} />
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
        filterText: state.spPropertyBag.filterText,
        newProperty: state.spPropertyBag.newProperty
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToSpPropertyBagProps => {
    return {
        getAllProperties: () => {
            dispatch(propertyActionsCreatorsMap["getAllProperties"]());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpPropertyBag);
