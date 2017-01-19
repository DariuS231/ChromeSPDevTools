import * as React from 'react';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IProperty } from '../interfaces/spPropertyBagInterfaces';
import propertyActionsCreatorsMap from '../actions/spPropertyBagActions';
import { IMapStateToPropsState, IMapStateToProps } from '../interfaces/spPropertyBagInterfaces'
import { SpPropertyBagItemForm } from './spPropertyBagItemForm'

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

    public render() {
        let isEditMode: boolean = this.state.inEditMode;
        let inputId: string = this.getInputId();

        return <SpPropertyBagItemForm
            inputId={inputId}
            inputValue={this.state.itemInputValue}
            keyValue={this.props.item.key}
            isEditMode={isEditMode}
            getErrorMessage={this.getErrorMessage}
            onInputValueChange={this.onValueInputChange}
            topBtnClick={isEditMode ? this.onUpdateClick : this.onDeleteClick}
            bottomBtnClick={this.onUpdateBtnClick} />
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
