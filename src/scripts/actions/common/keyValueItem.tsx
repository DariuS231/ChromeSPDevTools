/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.tsx"/>
import * as React from 'react';

interface KeyValueItemState {
    itemInputValue:string
}
interface KeyValueItemProps {
    item: IKeyValue
    onUpdateClick: any,
    onDeleteClick: any,
    itemIndex:number
}

export default class KeyValueItem extends React.Component<KeyValueItemProps, KeyValueItemState> {
    constructor(props:any) {
        super(props); 
        this.state = {
            itemInputValue: this.props.item.value
        };
    }
    private onDeleteClick(e:any){
        this.props.onDeleteClick(this.props.item.key);
    }
    private onUpdateClick(e:any){
        this.props.onUpdateClick(this.props.item.key, this.state.itemInputValue);
    }
    private onValueInputChange(e: any) {
        this.setState({ itemInputValue: e.target.value } as KeyValueItemState);
    }
    public render() {
        let tableRowStyles:any ={}; 
        if(Math.abs(this.props.itemIndex % 2) !== 1){
            tableRowStyles.backgroundColor = 'rgba(100,149,237, 0.1)';
        }
        return <tr style={tableRowStyles}>
            <th style={{textAlign: 'right' }}>
                {this.props.item.key}:
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