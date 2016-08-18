/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import { NewKeyValueItemStyles as nkvStyles } from './Styles'
import Utils from './utils';

interface NewKeyValueItemState {
    newKey: string,
    newValue: string
}
interface NewKeyValueItemProps {
    moduleTitle: string,
    keyDisplayName: string,
    valueDisplayName: string,
    onNewItemClick: any
}

export default class NewKeyValueItem extends React.Component<NewKeyValueItemProps, NewKeyValueItemState> {
    constructor() {
        super();
        this.state = {
            newKey: '',
            newValue: ''
        };
    }
    private addBtnClick(e: any) {
        this.props.onNewItemClick(this.state.newKey, this.state.newValue);
        this.setState({
            newKey: '',
            newValue: ''
        } as NewKeyValueItemState);
    }
    private onKeyInputChange(e: any) {
        this.setState({ newKey: e.target.value } as NewKeyValueItemState);
    }

    private onValueInputChange(e: any) {
        this.setState({ newValue: e.target.value } as NewKeyValueItemState);
    }
    public render() {
        return <div>
            <h2>{this.props.moduleTitle}</h2>
            <div style={nkvStyles.divStyle}>
                <label style={nkvStyles.labelStyle} htmlFor="newKey">{this.props.keyDisplayName}: </label>
                <input style={nkvStyles.inputStyle} id="newKey" value={this.state.newKey} onChange={this.onKeyInputChange.bind(this) } />
            </div>
            <div style={nkvStyles.divStyle}>
                <label style={nkvStyles.labelStyle} htmlFor="newValue">{this.props.valueDisplayName}: </label>
                <input style={nkvStyles.inputStyle} id="newValue" value={this.state.newValue} onChange={this.onValueInputChange.bind(this) } />
            </div>
            <a href="javascript:void(0)" style={nkvStyles.btnStylePlus} onClick={this.addBtnClick.bind(this) }>Add</a>
        </div>;
    }
}