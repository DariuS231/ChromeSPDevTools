/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.tsx"/>
import * as React from 'react';


export default class KeyValueItemProps extends React.Component<KeyValueItemPropsProps, KeyValueItemPropsState> {
    constructor(props:any) {
        super(props); 
        this.state = {
            itemInputValue: this.props.itemValue
        };
    }

    private onValueInputChange(e: any) {
        this.setState({ itemInputValue: e.target.value } as KeyValueItemPropsState);
    }
    public render() {
        return <tr>
            <td>
                <label htmlFor="valueInput">{this.props.itemKey}: </label>
            </td>
            <td>
                <input id="valueInput" value={this.state.itemInputValue} onChange={this.onValueInputChange.bind(this) } />
            </td>
            <td>
                <a href="javascript:void(0)" >Update</a> 
            </td>
            <td>
                <a href="javascript:void(0)" >Delete</a>
            </td>
        </tr>;
    }
}