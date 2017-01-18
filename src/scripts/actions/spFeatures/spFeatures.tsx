/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>
/// <reference path="./../common/enums.ts"/>

import * as React from 'react';
import * as jQuery from 'jquery'
import "whatwg-fetch";
import FeatureToggle from './featureToggle';
import { WorkingOnIt } from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import Utils from './../common/utils';
import { FeatureOperationType } from './../common/enums';
import { IFeature } from './../common/interfaces'

import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { List } from 'office-ui-fabric-react/lib/List';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';



interface SpFeatureProps {
    showOnlyIconsInButtons: boolean,
    closeWindowFunction: any
}
interface SpFeatureState {
    currentUserHasPermissions: boolean,
    isWorkingOnIt: boolean,
    noPermissionsMessage: string,
    webFeatures: Array<IFeature>,
    siteFeatures: Array<IFeature>,
    showMessage: boolean,
    messageType: MessageBarType,
    message: string,
    filterText: string
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
            message: '',
            filterText:''
        } as SpFeatureState;
        this.reloadPage = false;
        this.spErrorHandler = this.spErrorHandler.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    private spErrorHandler(sender: any, err: any) {
        console.log(err.get_message());
        this.setState({ isWorkingOnIt: false, messageType: MessageBarType.error, message: 'An error ocurred, check the log for more information.', showMessage: true } as SpFeatureState)
    }
    private getFeatures(featureType: SP.FeatureDefinitionScope, opType: FeatureOperationType, msg: string) {
        let that = this;
        let url: string;

        url = featureType === SP.FeatureDefinitionScope.none ? _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/ManageFeatures.aspx" : _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/ManageFeatures.aspx?Scope=Site"

        fetch(url, {
            credentials: "include",
            method: "GET",
        })
            .then(function (response) {
                return response.text();
            }).then(function (body) {
                let items: Array<IFeature> = [];
                let htmlFeatures = jQuery(body);
                let numtemp = 0;

                htmlFeatures.find(".ms-ButtonHeightWidth").parent().parent().parent().each(function () {
                    let featureLine = jQuery(this);
                    let name: any = featureLine.find("h3:first").text();
                    let id: any = featureLine.find(".ms-ButtonHeightWidth:first").parent().attr("id");
                    //temp we put the description in the name
                    let description: any = name;
                    let activated: boolean = featureLine.find(".ms-ButtonHeightWidth:first").attr("value") === "Activate" ? true : false;
                    let toggleButton: boolean = featureLine.find(".ms-ButtonHeightWidth:first").attr("value") === "Activate" ? false : true;
                    let scope: SP.FeatureDefinitionScope = featureType;
                    let logo: string = featureLine.find("img").attr("src");
                    //console.log("feature name:" + name + " - id: " + id + " - activate: " + activated);
                    items.push({ id: id, name: name, description: name, scope: scope, activated: activated, logo: logo });
                });

                if (featureType === SP.FeatureDefinitionScope.none)
                    that.setState({ webFeatures: items, messageType: MessageBarType.success, message: msg, showMessage: (opType !== FeatureOperationType.None) } as SpFeatureState);
                else
                    that.setState({ siteFeatures: items, messageType: MessageBarType.success, message: msg, showMessage: (opType !== FeatureOperationType.None), isWorkingOnIt: false } as SpFeatureState);
            })
    }


    private onWebActionClick(id: string, name: string, operation: boolean, scope: SP.FeatureDefinitionScope) {
        this.setState({ isWorkingOnIt: true } as SpFeatureState);
        let ctx = SP.ClientContext.get_current();
        let web = ctx.get_web();
        let msg: string;
        ctx.load(web);
        console.log("The operation is " + operation);
        if (operation) {
            web.get_features().add(new SP.Guid(id), true, SP.FeatureDefinitionScope.none);
            msg = "The web feature " + name + " has been activated";
        }
        else {
            web.get_features().remove(new SP.Guid(id), true);
            msg = "The web feature " + name + " has been deactivated";
        }


        let onSuccess =  (sender: any, err: any) => {
            this.getFeatures(SP.FeatureDefinitionScope.none, FeatureOperationType.Activate, msg);
            this.setState({ isWorkingOnIt: false } as SpFeatureState);

        };
        ctx.executeQueryAsync( onSuccess,  this.spErrorHandler);
    }

    private onSiteActionClick(id: string, name: string, operation: boolean, scope: SP.FeatureDefinitionScope) {
        this.setState({ isWorkingOnIt: true } as SpFeatureState);
        let ctx = SP.ClientContext.get_current();
        let site = ctx.get_site();
        let msg: string;
        ctx.load(site);
        console.log(operation);
        if (operation) {
            site.get_features().add(new SP.Guid(id), true, SP.FeatureDefinitionScope.none);
            msg = "The site feature " + name + " has been activated";
        }
        else {
            site.get_features().remove(new SP.Guid(id), true);
            msg = "The site feature " + name + " has been deactivated";
        }

        let onSuccess = (sender: any, err: any) => {
            this.getFeatures(SP.FeatureDefinitionScope.site, FeatureOperationType.Activate, msg);
            this.setState({ isWorkingOnIt: false } as SpFeatureState);

        };
        
        ctx.executeQueryAsync(onSuccess, this.spErrorHandler);
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

            let onSuccess =  (sender: any, err: any) => {
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
            };
            let onError = (sender: any, err: any) => {
                SP.UI.Notify.addNotification("Failed to features...<br>" + err.get_message(), false);
                console.log(err);
                this.props.closeWindowFunction();
            };
            this.ctx.executeQueryAsync(onSuccess, onError);
        }
    }
    
    private onFilterChange(str: string) {
        this.setState({ filterText: str } as SpFeatureState);
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
            if (this.state.currentUserHasPermissions) {
                const filter:string = this.state.filterText.toLowerCase();
                const applyFilter:boolean = filter!==''; 
                var webProps = applyFilter 
                    ? this.state.webFeatures.filter((f: IFeature, index: number) => {
                        return f.name.toLowerCase().indexOf(filter) >= 0;
                    })
                    :  this.state.webFeatures;     
                var siteProps = applyFilter 
                    ? this.state.siteFeatures.filter((f: IFeature, index: number) => {
                        return f.name.toLowerCase().indexOf(filter) >= 0;
                    }) 
                    : this.state.siteFeatures;

                return (<div className='sp-features action-container'>
                    <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                    <div className="ms-Grid filters-container"> 
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                                <SearchBox onChange={this.onFilterChange}/>
                            </div>
                            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6"> </div>
                        </div>
                    </div>
                    <div className='web-feature-table' >
                        <div className='ms-font-l ms-fontWeight-semibold'>Web Features</div>
                            <FocusZone direction={FocusZoneDirection.vertical}>
                        <List
                            items={webProps}
                            onRenderCell={(item, index) => (
                                <div className='ms-ListBasicExample-itemCell' data-is-focusable={true}>
                                    <Image className='ms-ListBasicExample-itemImage' src={item.logo} width={31} height={22} />
                                    <div className='ms-ListBasicExample-itemContent ms-ListBasicExample-featureName ms-font-m ms-fontColor-themePrimary ms-fontWeight-semibold'>                                        
                                            {item.name}
                                    </div>
                                    <FeatureToggle item={item} key={item.id} itemIndex={index} onClick={this.onWebActionClick.bind(this)} showOnlyIconsInButtons={this.props.showOnlyIconsInButtons} />
                                </div>
                            )}
                            />
                    </FocusZone>
                    </div>
                    <div className='site-feature-table' >
                        <div className='ms-font-l ms-fontWeight-semibold'>Site Features</div>
                        <FocusZone direction={FocusZoneDirection.vertical}>
                            <List
                                items={siteProps}
                                onRenderCell={(item, index) => (
                                    <div className='ms-ListBasicExample-itemCell' data-is-focusable={true}>
                                            <Image className='ms-ListBasicExample-itemImage' src={item.logo} width={31} height={22} />
                                            <div className='ms-ListBasicExample-itemContent ms-ListBasicExample-featureName ms-font-m ms-fontColor-themePrimary ms-fontWeight-semibold'>
                                                    {item.name}
                                            </div>
                                        <FeatureToggle item={item} key={item.id} itemIndex={index} onClick={this.onSiteActionClick.bind(this)} showOnlyIconsInButtons={this.props.showOnlyIconsInButtons} />
                                    </div>
                                )}
                                />
                        </FocusZone>




                    </div>
                </div>);
            } else {
                return (
                    <div className='sp-features'>
                        <h2>{this.state.noPermissionsMessage}</h2>
                    </div>);
            }
        }
    }
}