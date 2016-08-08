/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.tsx"/>
import * as React from 'react';

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
            <label htmlFor="newKey">{this.props.keyDisplayName}: </label><input id="newKey" value={this.state.newKey} onChange={this.onKeyInputChange.bind(this)} />
            <label htmlFor="newValue">{this.props.valueDisplayName}: </label><input id="newValue" value={this.state.newValue} onChange={this.onValueInputChange.bind(this)} />
            <a href="javascript:void(0)" onClick={this.addBtnClick.bind(this) }>Add</a>
        </div>;
    }
}