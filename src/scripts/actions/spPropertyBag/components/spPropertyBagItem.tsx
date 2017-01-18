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

interface SpPropertyBagItemActions {
    updateProperty: Function,
    deleteProperty: Function
}

interface KeyValueItemProps {
    item: IProperty,
    itemIndex: number,
    updateProperty: Function,
    deleteProperty: Function
}

class SpPropertyBagItem extends React.Component<KeyValueItemProps, {}> {
    constructor() {
        super();
        this.buttons.bind(this);
    }
    private getInputId() {
        return 'spPropInput_' + this.props.item.key.trim();
    }
    private onDeleteClick(e: any) {
        e.preventDefault()
        this.props.deleteProperty(this.props.item);
        return false;
    }
    private onUpdateClick(e: any) {
        e.preventDefault()
        this.props.updateProperty(Object.assign({}, this.props.item, { itemMode: ItemMode.VIEW }));
        return false;
    }
    private onValueInputChange(inputText: string) {
        this.props.updateProperty(Object.assign({}, this.props.item, { value: inputText }));
        return false;
    }
    private onUpdateBtnClick(e: any) {
        e.preventDefault()
        const newMode = this.props.item.itemMode === ItemMode.EDIT ? ItemMode.VIEW : ItemMode.EDIT;
        this.props.updateProperty(Object.assign({}, this.props.item, { itemMode: newMode }));
        return false;
    }

    private getErrorMessage(value: string): string {
        return value === ''
            ? 'The value can not be empty'
            : '';
    }

    private buttons(isEditMode: Boolean) {
        if (isEditMode) {
            return <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                <Button buttonType={ButtonType.icon} icon='Save' rootProps={{ title: 'Save' }} ariaLabel='Save' onClick={this.onUpdateClick.bind(this)} />
                <Button buttonType={ButtonType.icon} icon='Cancel' rootProps={{ title: 'Cancel' }} ariaLabel='Cancel' onClick={this.onUpdateBtnClick.bind(this)} />
            </div>
        } else {
            return <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                <Button buttonType={ButtonType.icon} icon='Delete' rootProps={{ title: 'Delete' }} ariaLabel='Delete' onClick={this.onDeleteClick.bind(this)} />
                <Button buttonType={ButtonType.icon} icon='Edit' rootProps={{ title: 'Edit' }} ariaLabel='Edit' onClick={this.onUpdateBtnClick.bind(this)} />
            </div>
        }
    }
    public render() {
        let isEditMode: boolean = this.props.item.itemMode === ItemMode.EDIT;
        let inputId: string = this.getInputId();

        return <div className='ms-ListBasicExample-itemCell  ms-Grid-row' data-is-focusable={true}>
            <div className='ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11'>
                <TextField id={inputId} onGetErrorMessage={this.getErrorMessage.bind(this)} label={this.props.item.key} value={this.props.item.value} disabled={!isEditMode} onChanged={this.onValueInputChange.bind(this)} />
            </div>
            {this.buttons(isEditMode)}
        </div>;
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): any => {
    return {}
}

const mapDispatchToProps = (dispatch: Dispatch<any>): SpPropertyBagItemActions => {
    return {
        updateProperty: (property: IProperty) => {
            dispatch(propertyActionsCreatorsMap.updateProperty(property));
        },
        deleteProperty: (property: IProperty) => {
            dispatch(propertyActionsCreatorsMap.deleteProperty(property));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpPropertyBagItem);
