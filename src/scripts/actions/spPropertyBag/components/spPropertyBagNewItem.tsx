/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="./../../common/interfaces.ts"/>
/// <reference path="./../../common/enums.ts"/>

import * as React from 'react';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IProperty } from '../interfaces/spPropertyBagInterfaces';
import { ItemMode } from './../constants/enums';
import propertyActionsCreatorsMap from '../actions/spPropertyBagActions';
import { IMapStateToPropsState, IMapStateToProps } from '../interfaces/spPropertyBagInterfaces'

interface SpPropertyBagNewItemProps {
    newProperty: IProperty,
    updateNewProperty: Function,
    createProperty: Function
}
interface SpPropertyBagNewItemActions{
    updateNewProperty: Function,
    createProperty: Function
}

class SpPropertyBagNewItem extends React.Component<SpPropertyBagNewItemProps, {}> {
    constructor(){
        super()
        this.getErrorMessage = this.getErrorMessage.bind(this);
    }

    private addBtnClick(e: any) {
        e.preventDefault();
        this.props.createProperty(Object.assign({}, this.props.newProperty, { itemMode: ItemMode.VIEW }));
        return false;
    }
    private onKeyInputChange(str: string) {    
        this.props.updateNewProperty(Object.assign({}, this.props.newProperty, { key: str }));
    }

    private onValueInputChange(str: string) {
        this.props.updateNewProperty(Object.assign({}, this.props.newProperty, { value: str }));
    }
    private getErrorMessage(value: string): string {
        return value === ''
            ? 'This fields can not be empty'
            : '';
    }
    public render() {

        return <div className="ms-Grid">
            <div className="ms-Grid-row">
                <h2>New web property</h2>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <TextField placeholder='New property name' onGetErrorMessage={ this.getErrorMessage } label="Property Name" value={this.props.newProperty.key} onChanged={this.onKeyInputChange.bind(this) } />
                </div>
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <TextField placeholder='New property value' onGetErrorMessage={ this.getErrorMessage } label="Property Value" value={this.props.newProperty.value} onChanged={this.onValueInputChange.bind(this) } />
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

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): any => {
    return {}
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SpPropertyBagNewItemActions => {
    return {
        updateNewProperty: (property: IProperty) => {
            dispatch(propertyActionsCreatorsMap["updateNewProperty"](property));
        },
        createProperty: (property: IProperty) => {
            dispatch(propertyActionsCreatorsMap["createProperty"](property));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpPropertyBagNewItem);