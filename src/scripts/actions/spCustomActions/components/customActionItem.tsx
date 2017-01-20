
import * as React from 'react';
import { ViewMode, CustomActionType } from './../../common/enums';
import Utils from './../../common/utils';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ICustomAction } from './../../common/interfaces'

interface CustomActionItemProps {
    item?: ICustomAction,
    workingOnIt: any,
    showMessage: any,
    reloadCActions: any,
    caType:CustomActionType
}
interface CustomActionItemState {
    mode: ViewMode,
    item: ICustomAction
}

export default class CustomActionItem extends React.Component<CustomActionItemProps, CustomActionItemState> {
    constructor() {
        super();
        this.state = {
            mode: ViewMode.View,
            item: { locationInternal: 'ScriptLink' } as ICustomAction
        };
        this.saveCustomAction = this.saveCustomAction.bind(this);
        this.createCustomAction = this.createCustomAction.bind(this);
    }
    private changeMode(e: any) {
        e.preventDefault();
        if (this.state.mode === ViewMode.New) {
            this.props.workingOnIt(true);
            this.props.reloadCActions('', MessageBarType.info);
        } else {
            this.setState({
                mode: (this.state.mode === ViewMode.View ? ViewMode.Edit : ViewMode.View),
                item: this.state.item
            });
        }
        return false;
    }

