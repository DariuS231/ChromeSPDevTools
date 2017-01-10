/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>
/// <reference path="./../common/enums.ts"/>

import * as React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, ActionCreatorsMapObject, Dispatch } from 'redux'
import NewKeyValueItem from './../common/newKeyValueItem';
import KeyValueItem from './../common/KeyValueItem';
import { WorkingOnIt } from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import { OperationType } from './../common/enums';
import windowsActionsCreatorsMap from './actions/windowActions'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { List } from 'office-ui-fabric-react/lib/List';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { SpPropertyBagProps, 
    IWindowsState,
    IOwnProps, 
    IMapStateToPropsState, 
    IMapStateToProps, 
    IMapDispatchToProps,
    IActions 
} from './interfaces/spPropertyBagInterfaces'



class SpPropertyBag extends React.Component<SpPropertyBagProps, {}> {
    ctx: SP.ClientContext;
    web: any;
    allProperties: any;
    reloadPage: boolean;
    constructor() {
        super();
        this.reloadPage = false;
        this.onFilterChange = this.onFilterChange.bind(this);
        this.spErrorHandler = this.spErrorHandler.bind(this);
    }
    private onUpdatingNewProperty(key: string, value: string) {
        this.allProperties.set_item(key, value);
        this.executeChanges(OperationType.Update, 'The selected property has been updated.');
    }
    private onAddingNewProperty(key: string, value: string) {
        this.allProperties.set_item(key, value);
        this.executeChanges(OperationType.Create, 'A new property has been created');
    }
    private onDeletingProperty(key: string) {
        if (confirm('Are you sure you want to remove this property? The page will be refreshed after the property has been deleted.')) {

            this.reloadPage = true;
            this.allProperties.set_item(key);
            this.executeChanges(OperationType.Delete, '');
        }
    }
    private spErrorHandler(sender: any, err: any) {
        console.log(err.get_message());
    }
    private executeChanges(opType: OperationType, msg: string) {
        this.ctx.get_web().update();
        let onSuccess = (sender: any, err: any) => {
            if (this.reloadPage) {
                window.location.reload();
            } else {
                this.getWebProperties(opType, msg);
            }
        };

        this.ctx.executeQueryAsync(onSuccess, this.spErrorHandler);
    };
    private getWebProperties(opType: OperationType, msg: string) {
        this.allProperties = this.web.get_allProperties();
        this.ctx.load(this.web);
        this.ctx.load(this.allProperties);

        let onSuccess = (sender: any, err: any) => {
            let propsKeyVal: any = this.allProperties.get_fieldValues();

            let items: Array<IKeyValue> = [];
            for (let p in propsKeyVal) {
                if (propsKeyVal.hasOwnProperty(p)) {
                    let propVal: any = propsKeyVal[p];
                    let type: string = typeof (propVal);
                    if (type === "string") {
                        items.push({ key: p, value: propVal.replace(/"/g, '&quot;') });
                    }
                }
            }
            items.sort(function (a, b) {
                return a.key.localeCompare(b.key);
            });
        };
        this.ctx.executeQueryAsync(onSuccess, this.spErrorHandler);
    }
    private checkUserPermissions() {
        if (typeof this.web.doesUserHavePermissions !== "function") {

        } else {
            let ob: SP.BasePermissions = new SP.BasePermissions();
            ob.set(SP.PermissionKind.manageWeb);
            let per: any = this.web.doesUserHavePermissions(ob);

            let onSuccess = (sender: any, err: any) => {
                var hasPermissions = per.get_value();
                if (hasPermissions) {
                    this.getWebProperties(OperationType.None, '');
                }
                else {

                }
            };
            let onError = (sender: any, err: any) => {
                SP.UI.Notify.addNotification("Failed to get web properties...<br>" + err.get_message(), false);
                console.log(err);
                this.props.closeWindowFunction();
            };
            this.ctx.executeQueryAsync(onSuccess, onError);
        }
    }
    private onFilterChange(str: string) {
        this.props.actions.setFilterText(str);
    }
    private componentDidMount() {
        
    }
    public render() {
        if (this.props.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            const filter: string = this.props.filterText.toLowerCase();
            console.log(filter);
            const props: Array<IKeyValue> = filter !== '' ? this.props.webProperties.filter((prop: IKeyValue, index: number) => {
                return prop.key.toLowerCase().indexOf(filter) >= 0 || prop.value.toLowerCase().indexOf(filter) >= 0;
            }) : this.props.webProperties;
            return (<div className="action-container sp-peropertyBags">
                <MessageBar message={this.props.messageData.message} messageType={this.props.messageData.type} showMessage={this.props.messageData.showMessage} />
                <div className="ms-Grid filters-container">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                            <SearchBox onChange={this.onFilterChange} />
                        </div>
                        <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6"> </div>
                    </div>
                </div>
                <List items={props} onRenderCell={(item, index) => (
                    <KeyValueItem
                        item={item}
                        key={item.key}
                        itemIndex={index}
                        onUpdateClick={this.onUpdatingNewProperty.bind(this)}
                        onDeleteClick={this.onDeletingProperty.bind(this)} />
                )} />


                <NewKeyValueItem moduleTitle="New web property" keyDisplayName="Property Name" valueDisplayName="Property Value" onNewItemClick={this.onAddingNewProperty.bind(this)} />
            </div>);

        }
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): IMapStateToProps => {
    return {
        currentUserHasPermissions: state.window.userHasPermission,
        webProperties: state.properties,
        isWorkingOnIt: state.window.isWorkingOnIt,
        messageData: state.window.messageData,
        filterText: state.window.filterText
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToProps => {
    return {
        actions: bindActionCreators(windowsActionsCreatorsMap, dispatch) as any
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpPropertyBag);
