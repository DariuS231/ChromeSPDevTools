/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>
/// <reference path="./../common/enums.ts"/>
/// <reference path="./../common/styles.ts"/>

import * as React from 'react';
import * as jQuery from 'jquery'
import "whatwg-fetch";

import FeatureItem from './featureItem';
import WorkingOnIt from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import Utils from './../common/utils';

import { SpFeaturesStyles as spFeatStyles } from './../common/Styles'
import { FeatureOperationType } from './../common/enums';
import {  MessageBarType } from './../../../../node_modules/office-ui-fabric-react/lib/index';

interface SpFeatureProps {
    showOnlyIconsInButtons:boolean,
    closeWindowFunction:any
}
interface SpFeatureState {
    currentUserHasPermissions: boolean,
    isWorkingOnIt: boolean,
    noPermissionsMessage: string,
    webFeatures: Array<IFeature>,
    siteFeatures: Array<IFeature>,
    showMessage: boolean,
    messageType: MessageBarType,
    message: string
}

export default class SpFeatures extends React.Component<SpFeatureProps, SpFeatureState> {
    ctx: SP.ClientContext;
    web: any;
    allProperties: any;
    reloadPage: boolean;
    constructor() {
        super();
        this.state = {
            currentUserHasPermissions: true,
            noPermissionsMessage: '',
            webFeatures: [],
            siteFeatures: [],
            isWorkingOnIt: true,
            showMessage: false,
            messageType: MessageBarType.info,
            message: ''
        } as SpFeatureState;
        this.reloadPage = false;
    }

