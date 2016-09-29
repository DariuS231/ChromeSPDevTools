/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import { KeyValueItemStyles as kviStyles, ButtonsStyle as buttonsStyles } from './Styles'
interface KeyValueItemState {
    itemInputValue: string,
    inEditMode: boolean
}
interface KeyValueItemProps {
    item: IKeyValue
    onUpdateClick: any,
    onDeleteClick: any,
    itemIndex: number,
    showOnlyIconsInButtons: boolean
}

export default class KeyValueItem extends React.Component<KeyValueItemProps, KeyValueItemState> {
    constructor() {
        super();
        this.state = {
            itemInputValue: '',
            inEditMode: false
        };
    }
    componentDidUpdate() {
        if (this.state.inEditMode) {
            let inputId:string = this.getInputId();
            let input = document.getElementById(inputId);
            if (input !== null && typeof input !== "undefined")
                input.focus();
        }
    }
    private  getInputId(){
        return 'spPropInput_' + this.props.item.key.trim();
    }
    componentDidMount() {
        this.setState({
            itemInputValue: this.props.item.value
        } as KeyValueItemState);
    }
    private onDeleteClick(e: any) {
        this.props.onDeleteClick(this.props.item.key);
    }
    private onCancelClick(e: any) {
        this.setState({ inEditMode: false } as KeyValueItemState);
    }
    private onUpdateClick(e: any) {
        this.props.onUpdateClick(this.props.item.key, this.state.itemInputValue);
    }
    private onValueInputChange(e: any) {
        this.setState({ itemInputValue: e.target.value } as KeyValueItemState);
    }
    private onUpdateBtnClick(e: any) {
        this.setState({ inEditMode: true } as KeyValueItemState);
    }

    public render() {
        let updateBtn: any;
        let deleteBnt: any;
        let valueElement: any;
        let isEditMode: boolean = this.state.inEditMode;
        let inputId:string = this.getInputId();

        let inputValue: string = '';
        let inputStyle: any = isEditMode ? buttonsStyles.saveBtnStyle : buttonsStyles.updateBtnStyle;
        let deletBtnStyle: any = buttonsStyles.deleteBtnStyle;
        let cancelBtnStyles: any = buttonsStyles.cancelBtnStyle;
        if (!this.props.showOnlyIconsInButtons) {
            inputValue = isEditMode ? 'Save' : 'Edit';
            inputStyle['backgroundPosition'] = '10% 50%';
            deletBtnStyle['backgroundPosition'] = '10% 50%';
            cancelBtnStyles['backgroundPosition'] = '10% 50%';
        } else {
            inputStyle['backgroundPosition'] = '50% 50%';
            deletBtnStyle['backgroundPosition'] = '50% 50%';
            cancelBtnStyles['backgroundPosition'] = '50% 50%';
        }

        if (isEditMode) {
            deleteBnt = (<input type="button" style={cancelBtnStyles} onClick={this.onCancelClick.bind(this) } title="Cancel" value={this.props.showOnlyIconsInButtons ? '' : 'Cancel'}/>);
            updateBtn = (<input type="button" title="Save" value={inputValue} style={inputStyle} onClick={this.onUpdateClick.bind(this) } />);
            valueElement = (<input style={kviStyles.inputStyles} id={inputId} value={this.state.itemInputValue} onChange={this.onValueInputChange.bind(this) } />);
        } else {
            deleteBnt = (<input type="button" style={deletBtnStyle} onClick={this.onDeleteClick.bind(this) } title="Delete" value={this.props.showOnlyIconsInButtons ? '' : 'Delete'}/>);
            updateBtn = (<input type="button" title="Edit" value={inputValue} style={inputStyle} onClick={this.onUpdateBtnClick.bind(this) } />);
            valueElement = (<input style={kviStyles.inputReadOnlyStyles} id={inputId} value={this.state.itemInputValue} onChange={this.onValueInputChange.bind(this) } readOnly />);
        }

        return <tr style={(Math.abs(this.props.itemIndex % 2) !== 1) ? kviStyles.oddTableRowStyles : {}}>
            <th style={kviStyles.headerStyle}>
                {this.props.item.key}:
            </th>
            <td style={kviStyles.tableCellStyle}>
                {valueElement}
            </td>
            <td style={kviStyles.tableCellStyle}>
                {updateBtn}
            </td>
            <td style={kviStyles.tableCellStyle}>
                {deleteBnt}
            </td>
        </tr>;
    }
}