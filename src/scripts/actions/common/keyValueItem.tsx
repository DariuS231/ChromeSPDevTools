/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.tsx"/>
import * as React from 'react';

interface KeyValueItemState {
    itemInputValue:string
}
interface KeyValueItemProps {
    itemKey: string,
    itemValue: string,
    onUpdateClick: any,
    onDeleteClick: any
}

export default class KeyValueItem extends React.Component<KeyValueItemProps, KeyValueItemState> {
    constructor(props:any) {
        super(props); 
        this.state = {
            itemInputValue: this.props.itemValue
        };
    }
    private onDeleteClick(e:any){
        this.props.onDeleteClick(this.props.itemKey);
    }
    private onUpdateClick(e:any){
        this.props.onUpdateClick(this.props.itemKey, this.state.itemInputValue);
    }
    private onValueInputChange(e: any) {
        this.setState({ itemInputValue: e.target.value } as KeyValueItemState);
    }
    public render() {
        return <tr>
            <th style={{textAlign: 'right' }}>
                {this.props.itemKey}:
            </th>
            <td>
                <input style={{width:'240px'}} id="valueInput" value={this.state.itemInputValue} onChange={this.onValueInputChange.bind(this) } />
            </td>
            <td>
                <a href="javascript:void(0)" onClick={this.onUpdateClick.bind(this)}>Update</a> 
            </td>
            <td>
                <a href="javascript:void(0)" onClick={this.onDeleteClick.bind(this)}>Delete</a>
            </td>
        </tr>;
    }
}