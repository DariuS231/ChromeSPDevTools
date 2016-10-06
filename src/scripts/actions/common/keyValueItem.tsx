/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import {
    TextField,
    Button,
    ButtonType
} from './../../../../node_modules/office-ui-fabric-react/lib/index';
interface KeyValueItemState {
    itemInputValue: string,
    inEditMode: boolean
}
interface KeyValueItemProps {
    item: IKeyValue
    onUpdateClick: any,
    onDeleteClick: any,
    itemIndex: number
}

export default class KeyValueItem extends React.Component<KeyValueItemProps, KeyValueItemState> {
    constructor() {
        super();
        this.state = {
            itemInputValue: '',
            inEditMode: false
        };
        this.buttons.bind(this);
    }
    componentDidUpdate() {
        if (this.state.inEditMode) {
            let inputId: string = this.getInputId();
            let input = document.getElementById(inputId);
            if (input !== null && typeof input !== "undefined")
                input.focus();
        }
    }
    private getInputId() {
        return 'spPropInput_' + this.props.item.key.trim();
    }
    componentDidMount() {
        this.setState({
            itemInputValue: this.props.item.value
        } as KeyValueItemState);
    }
    private onDeleteClick(e: any) {
        e.preventDefault()
        this.props.onDeleteClick(this.props.item.key);
        return false;
    }
    private onUpdateClick(e: any) {
        e.preventDefault()
        if (this.state.itemInputValue !== '') {
            this.props.onUpdateClick(this.props.item.key, this.state.itemInputValue);
        }
        return false;
    }
    private onValueInputChange(inputText: string) {
        debugger;
        this.setState({ itemInputValue: inputText } as KeyValueItemState);
        return false;
    }
    private onUpdateBtnClick(e: any) {
        e.preventDefault()
        let isEditModeNew: boolean = !this.state.inEditMode;
        let newState: any = { inEditMode: isEditModeNew };

        if (!isEditModeNew) {
            newState.itemInputValue = this.props.item.value;
        }
        this.setState(newState as KeyValueItemState);

        return false;
    }

    private getErrorMessage(value: string): string {
        return value === ''
            ? 'The value can not be empty'
            : '';
    }

    private buttons(isEditMode: Boolean) {
        return <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
            {
                isEditMode
                    ? null
                    : <Button  buttonType={ ButtonType.icon } icon='Delete' rootProps={ { title: 'Delete' } } ariaLabel='Delete' onClick={this.onDeleteClick.bind(this) } />
            }
            {
                isEditMode
                    ? null
                    : <Button  buttonType={ ButtonType.icon } icon='Edit' rootProps={ { title: 'Edit' } } ariaLabel='Edit' onClick={this.onUpdateBtnClick.bind(this) } />
            }
            {
                isEditMode
                    ? <Button  buttonType={ ButtonType.icon } icon='Save' rootProps={ { title: 'Save' } } ariaLabel='Save' onClick={this.onUpdateClick.bind(this) } />
                    : null
            }
            {
                isEditMode
                    ? <Button  buttonType={ ButtonType.icon } icon='Cancel' rootProps={ { title: 'Cancel' } } ariaLabel='Cancel' onClick={this.onUpdateBtnClick.bind(this) } />
                    : null
            }

        </div>
    }
    public render() {
        let isEditMode: boolean = this.state.inEditMode;
        let inputId: string = this.getInputId();


        return <div className='ms-ListBasicExample-itemCell  ms-Grid-row' data-is-focusable={ true }>
            <div className='ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11'>
                <TextField id={inputId} onGetErrorMessage={ this.getErrorMessage.bind(this) } label={this.props.item.key} value={this.state.itemInputValue} disabled={ !isEditMode } onChanged={this.onValueInputChange.bind(this) } />
            </div>
            { this.buttons(isEditMode) }
        </div>;
    }
}