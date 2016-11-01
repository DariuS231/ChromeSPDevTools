/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>
/// <reference path="./../common/enums.ts"/>
/// <reference path="./../common/styles.ts"/>
import * as React from 'react';

import NewKeyValueItem from './../common/newKeyValueItem';
import KeyValueItem from './../common/KeyValueItem';
import { WorkingOnIt } from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import { OperationType } from './../common/enums';
import { MessageBarType, FocusZone, FocusZoneDirection, List } from './../../../../node_modules/office-ui-fabric-react/lib/index';


interface SpPropertyBagProps {
    showOnlyIconsInButtons: boolean,
    closeWindowFunction: any
}
interface SpPropertyBagState {
    currentUserHasPermissions: boolean,
    isWorkingOnIt: boolean,
    noPermissionsMessage: string,
    webProperties: Array<IKeyValue>,
    showMessage: boolean,
    messageType: MessageBarType,
    message: string
}

export default class SpPropertyBag extends React.Component<SpPropertyBagProps, SpPropertyBagState> {
    ctx: SP.ClientContext;
    web: any;
    allProperties: any;
    reloadPage: boolean;
    constructor() {
        super();
        this.state = {
            currentUserHasPermissions: true,
            noPermissionsMessage: '',
            webProperties: [],
            isWorkingOnIt: true,
            showMessage: false,
            messageType: MessageBarType.info,
            message: ''
        } as SpPropertyBagState;
        this.reloadPage = false;
    }
    private onUpdatingNewProperty(key: string, value: string) {
        this.setState({ isWorkingOnIt: true } as SpPropertyBagState);
        this.allProperties.set_item(key, value);
        this.executeChanges(OperationType.Update, 'The selected property has been updated.');
    }
    private onAddingNewProperty(key: string, value: string) {
        this.setState({ isWorkingOnIt: true } as SpPropertyBagState);
        this.allProperties.set_item(key, value);
        this.executeChanges(OperationType.Create, 'A new property has been created');
    }
    private onDeletingProperty(key: string) {
        if (confirm('Are you sure you want to remove this property? The page will be refreshed after the property has been deleted.')) {
            this.setState({ isWorkingOnIt: true } as SpPropertyBagState)
            this.reloadPage = true;
            this.allProperties.set_item(key);
            this.executeChanges(OperationType.Delete, '');
        }
    }
    private spErrorHandler(sender: any, err: any) {
        console.log(err.get_message());
        this.setState({ isWorkingOnIt: false, messageType: MessageBarType.error, message: 'An error ocurred, check the log for more information.', showMessage: true } as SpPropertyBagState)
    }
    private executeChanges(opType: OperationType, msg: string) {
        this.ctx.get_web().update();
        let onSuccess: Function = Function.createDelegate(this, function (sender: any, err: any) {
            if (this.reloadPage) {
                window.location.reload();
            } else {
                this.getWebProperties(opType, msg);
            }
        });
        let onError: Function = Function.createDelegate(this, this.spErrorHandler);
        this.ctx.executeQueryAsync(onSuccess, onError);
    };
    private getWebProperties(opType: OperationType, msg: string) {
        this.allProperties = this.web.get_allProperties();
        this.ctx.load(this.web);
        this.ctx.load(this.allProperties);

        let onSuccess: Function = Function.createDelegate(this, (sender: any, err: any) => {
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
            this.setState({ webProperties: items, isWorkingOnIt: false, messageType: MessageBarType.success, message: msg, showMessage: (opType !== OperationType.None) } as SpPropertyBagState);
        });
        let onError: Function = Function.createDelegate(this, this.spErrorHandler);
        this.ctx.executeQueryAsync(onSuccess, onError);
    }
    private checkUserPermissions() {
        if (typeof this.web.doesUserHavePermissions !== "function") {
            this.setState({
                currentUserHasPermissions: false,
                noPermissionsMessage: 'Cannot check permissions against a non-securable object.',
                isWorkingOnIt: false
            } as SpPropertyBagState);
        } else {
            let ob: SP.BasePermissions = new SP.BasePermissions();
            ob.set(SP.PermissionKind.manageWeb);
            let per: any = this.web.doesUserHavePermissions(ob);

            let onSuccess: Function = Function.createDelegate(this, (sender: any, err: any) => {
                var hasPermissions = per.get_value();
                if (hasPermissions) {
                    this.getWebProperties(OperationType.None, '');
                }
                else {
                    this.setState({
                        currentUserHasPermissions: false,
                        noPermissionsMessage: 'Current user does not have the required permissions tu moduifyu the web properties.',
                        isWorkingOnIt: false
                    } as SpPropertyBagState);
                }
            });
            let onError: Function = Function.createDelegate(this, (sender: any, err: any) => {
                SP.UI.Notify.addNotification("Failed to get web properties...<br>" + err.get_message(), false);
                console.log(err);
                this.props.closeWindowFunction();
            });
            this.ctx.executeQueryAsync(onSuccess, onError);
        }
    }
    private componentDidMount() {
        this.ctx = SP.ClientContext.get_current();
        this.web = this.ctx.get_web();
        this.checkUserPermissions();
    }
    public render() {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt />;
        } else {
            return (<div className="action-container sp-peropertyBags">
                <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                <FocusZone direction={FocusZoneDirection.vertical}>
                    <List items={this.state.webProperties} onRenderCell={(item, index) => (
                        <KeyValueItem item={item} key={item.key} itemIndex={index} onUpdateClick={this.onUpdatingNewProperty.bind(this)} onDeleteClick={this.onDeletingProperty.bind(this)} />
                    )}
                        />
                </FocusZone>
                <NewKeyValueItem moduleTitle="New web property" keyDisplayName="Property Name" valueDisplayName="Property Value" onNewItemClick={this.onAddingNewProperty.bind(this)} />
            </div>);

        }
    }
}