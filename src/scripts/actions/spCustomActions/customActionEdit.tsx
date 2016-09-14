/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';

import Utils from './../common/utils';
import { CustomActionItemStyles as styles } from './../common/Styles';
import { ViewMode } from './../common/enums';
import SpAssetPicker  from './../common/spAssetPicker'

interface CustomActionEditProps {
    item?: ICustomAction,
    changeModefunction: any,
    workingOnIt: any,
    showMessage: any,
    reloadCActions: any
}
interface CustomActionEditState {
    item: ICustomAction,
    mode: ViewMode

}

export default class CustomActionEdit extends React.Component<CustomActionEditProps, CustomActionEditState> {

    constructor() {
        super();
        this.state = {
            item: {} as ICustomAction,
            mode: ViewMode.New
        };
    }

    componentDidMount() {
        let propIetm = this.props.item;
        let caItem: ICustomAction;
        let caMode: ViewMode;
        if (propIetm) {
            caItem = propIetm
            caMode = ViewMode.Edit
        } else {
            caItem = {
                locationInternal: 'ScriptLink'
            } as ICustomAction
            caMode = ViewMode.New
        }
        this.setState({
            item: caItem,
            mode: caMode
        } as CustomActionEditState);
    }
    private createCustomAction(): void {
        this.props.workingOnIt(true);
        let ctx: SP.ClientContext = SP.ClientContext.get_current();
        let web: SP.Web = ctx.get_web();
        let ca: SP.UserCustomAction = web.get_userCustomActions().add();
        ca = this.setCustomActionData(ca);
        ca.update();
        web.update();
        let onSuccess: Function = Function.createDelegate(this, function (sender: any, err: any) {
            this.props.changeModefunction();
            this.props.reloadCActions();
        });
        let onError: Function = Function.createDelegate(this, function (a: any, b: any) {
            console.log("ERROR");
        });
        ctx.executeQueryAsync(onSuccess, onError);
    }
    private setCustomActionData(ca: SP.UserCustomAction): SP.UserCustomAction {
        ca.set_title(this.state.item.title);
        ca.set_name(this.state.item.name);
        ca.set_description(this.state.item.description);
        ca.set_sequence(this.state.item.sequence);
        ca.set_location('ScriptLink');
        if (this.state.item.location === 'ScriptLink') {
            ca.set_scriptSrc(this.state.item.scriptSrc);
            ca.set_scriptBlock('');
        } else {
            ca.set_scriptSrc('');
            ca.set_scriptBlock(this.state.item.scriptBlock);
        }

        return ca;
    }
    private inputChange(propertyName: string, e: any) {
        let newItem = this.state.item;
        newItem[propertyName] = e.target.value;
        this.setState({ item: newItem } as CustomActionEditState);
    }

    private locationInputChange(e: any) {
        if (e.target.checked) {
            let newItem = this.state.item;
            newItem.locationInternal = e.target.value;
            this.setState({ item: newItem } as CustomActionEditState);
        }
    }
    private onCancelClick(e: any) {
        this.props.changeModefunction();
    }
    private onSaveClick(e: any) {
        this.props.workingOnIt(true);
        let caGuid: SP.Guid = new SP.Guid(this.props.item.id.toString());
        let ctx: SP.ClientContext = SP.ClientContext.get_current();
        let web: SP.Web = ctx.get_web();
        let ca: SP.UserCustomAction = web.get_userCustomActions().getById(caGuid);
        ca = this.setCustomActionData(ca);
        ca.update();
        web.update();
        ctx.load(ca);
        let onSuccess: Function = Function.createDelegate(this, function (sender: any, err: any) {
            this.props.changeModefunction();
            this.props.reloadCActions();
        });
        let onError: Function = Function.createDelegate(this, function (a: any, b: any) {
            console.log("ERROR");
        });
        ctx.executeQueryAsync(onSuccess, onError);
    }
    public render() {
        let inputStyle: any = {
            background: 'transparent',
            width: '97%',
            border: '1px solid #ababab'
        };
        let labelStyles = { display: 'block', fontWeight: 'bold' };
        let script = (this.state.item.locationInternal === 'ScriptLink')
            ? (<div>
                <label style={labelStyles} htmlFor="csInputScriptLink">ScriptLink: </label>
                <input type="text" id="csInputScriptLink" style={inputStyle} value={this.state.item.scriptSrc} onChange={this.inputChange.bind(this, 'scriptSrc') } />
            </div>)
            : (<div>
                <label style={labelStyles} htmlFor="csInputScriptBlock">ScriptBlock: </label>
                <textarea type="text" id="csInputScriptBlock" style={inputStyle} value={this.state.item.scriptBlock} onChange={this.inputChange.bind(this, 'scriptBlock') } />
            </div>);
        let title: string = this.state.item.id ? `Edit Custom Action ID: ${this.state.item.id.toString()}` : 'Create a new Custom Action';
        let numberInputStyle = Utils.mergeObjects(inputStyle, { width: '98.5%' });
        return (
            <div style={styles.divContainer}>
                <h2>
                {title}
                </h2>
                <div>
                    <label style={labelStyles} htmlFor="caInputTitle">Title: </label>
                    <input type="text" id="caInputTitle" value={this.state.item.title} style={inputStyle} onChange={this.inputChange.bind(this, 'title') } />
                </div>
                <div>
                    <label style={labelStyles} htmlFor="caInputName">Name: </label>
                    <input type="text" id="caInputName" value={this.state.item.name} style={inputStyle} onChange={this.inputChange.bind(this, 'name') } />
                </div>
                <div>
                    <label style={labelStyles} htmlFor="caInputDescription">Description: </label>
                    <input type="text" id="caInputDescription" value={this.state.item.description} style={inputStyle} onChange={this.inputChange.bind(this, 'description') } />
                </div>
                <div>
                    <label style={labelStyles} htmlFor="csInputSequence">Sequence: </label>
                    <input type="number" id="csInputSequence" value={this.state.item.sequence}  style={numberInputStyle}  onChange={this.inputChange.bind(this, 'sequence') }/>
                </div>
                <div>
                    <label style={labelStyles} htmlFor="spLocation">Location: </label>

                    <input type="checkbox" name="spLocation" value="ScriptLink" id="caCheckScriptLink" checked={this.state.item.locationInternal === 'ScriptLink'} onChange={this.locationInputChange.bind(this) }/><span htmlFor="caCheckScriptLink" >ScriptLink</span>
                    <input type="checkbox" name="spLocation" value="ScriptBlock" id="caCheckScriptBlock" checked={this.state.item.locationInternal === 'ScriptBlock'} onChange={this.locationInputChange.bind(this) }/><span htmlFor="caCheckScriptBlock" >ScriptBlock</span>
                </div>
                { script }
                <div>
                    <input type="button" value="Cancel" onClick={this.onCancelClick.bind(this) } />
                    <input type="button" value="Save" onClick={ this.state.mode === ViewMode.Edit ? this.onSaveClick.bind(this) : this.createCustomAction.bind(this) } />
                </div>
            </div>);
    }
}
