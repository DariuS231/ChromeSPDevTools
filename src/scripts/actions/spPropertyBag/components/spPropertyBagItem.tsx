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

interface SpPropertyBagItemProps {
    item: IProperty,
    itemIndex: number,
    updateProperty: Function,
    deleteProperty: Function
}

interface SpPropertyBagItemState {
    itemInputValue: string,
    inEditMode: boolean
}

class SpPropertyBagItem extends React.Component<SpPropertyBagItemProps, SpPropertyBagItemState> {
    constructor() {
        super();
        this.state = {
            itemInputValue: '',
            inEditMode: false
        }
        this.buttons = this.buttons.bind(this);
        this.onUpdateClick = this.onUpdateClick.bind(this);
        this.onUpdateBtnClick = this.onUpdateBtnClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.getErrorMessage = this.getErrorMessage.bind(this);
        this.onValueInputChange = this.onValueInputChange.bind(this);
    }
    componentDidUpdate() {
        if (this.state.inEditMode) {
            let inputId: string = this.getInputId();
            let input = document.getElementById(inputId);
            if (input !== null && typeof input !== "undefined")
                input.focus();
        }
    }
    componentDidMount() {
        this.setState({
            itemInputValue: this.props.item.value
        } as SpPropertyBagItemState);
    }
    private getInputId() {
        return 'spPropInput_' + this.props.item.key.trim();
    }
    private onDeleteClick(e: any) {
        e.preventDefault()
        if (confirm('Are you sure you want to remove this property?')) {
            this.props.deleteProperty(this.props.item);
        }
        return false;
    }
    private onUpdateClick(e: any) {
        e.preventDefault(); 
        this.props.updateProperty(Object.assign({}, this.props.item, { value: this.state.itemInputValue }));
        return false;
    }
    private onValueInputChange(inputText: string) {
        this.setState(Object.assign({}, this.state, { itemInputValue: inputText }));
        return false;
    }
    private onUpdateBtnClick(e: any) {
        e.preventDefault()
        this.setState(Object.assign({}, this.state, {
            inEditMode: !this.state.inEditMode,
            itemInputValue: this.props.item.value
        }));
        return false;
    }

    private getErrorMessage(value: string): string {
        return (value === '' && this.state.inEditMode)
            ? 'The value can not be empty'
            : '';
    }

    private buttons(isEditMode: Boolean) {
        const topBtnText: string = isEditMode ? 'Save' : 'Delete';
        const bottomBtnText: string = isEditMode ? 'Cancel' : 'Edit';
        return <div className="ms-ListItem-actions ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
            <Button buttonType={ButtonType.icon}
                icon={topBtnText}
                rootProps={{ title: topBtnText }}
                ariaLabel={topBtnText}
                onClick={isEditMode ? this.onUpdateClick : this.onDeleteClick} />
            <Button buttonType={ButtonType.icon}
                icon={bottomBtnText}
                rootProps={{ title: bottomBtnText }}
                ariaLabel={bottomBtnText}
                onClick={this.onUpdateBtnClick} />
        </div>
    }
    public render() {
        let isEditMode: boolean = this.state.inEditMode;
        let inputId: string = this.getInputId();

        return <div className='ms-ListBasicExample-itemCell  ms-Grid-row' data-is-focusable={true}>
            <div className='ms-ListBasicExample-itemContent ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11'>
                <TextField id={inputId}
                    onGetErrorMessage={this.getErrorMessage}
                    label={this.props.item.key}
                    value={this.state.itemInputValue}
                    disabled={!isEditMode}
                    onChanged={this.onValueInputChange} />
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
