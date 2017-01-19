/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="./../../common/interfaces.ts"/>
/// <reference path="./../../common/enums.ts"/>

import * as React from 'react';
import { SpPropertyBagNewItemForm } from './spPropertyBagNewItemForm';
import { IProperty } from '../interfaces/spPropertyBagInterfaces';
import { ItemMode } from './../constants/enums';

interface SpPropertyBagNewItemProps {
    addProperty: Function
}
interface SpPropertyBagNewItemState {
    newProperty: IProperty
}

export default class SpPropertyBagNewItem extends React.Component<SpPropertyBagNewItemProps, SpPropertyBagNewItemState> {
    cleanProperty: IProperty = {
        key: '',
        value: ''
    };
    constructor() {
        super()
        this.state = { newProperty: this.cleanProperty };
        this.addBtnClick = this.addBtnClick.bind(this);
        this.onKeyInputChange = this.onKeyInputChange.bind(this);
        this.onValueInputChange = this.onValueInputChange.bind(this);
    }

    private addBtnClick(e: any) {
        e.preventDefault();
        this.props.addProperty(Object.assign({}, this.state.newProperty, { itemMode: ItemMode.VIEW }));
        this.setState({ newProperty: this.cleanProperty });
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
    public render() {
        return <SpPropertyBagNewItemForm
            addBtnClick={this.addBtnClick}
            newProperty={this.state.newProperty}
            onKeyInputChange={this.onKeyInputChange}
            onValueInputChange={this.onValueInputChange}/>;
    }
}
