/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import { KeyValueItemStyles as kviStyles } from './Styles'
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
    inputId: string;
    constructor(props: any) {
        super(props);
        this.state = {
            itemInputValue: this.props.item.value,
            inEditMode: false
        };
        this.inputId = 'spPropInput_' + this.props.item.key.trim();
    }
    componentDidUpdate() {
        if (this.state.inEditMode) {
            let input = document.getElementById(this.inputId);
            if (input !== null && typeof input !== "undefined")
                input.focus();
        }
    }

    private onDeleteClick(e: any) {
        this.props.onDeleteClick(this.props.item.key);
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
        let valueElement: any;

        if (this.state.inEditMode) {
            updateBtn = (<input type="button" title="Save" value="Save" style={kviStyles.saveBtnStyle} onClick={this.onUpdateClick.bind(this) } />);
            valueElement = (<input style={kviStyles.inputStyles} id={this.inputId} value={this.state.itemInputValue} onChange={this.onValueInputChange.bind(this) } />);
        } else {
            updateBtn = (<input type="button" title="Edit" value="Edit" style={kviStyles.updateBtnStyle} onClick={this.onUpdateBtnClick.bind(this) } />);
            valueElement = (<input style={kviStyles.inputReadOnlyStyles} id={this.inputId} value={this.state.itemInputValue} onChange={this.onValueInputChange.bind(this) } readOnly />);
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
                <input type="button" style={kviStyles.deleteBtnStyle} onClick={this.onDeleteClick.bind(this) } title="Delete" value="Delete"/>
            </td>
        </tr>;
    }
}