    private onSaveBtnClick(e: any) {

        this.props.workingOnIt(true);
        if (this.state.mode === ViewMode.Edit) {
            this.saveCustomAction();
        } else {
            this.createCustomAction();
        }

        e.preventDefault();
        return false;
    }
    private deleteCustomAction(e: any) {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this Custom Action?")) {
            this.props.workingOnIt(true);
            let caGuid: SP.Guid = new SP.Guid(this.props.item.id.toString());
            let ctx: SP.ClientContext = SP.ClientContext.get_current();
            let site: SP.Site = ctx.get_site();
            let web: SP.Web = ctx.get_web();
            let ca: SP.UserCustomAction = (this.props.caType === CustomActionType.Web) 
            ? web.get_userCustomActions().getById(caGuid)
            : site.get_userCustomActions().getById(caGuid);

            ca.deleteObject();
            ctx.load(ca);
            let onSuccess = (sender: any, err: any) => {
                this.props.reloadCActions('The Custom action has been successfully deleted.', MessageBarType.success);
            };
            let onError = (a: any, b: any) => {
                console.log(b.get_message());
                this.props.showMessage(MessageBarType.error, 'An error ocurred while deleting the Custom Action.');
            };

            ctx.executeQueryAsync(onSuccess, onError);
        }
        return false;
    }
    private buttons(isViewMode: Boolean) {
        if (!isViewMode) {
            return <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                <Button
                    buttonType={ButtonType.icon}
                    icon='Save'
                    rootProps={{ title: 'Save' }}
                    ariaLabel='Save'
                    onClick={this.onSaveBtnClick.bind(this)} />
                <Button
                    buttonType={ButtonType.icon}
                    icon='Cancel'
                    rootProps={{ title: 'Cancel' }}
                    ariaLabel='Cancel'
                    onClick={this.changeMode.bind(this)} />
            </div>
        } else {
            return <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                <Button
                    buttonType={ButtonType.icon}
                    icon='Delete' rootProps={{ title: 'Delete' }}
                    ariaLabel='Delete'
                    onClick={this.deleteCustomAction.bind(this)} />
                <Button
                    buttonType={ButtonType.icon}
                    icon='Edit' rootProps={{ title: 'Edit' }}
                    ariaLabel='Edit'
                    onClick={this.changeMode.bind(this)} />
            </div>
        }
    }
    private saveCustomAction() {
        let caGuid: SP.Guid = new SP.Guid(this.props.item.id.toString());
        let ctx: SP.ClientContext = SP.ClientContext.get_current();
        let site: SP.Site = ctx.get_site();
        let web: SP.Web = ctx.get_web();
        let ca: SP.UserCustomAction = (this.props.caType === CustomActionType.Web) 
        ? web.get_userCustomActions().getById(caGuid)
        : site.get_userCustomActions().getById(caGuid);

        ca = this.setCustomActionData(ca);
        ca.update();
        web.update();

        ctx.load(ca);
        let onSuccess = (sender: any, err: any) => {
            //this.props.changeModefunction();
            this.props.reloadCActions('The Custom action has been successfully updated.', MessageBarType.success);
        };
        let onError = (a: any, b: any) => {
            console.log(b.get_message());
            this.props.showMessage(MessageBarType.error, 'An error occured while created a new Custom Action.');
        };
        ctx.executeQueryAsync(onSuccess, onError);
    }
    private createCustomAction(): void {
        let ctx: SP.ClientContext = SP.ClientContext.get_current();
        let site: SP.Site = ctx.get_site();
        let web: SP.Web = ctx.get_web();
        let ca: SP.UserCustomAction = (this.props.caType === CustomActionType.Web) 
        ? web.get_userCustomActions().add()
        : site.get_userCustomActions().add();

        ca = this.setCustomActionData(ca);
        ca.update();
        web.update();
        let onSuccess = (sender: any, err: any) => {
            //this.props.changeModefunction();
            this.props.reloadCActions('The Custom action has been successfully created.', MessageBarType.success);
        };
        let onError = (a: any, b: any) => {
            console.log(b.get_message());
            this.props.showMessage(MessageBarType.error, 'An error occured while created a new Custom Action.');
        };
        ctx.executeQueryAsync(onSuccess, onError);
    }
    private setCustomActionData(ca: SP.UserCustomAction): SP.UserCustomAction {
        ca.set_title(this.state.item.title);
        ca.set_name(this.state.item.name);
        ca.set_description(this.state.item.description);
        ca.set_sequence(this.state.item.sequence);
        ca.set_location('ScriptLink');
        if (this.state.item.locationInternal === 'ScriptLink') {
            ca.set_scriptSrc(this.state.item.scriptSrc);
            ca.set_scriptBlock('');
        } else {
            ca.set_scriptSrc('');
            ca.set_scriptBlock(this.state.item.scriptBlock);
        }

        return ca;
    }
    private scriptInput(isViewMode: boolean, internalLocation: string) {
        if (internalLocation === 'ScriptBlock') {
            return <TextField
                label='Script Code'
                disabled={isViewMode}
                multiline
                onGetErrorMessage={this.getErrorMessage.bind(this)}
                onChanged={this.onScriptBlockChange.bind(this)}
                value={this.state.item.scriptBlock} />
        } else {
            return <TextField
                label='Script Src'
                disabled={isViewMode}
                onGetErrorMessage={this.getErrorMessage.bind(this)}
                onChanged={this.onScriptSourceChange.bind(this)}
                value={this.state.item.scriptSrc} />
        }
    }

    private getErrorMessage(value: string): string {
        let isScriptValid: Boolean = true;
        let errorMessage: string = '';

        if (value === '') {
            errorMessage = 'The value can not be empty';
            isScriptValid = false;
        }

        return errorMessage;
    }

    private getSequenceErrorMessage(value: string): string {
        let isScriptValid: Boolean = true;
        let errorMessage: string = '';

        if (value === '') {
            errorMessage = 'The value can not be empty';
            isScriptValid = false;
        } else if (!(/^\d+$/.test(value))) {
            errorMessage = 'The value must be a Number';
            isScriptValid = false;
        }
        return errorMessage;
    }

    private isScriptValid(): boolean {
        if (this.state.item.locationInternal === 'ScriptBlock') {
            return this.state.item.scriptBlock !== '';
        } else {
            return this.state.item.scriptSrc !== '';
        }
    }
    private onTitleChange(inputText: string, b: any) {
        let newItem = this.state.item;
        newItem.title = inputText;
        this.setState({ item: newItem } as CustomActionItemState);
        return false;
    }

    private onNameChange(inputText: string, b: any) {
        let newItem = this.state.item;
        newItem.name = inputText;
        this.setState({ item: newItem } as CustomActionItemState);
        return false;
    }
    private onDescriptionChange(inputText: string, b: any) {
        let newItem = this.state.item;
        newItem.description = inputText;
        this.setState({ item: newItem } as CustomActionItemState);
        return false;
    }
    private onSequenceChange(inputText: string, b: any) {
        let newItem = this.state.item;
        newItem.sequence = inputText;
        this.setState({ item: newItem } as CustomActionItemState);
        return false;
    }
    private onScriptBlockChange(inputText: string, b: any) {
        let newItem = this.state.item;
        newItem.scriptBlock = inputText;
        this.setState({ item: newItem } as CustomActionItemState);
        return false;
    }
    private onScriptSourceChange(inputText: string, b: any) {
        let newItem = this.state.item;
        newItem.scriptSrc = inputText;
        this.setState({ item: newItem } as CustomActionItemState);
        return false;
    }

    private locationInputChange(value: any) {
        let newItem = this.state.item;
        newItem.locationInternal = value.key;
        this.setState({ item: newItem } as CustomActionItemState);
        return false;
    }


    private getLocationOptions(isViewMode: boolean, locationInternal: string) {
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
        let caItem: ICustomAction = { locationInternal: 'ScriptLink' } as ICustomAction;
        let caMode: ViewMode = ViewMode.View;
        if (propIetm) {
            caItem = propIetm;
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

        let choideOptions = this.getLocationOptions(isViewMode, this.state.item.locationInternal);
        let buttons = this.buttons(isViewMode);
        let scriptInput = this.scriptInput(isViewMode, this.state.item.locationInternal);
        return <div className='ms-ListBasicExample-itemCell  ms-Grid-row' data-is-focusable={true}>
            <div className='ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11'>
                {
                    (!isViewMode)
                        ? <TextField
                            label="Title"
                            value={this.state.item.title}
                            disabled={isViewMode}
                            onChanged={this.onTitleChange.bind(this)} />
                        : null
                }
                <TextField
                    label="Name"
                    value={this.state.item.name}
                    disabled={isViewMode}
                    onChanged={this.onNameChange.bind(this)} />
                {
                    (!isViewMode)
                        ? <TextField
                            label="Description"
                            value={this.state.item.description}
                            disabled={isViewMode}
                            onChanged={this.onDescriptionChange.bind(this)} />
                        : null
                }
                <TextField
                    onGetErrorMessage={this.getSequenceErrorMessage.bind(this)}
                    label="Sequence"
                    type="number"
                    value={this.state.item.sequence}
                    disabled={isViewMode}
                    onChanged={this.onSequenceChange.bind(this)} />
                <ChoiceGroup
                    options={choideOptions}
                    label="Location"
                    onChanged={this.locationInputChange.bind(this)} />
                {scriptInput}
            </div>
            {buttons}
        </div>;
    }
}