    private spErrorHandler(sender: any, err: any) {
        console.log(err.get_message());
        this.setState({ isWorkingOnIt: false, messageType: MessageBarType.error, message: 'An error ocurred, check the log for more information.', showMessage: true } as SpFeatureState)
    }
    private executeChanges(opType: FeatureOperationType, msg: string) {
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
    
    
    private getFeatures(featureType: SP.FeatureDefinitionScope, opType: FeatureOperationType, msg: string) {
        let that = this;
        let url:string;

        url = featureType === SP.FeatureDefinitionScope.none ? _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/ManageFeatures.aspx" : _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/ManageFeatures.aspx?Scope=Site"

        fetch(url, {
            credentials: "include",
            method: "GET",
        })
        .then(function(response) {
            return response.text();
        }).then(function(body) {
            let items: Array<IFeature> = [];
            let htmlFeatures = jQuery(body); 
            let numtemp = 0;

            htmlFeatures.find(".ms-ButtonHeightWidth").parent().parent().parent().each(function() { 
                    let featureLine = jQuery(this); 
                    let name: any = featureLine.find("h3:first").text();
                    let id: any = featureLine.find(".ms-ButtonHeightWidth:first").parent().attr("id");
                    //temp we put the description in the name
                    let description: any = name;
                    let activated: boolean = featureLine.find(".ms-ButtonHeightWidth:first").attr("value") === "Activate" ? true : false;
                    let scope: SP.FeatureDefinitionScope = featureType;
                    let logo: string = featureLine.find("img").attr("src");
                    //console.log("feature name:" + name + " - id: " + id + " - activate: " + activated);
                    items.push({ id: id, name: name, description: name, scope: scope, activated: activated, logo: logo });
            });

            if (featureType === SP.FeatureDefinitionScope.none)
                that.setState({ webFeatures: items, messageType: MessageBarType.success, message: msg, showMessage: (opType !== FeatureOperationType.None)} as SpFeatureState);
            else
                that.setState({ siteFeatures: items, messageType: MessageBarType.success, message: msg, showMessage: (opType !== FeatureOperationType.None), isWorkingOnIt: false} as SpFeatureState);
         })
    }


    private onWebActionClick(id: string, operation: boolean, scope:SP.FeatureDefinitionScope) {
        this.setState({ isWorkingOnIt: true } as SpFeatureState);
        let ctx = SP.ClientContext.get_current();
        let web = ctx.get_web();
        let msg: string;
        ctx.load(web);
        //console.log(id);
        if (operation){
            web.get_features().add(new SP.Guid(id), true, SP.FeatureDefinitionScope.none);
            msg = "The web feature " + name + " has been activated";
        }
        else
        {
            web.get_features().remove(new SP.Guid(id), true);
            msg = "The web feature " + name + " has been deactivated";
        }
        

        let onSuccess: Function = Function.createDelegate(this, function (sender: any, err: any) {
            this.getFeatures(SP.FeatureDefinitionScope.none, FeatureOperationType.Activate, msg);
            this.setState({ isWorkingOnIt: false } as SpFeatureState);

        });
        let onError: Function = Function.createDelegate(this, this.spErrorHandler);
        ctx.executeQueryAsync(Function.createDelegate(this, onSuccess), Function.createDelegate(this, onError));
    }

    private onSiteActionClick(id: string, name: string, operation: boolean, scope:SP.FeatureDefinitionScope) {
        this.setState({ isWorkingOnIt: true } as SpFeatureState);
        let ctx = SP.ClientContext.get_current();
        let site = ctx.get_site();
        let msg: string;
        ctx.load(site);
        //console.log(id);
        if (operation){
            site.get_features().add(new SP.Guid(id), true, SP.FeatureDefinitionScope.none);
            msg = "The site feature " + name + " has been activated";
        }
        else
        {
            site.get_features().remove(new SP.Guid(id), true);
            msg = "The site feature " + name + " has been deactivated";
        }
        
        let onSuccess: Function = Function.createDelegate(this, function (sender: any, err: any) {
            this.getFeatures(SP.FeatureDefinitionScope.site, FeatureOperationType.Activate, msg);
            this.setState({ isWorkingOnIt: false } as SpFeatureState);

        });
        let onError: Function = Function.createDelegate(this, this.spErrorHandler);
        ctx.executeQueryAsync(Function.createDelegate(this, onSuccess), Function.createDelegate(this, onError));
    }

    private checkUserPermissions() {
        if (typeof this.web.doesUserHavePermissions !== "function") {
            this.setState({
                currentUserHasPermissions: false,
                noPermissionsMessage: 'Cannot check permissions against a non-securable object.',
                isWorkingOnIt: false
            } as SpFeatureState);
        } else {
            let ob: SP.BasePermissions = new SP.BasePermissions();
            ob.set(SP.PermissionKind.manageWeb);
            let per: any = this.web.doesUserHavePermissions(ob);

            let onSuccess: Function = Function.createDelegate(this, (sender: any, err: any) => {
                var hasPermissions = per.get_value();
                if (hasPermissions) {
                    this.getFeatures(SP.FeatureDefinitionScope.none, FeatureOperationType.None, '');
                    this.getFeatures(SP.FeatureDefinitionScope.site, FeatureOperationType.None, '');
                }
                else {
                    this.setState({
                        currentUserHasPermissions: false,
                        noPermissionsMessage: 'Current user does not have the required permissions to work the features.',
                        isWorkingOnIt: false
                    } as SpFeatureState);
                }
            });
            let onError: Function = Function.createDelegate(this, (sender: any, err: any) => {
                SP.UI.Notify.addNotification("Failed to features...<br>" + err.get_message(), false);
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
            return <WorkingOnIt/>;
        } else {
            if (this.state.currentUserHasPermissions) {
                //console.log(this.state.siteFeatures.length);
                var webProps = this.state.webFeatures.map((prop: IFeature, index: number) => {
                    return (<FeatureItem item={prop} key={prop.id} itemIndex={index} onClick={this.onWebActionClick.bind(this)} showOnlyIconsInButtons={this.props.showOnlyIconsInButtons}/>);
                });
                var siteProps = this.state.siteFeatures.map((prop: IFeature, index: number) => {
                    return (<FeatureItem item={prop} key={prop.id} itemIndex={index} onClick={this.onSiteActionClick.bind(this)} showOnlyIconsInButtons={this.props.showOnlyIconsInButtons}/>);
                });
                return (<div style={spFeatStyles.contentStyles}>
                    <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                    <div style={spFeatStyles.tableContainerWeb}>
                        <h3><b>Web Features</b></h3>
                        <table style={spFeatStyles.tableStyles}>                            
                            <tbody>
                                {webProps}
                            </tbody>
                        </table>                 
                    </div>
                    <div style={spFeatStyles.tableContainerSite}>
                        <h3><b>Site Features</b></h3>
                        <table style={spFeatStyles.tableStyles}>                            
                            <tbody>
                                {siteProps}
                            </tbody>
                        </table>                  
                    </div>                    
                </div>);
            } else {
                return (
                    <div style={spFeatStyles.contentStyles}>
                        <h2>{this.state.noPermissionsMessage}</h2>
                    </div>);
            }
        }
    }
}