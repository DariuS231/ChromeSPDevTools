
import * as React from 'react';
import { CustomActionType } from './../constants/enums';
import { ViewMode } from './../../common/enums';
import Utils from './../../common/utils';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { SpCustomActionsItemInput } from './spCustomActionsItemInput'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ICustomAction } from './../../common/interfaces'

interface CustomActionItemProps {
    item?: ICustomAction,
    caType: CustomActionType
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
        this.onInputChange = this.onInputChange.bind(this);
    }

    private deleteCustomAction(e: any) {
        e.preventDefault();
        if (confirm("Are you sure you want to remove this Custom Action?")) {

        }
        return false;
    }


    private onSaveBtnClick(e: any) {

        //this.props.workingOnIt(true);
        if (this.state.mode === ViewMode.Edit) {
            //this.saveCustomAction();
        } else {
            //this.createCustomAction();
        }

        e.preventDefault();
        return false;
    }
    private onInputChange(value: string, key: string) {
        let newObj = {};
        newObj[key] = value;
        this.setState({
            item: Object.assign({}, this.state.item, newObj)
        } as CustomActionItemState)
    }

    private changeMode(e: any) {
        e.preventDefault();
        if (this.state.mode === ViewMode.New) {
            // this.props.workingOnIt(true);
            // this.props.reloadCActions('', MessageBarType.info);
        } else {
            this.setState({
                mode: (this.state.mode === ViewMode.View ? ViewMode.Edit : ViewMode.View),
                item: this.state.item
            });
        }
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
    public render() {
        let isViewMode: boolean = this.state.mode === ViewMode.View;
        const topBtnText = !isViewMode ? 'Save' : 'Delete';
        const bottomBtnText = !isViewMode ? 'Cancel' : 'Edit';
        let choideOptions = this.getLocationOptions(isViewMode, this.state.item.locationInternal);
        const isScriptBlock = (this.state.item.locationInternal === 'ScriptBlock');

        return <div className='ms-ListBasicExample-itemCell  ms-Grid-row' data-is-focusable={true}>
            <div className='ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11'>
                {
                    !isViewMode && <SpCustomActionsItemInput key="title" label="Title" value={this.state.item.title} disabled={isViewMode} onValueChange={this.onInputChange} />
                }
                <SpCustomActionsItemInput key="name" label="Name" value={this.state.item.name} disabled={isViewMode} onValueChange={this.onInputChange} />
                {
                    !isViewMode && <SpCustomActionsItemInput key="description" label="Description" value={this.state.item.description} disabled={isViewMode} onValueChange={this.onInputChange} />
                }
                <SpCustomActionsItemInput key="sequence"
                    label="Sequence"
                    value={this.state.item.sequence.toString()}
                    disabled={isViewMode}
                    type="number"
                    required={true}
                    onValueChange={this.onInputChange} />
                <ChoiceGroup
                    options={choideOptions}
                    label="Location"
                    onChanged={this.locationInputChange.bind(this)} />
                <SpCustomActionsItemInput key={isScriptBlock ? 'scriptBlock' : 'scriptSrc'}
                    label={isScriptBlock ? 'Script Code' : 'Script Src'}
                    value={isScriptBlock ? this.state.item.scriptBlock : this.state.item.scriptSrc}
                    disabled={isViewMode}
                    multipleLine={isScriptBlock || false}
                    required={true}
                    onValueChange={this.onInputChange} />
            </div>
            <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                <Button
                    buttonType={ButtonType.icon}
                    icon={topBtnText}
                    rootProps={{ title: topBtnText }}
                    ariaLabel={topBtnText}
                    onClick={!isViewMode ? this.onSaveBtnClick.bind(this) : this.deleteCustomAction.bind(this)} />
                <Button
                    buttonType={ButtonType.icon}
                    icon={bottomBtnText}
                    rootProps={{ title: bottomBtnText }}
                    ariaLabel={bottomBtnText}
                    onClick={this.changeMode.bind(this)} />
            </div>
        </div>;
    }
}
