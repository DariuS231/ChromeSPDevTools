/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.tsx"/>
import * as React from 'react';

import NewKeyValueItem from './../common/newKeyValueItem';
import KeyValueItem from './../common/KeyValueItem';

export default class SpPropertyBag extends React.Component<SpPropertyBagProps, SpPropertyBagState> {
    ctx: SP.ClientContext;
    web: any;
    constructor() {
        super();
        this.state = {
            currentUserHasPermissions: true,
            noPermissionsMessage: '',
            webProperties: [],
            isWorkingOnIt: true
        } as SpPropertyBagState;
    }
    private onAddingNewProperty(key: string, value: string) {
        console.log("New property krey: " + key + "New property value: " + value);
    }
    private onDeletingProperty(key: string, value: string) {
        console.log("New property krey: " + key + "New property value: " + value);
    }
    private onUpdatingProperty(key: string, value: string) {
        console.log("New property krey: " + key + "New property value: " + value);
    }
    private spErrorHandler(sender: any, err: any) {

    }
    private getWebProperties() {

        this.ctx = SP.ClientContext.get_current();
        this.web = this.ctx.get_web();
        let allProperties = this.web.get_allProperties();
        this.ctx.load(this.web);
        this.ctx.load(allProperties);

        let onSuccess: Function = Function.createDelegate(this, (sender: any, err: any) => {
            let propsKeyVal: any = allProperties.get_fieldValues();

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
            this.setState({ webProperties: items, isWorkingOnIt: false } as SpPropertyBagState)
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
                    this.getWebProperties();
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
        let contentStyles: any = {overflow:'auto', height: '90%'};
        let workingOnItContStyles: any = {overflow:'auto', height: '90%',width:'100%', textAlign: 'center', verticalAlign: 'middle'};
        let workingOnItItemsStyles:any = { display: 'inline-block', verticalAlign: 'middle', margin: '20px'}
        if (this.state.isWorkingOnIt) {
            return (
                <div style={workingOnItContStyles}>
                    <img style={workingOnItItemsStyles} src="/_layouts/15/images/gears_anv4.gif" alt="Working on it..."/>
                    <h2 style={workingOnItItemsStyles}>Working on it...</h2>
                </div>);
        } else {
            if (this.state.currentUserHasPermissions) {
                var props = this.state.webProperties.map((prop) => {
                    return (<KeyValueItem itemKey={prop.key} key={prop.key}  itemValue={prop.value}  onUpdateClick={this.onUpdatingProperty.bind(this) } onDeleteClick={this.onDeletingProperty.bind(this) } />);
                });
                return (
                    <div style={contentStyles}>
                        <table>
                            <tbody>
                                {props}
                            </tbody>
                        </table>
                        <hr/>
                        <NewKeyValueItem moduleTitle="New web proiperty" keyDisplayName="Property Name" valueDisplayName="Property Value" onNewItemClick={this.onAddingNewProperty.bind(this) } />
                    </div>);
            } else {
                return (
                    <div style={contentStyles}>
                        <h2>{this.state.noPermissionsMessage}</h2>
                    </div>);
            }
        }
    }
}