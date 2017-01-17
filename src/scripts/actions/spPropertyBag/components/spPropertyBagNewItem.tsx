/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="./../../common/interfaces.ts"/>
/// <reference path="./../../common/enums.ts"/>

import * as React from 'react';
import { SpPropertyBagNewItemForm } from './spPropertyBagNewItemForm';
import { IProperty } from '../interfaces/spPropertyBagInterfaces';
import { ItemMode } from './../constants/enums';

interface SpPropertyBagNewItemProps {
    createProperty: Function
}
interface SpPropertyBagNewItemState {
    newProperty: IProperty
}

export default class SpPropertyBagNewItem extends React.Component<SpPropertyBagNewItemProps, SpPropertyBagNewItemState> {
    constructor() {
        super()
        this.state = {
            newProperty: {
                key: '',
                value: '',
                itemMode: ItemMode.CREATE
            }
        }
        this.getErrorMessage = this.getErrorMessage.bind(this);
        this.addBtnClick = this.addBtnClick.bind(this);
        this.onKeyInputChange = this.onKeyInputChange.bind(this);
        this.onValueInputChange = this.onValueInputChange.bind(this);
    }

    private addBtnClick(e: any) {
        e.preventDefault();
        this.props.createProperty(Object.assign({}, this.state.newProperty, { itemMode: ItemMode.VIEW }));
        this.setState({
            newProperty: {
                key: '',
                value: '',
                itemMode: ItemMode.CREATE
            }
        });
        return false;
    }
    private onKeyInputChange(str: string) {
        this.setState({
            newProperty: Object.assign({}, this.state.newProperty, { key: str })
        })
    }

    private onValueInputChange(str: string) {
        this.setState({
            newProperty: Object.assign({}, this.state.newProperty, { value: str })
        })
    }
    private getErrorMessage(value: string): string {
        return value === ''
            ? 'This fields can not be empty'
            : '';
    }
    public render() {
        return <SpPropertyBagNewItemForm
            addBtnClick={this.addBtnClick}
            newProperty={this.state.newProperty}
            onKeyInputChange={this.onKeyInputChange}
            onValueInputChange={this.onValueInputChange}
            getErrorMessage={this.getErrorMessage} />;
    }
}
