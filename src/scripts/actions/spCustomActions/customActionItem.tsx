/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { CustomActionItemStyles as styles, ButtonsStyle as buttonsStyle } from './../common/Styles';
import { ViewMode } from './../common/enums';
import Utils from './../common/utils';
import {
    TextField,
    Button,
    ButtonType,
    MessageBarType,
    ChoiceGroup
} from './../../../../node_modules/office-ui-fabric-react/lib/index';

import CustomActionDisplay from './customActionDisplay';
import CustomActionEdit from './customActionEdit';

interface CustomActionItemProps {
    item: ICustomAction,
    workingOnIt: any,
    showMessage: any,
    reloadCActions: any
}
interface CustomActionItemState {
    mode: ViewMode,
    item: ICustomAction
}

export default class CustomActionItem extends React.Component<CustomActionItemProps, CustomActionItemState> {
    constructor() {
        super();
        this.state = { mode: ViewMode.View, item: { locationInternal: 'ScriptLink' } as ICustomAction };
    }
    private changeMode(e: any) {
        e.preventDefault();
        this.setState({ mode: (this.state.mode === ViewMode.View ? ViewMode.Edit : ViewMode.View) } as CustomActionItemState)
        return false;
    }

    private onSaveBtnClick(e: any) {
        e.preventDefault();
        return false;
    }
    private deleteCustomAction(e: any) {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this Custom Action?")) {
            this.props.workingOnIt(true);
            let caGuid: SP.Guid = new SP.Guid(this.props.item.id.toString());
            let ctx: SP.ClientContext = SP.ClientContext.get_current();
            let web: SP.Web = ctx.get_web();

            let ca: SP.UserCustomAction = web.get_userCustomActions().getById(caGuid);
            ca.deleteObject();
            ctx.load(ca);
            let onSuccess: Function = Function.createDelegate(this, function (sender: any, err: any) {
                this.props.reloadCActions();
                this.props.workingOnIt(false);
                this.props.showMessage(MessageBarType.success, 'The Custom action has been successfully deleted.');
            });
            let onError: Function = Function.createDelegate(this, function (a: any, b: any) {
                console.log(b.get_message());
                this.props.showMessage(MessageBarType.error, 'An error ocurred while deleting the Custom Action.');
            });

            ctx.executeQueryAsync(onSuccess, onError);
        }
        return false;
    }
    private buttons(isEditMode: Boolean) {
        if (isEditMode) {
            return <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                <Button buttonType={ButtonType.icon} icon='Save' rootProps={{ title: 'Save' }} ariaLabel='Save' onClick={this.onSaveBtnClick.bind(this)} />
                <Button buttonType={ButtonType.icon} icon='Cancel' rootProps={{ title: 'Cancel' }} ariaLabel='Cancel' onClick={this.changeMode.bind(this)} />
            </div>
        } else {
            return <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                <Button buttonType={ButtonType.icon} icon='Delete' rootProps={{ title: 'Delete' }} ariaLabel='Delete' onClick={this.deleteCustomAction.bind(this)} />
                <Button buttonType={ButtonType.icon} icon='Edit' rootProps={{ title: 'Edit' }} ariaLabel='Edit' onClick={this.changeMode.bind(this)} />
            </div>
        }
    }

    private scriptInput(isEditMode: Boolean, internalLocation: string) {
        if (internalLocation === 'ScriptBlock') {
            return <TextField label='Script Code' disabled={!isEditMode} multiline onGetErrorMessage={this.getErrorMessage.bind(this)} onChanged={this.onValueInputChange.bind(this)} value={this.state.item.scriptBlock} />
        } else {
            return <TextField label='Script Src' disabled={!isEditMode} onGetErrorMessage={this.getErrorMessage.bind(this)} onChanged={this.onValueInputChange.bind(this)} value={this.state.item.scriptSrc} />
        }
    }

    private getErrorMessage(value: string): string {
        return value === ''
            ? 'The value can not be empty'
            : '';
    }


    private onValueInputChange(inputText: string) {
        let newItem = this.state.item;
        //newItem.locationInternal = inputText;
        //this.setState({ item: newItem } as CustomActionItemState);
        return false;
    }

    private locationInputChange(value: string) {
        debugger;
        let newItem = this.state.item;
        newItem.locationInternal = value;
        this.setState({ item: newItem } as CustomActionItemState);
        return false;
    }
    private getLocationOptions(isViewMode: boolean, locationInternal: string) {

        debugger;
        return [{
            key: 'ScriptBlock',
            text: 'Script Block',
            disabled: isViewMode,
            isChecked: (locationInternal === 'ScriptBlock')
        }, {
            key: 'ScriptLink',
            text: 'Script Link',
            disabled: isViewMode,
            isChecked: (locationInternal === 'ScriptLink')
        }];
    }
    componentDidMount() {
        let propIetm = this.props.item;
        let caItem: ICustomAction;
        let caMode: ViewMode;
        if (propIetm) {
            caItem = propIetm
            caMode = ViewMode.Edit
        } else {
            caMode = ViewMode.New;
        }
        this.setState({
            item: caItem,
            mode: caMode
        } as CustomActionItemState);
    }
    public render() {
        let isViewMode: boolean = this.state.mode === ViewMode.View;

        let choideOptions = this.getLocationOptions(!isViewMode, this.state.item.locationInternal);
        let buttons = this.buttons(isViewMode);
        let scriptInput = this.scriptInput(isViewMode, this.state.item.locationInternal);
        return <div className='ms-ListBasicExample-itemCell  ms-Grid-row' data-is-focusable={true}>
            <div className='ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11'>
           
                {
                    (isViewMode)
                    ? <TextField label="Title" value={this.state.item.title} disabled={!isViewMode} onChanged={this.onValueInputChange.bind(this)} />
                    : null
                }
                <TextField label="Name" value={this.state.item.name} disabled={!isViewMode} onChanged={this.onValueInputChange.bind(this)} />
                {
                    (isViewMode)
                    ? <TextField label="Description" value={this.state.item.description} disabled={!isViewMode} onChanged={this.onValueInputChange.bind(this)} />
                    : null
                }
                <TextField onGetErrorMessage={this.getErrorMessage.bind(this)} label="Sequence" value={this.state.item.sequence} disabled={!isViewMode} onChanged={this.onValueInputChange.bind(this)} />
                <ChoiceGroup options={choideOptions} label="Location" onChanged={this.locationInputChange.bind(this)} />
                {scriptInput}
            </div>
            {buttons}
        </div>;
        /*(
            <li style={styles.caListItem}>
                {item}
                {((isViewMode: boolean) => {
                    if (isViewMode) {
                        let updateBtnStyle = Utils.mergeObjects(buttonsStyle.updateBtnStyle, buttonsStyle.caUpdateBtnStyle);
                        let deleteBtnStyle = Utils.mergeObjects(buttonsStyle.deleteBtnStyle, buttonsStyle.caDeleteBtnStyle);
                        return <div>
                            <a href="javascript:void(0)" style={updateBtnStyle} onClick={this.changeMode.bind(this) }></a>
                            <a href="javascript:void(0)" style={deleteBtnStyle} onClick={this.deleteCustomAction.bind(this) }></a>
                        </div>
                    }
                })(isViewMode) } 
            </li>);*/
    }
}
