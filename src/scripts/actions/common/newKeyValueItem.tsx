/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import { NewKeyValueItemStyles as nkvStyles, ButtonsStyle as buttonsStyles } from './Styles'
import Utils from './utils';

interface NewKeyValueItemState {
    newKey: string,
    newValue: string
}
interface NewKeyValueItemProps {
    moduleTitle: string,
    keyDisplayName: string,
    valueDisplayName: string,
    onNewItemClick: any,
    showOnlyIconsInButtons:boolean
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
        e.preventDefault();
        this.props.onNewItemClick(this.state.newKey, this.state.newValue);
        this.setState({
            newKey: '',
            newValue: ''
        } as NewKeyValueItemState);
        return false;
    }
    private onKeyInputChange(e: any) {
        this.setState({ newKey: e.target.value } as NewKeyValueItemState);
    }

    private onValueInputChange(e: any) {
        this.setState({ newValue: e.target.value } as NewKeyValueItemState);
    }
    public render() {
        let inputValue:string = '';
        let inputStyle:any = buttonsStyles.newBtnStyle;
        if(!this.props.showOnlyIconsInButtons){
            inputValue = 'Add';
            inputStyle['backgroundPosition'] = '10% 50%';
        } else {
            inputStyle['backgroundPosition'] = '50% 50%';
        }
        return <form onSubmit={this.addBtnClick.bind(this) }>
            <h2>{this.props.moduleTitle}</h2>
            <div style={nkvStyles.divStyle}>
                <label style={nkvStyles.labelStyle} htmlFor="newKey">{this.props.keyDisplayName}: </label>
                <input style={nkvStyles.inputStyle} id="newKey" required="required" value={this.state.newKey} onChange={this.onKeyInputChange.bind(this) } />
            </div>
            <div style={nkvStyles.divStyle}>
                <label style={nkvStyles.labelStyle} htmlFor="newValue">{this.props.valueDisplayName}: </label>
                <input style={nkvStyles.inputStyle} id="newValue" required="required" value={this.state.newValue} onChange={this.onValueInputChange.bind(this) } />
            </div>
            <input type="submit" style={inputStyle} title="Add" value={inputValue} />
        </form>;
    }
}