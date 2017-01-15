/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="./../../common/interfaces.ts"/>
/// <reference path="./../../common/enums.ts"/>

import * as React from 'react';
import Utils from './../../common/utils';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

interface NewKeyValueItemState {
    newKey: string,
    newValue: string
}
interface NewKeyValueItemProps {
    moduleTitle: string,
    keyDisplayName: string,
    valueDisplayName: string
}

export default class SpPropertyBagNewItem extends React.Component<NewKeyValueItemProps, NewKeyValueItemState> {
    constructor() {
        super();
        this.state = {
            newKey: '',
            newValue: ''
        };
    }
    private addBtnClick(e: any) {
        e.preventDefault();
        if (this.state.newKey !== '' && this.state.newValue !== '') {
            //this.props.onNewItemClick(this.state.newKey, this.state.newValue);
            this.setState({
                newKey: '',
                newValue: ''
            } as NewKeyValueItemState);
        }
        return false;
    }
    private onKeyInputChange(str: string) {
        this.setState({ newKey: str } as NewKeyValueItemState);
    }

    private onValueInputChange(str: string) {
        this.setState({ newValue: str } as NewKeyValueItemState);
    }
    private getErrorMessage(value: string): string {
        return value === ''
            ? 'This fields can not be empty'
            : '';
    }
    public render() {

        return <div className="ms-Grid">
            <div className="ms-Grid-row">
                <h2>{this.props.moduleTitle}</h2>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <TextField placeholder='New property name' onGetErrorMessage={ this.getErrorMessage.bind(this) } label="Property Name" value={this.state.newKey} onChanged={this.onKeyInputChange.bind(this) } />
                </div>
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <TextField placeholder='New property value' onGetErrorMessage={ this.getErrorMessage.bind(this) } label="Property Value" value={this.state.newValue} onChanged={this.onValueInputChange.bind(this) } />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                </div>
                <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2 spProp-create-button">
                    <Button buttonType={ ButtonType.primary } onClick={this.addBtnClick.bind(this) } >
                        Create
                    </Button>
                </div>
            </div>
        </div>;
    }
}