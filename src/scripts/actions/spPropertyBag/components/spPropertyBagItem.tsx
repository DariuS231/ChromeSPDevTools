import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import propertyActionsCreatorsMap from "../actions/spPropertyBagActions";
import { IProperty } from "../interfaces/spPropertyBagInterfaces";
import { IMapStateToProps, IMapStateToPropsState } from "../interfaces/spPropertyBagInterfaces";
import { constants } from "./../constants/constants";
import { SpPropertyBagItemForm } from "./spPropertyBagItemForm";

interface ISpPropertyBagItemActions {
    updateProperty: Function;
    deleteProperty: Function;
    setFavourite: (props: IProperty) => void;
}

interface ISpPropertyBagItemProps {
    item: IProperty;
    itemIndex: number;
    updateProperty: Function;
    deleteProperty: Function;
    setFavourite: (props: IProperty) => void;
}

interface ISpPropertyBagItemState {
    itemInputValue: string;
    inEditMode: boolean;
}

class SpPropertyBagItem extends React.Component<ISpPropertyBagItemProps, ISpPropertyBagItemState> {
    constructor() {
        super();
        this.state = {
            inEditMode: false,
            itemInputValue: constants.EMPTY_STRING
        };
        this.onUpdateClick = this.onUpdateClick.bind(this);
        this.onUpdateBtnClick = this.onUpdateBtnClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.getErrorMessage = this.getErrorMessage.bind(this);
        this.onValueInputChange = this.onValueInputChange.bind(this);
    }
    public render() {
        const isEditMode: boolean = this.state.inEditMode;
        const inputId: string = this.getInputId();

        return <SpPropertyBagItemForm
                    inputId={inputId}
                    inputValue={this.state.itemInputValue}
                    item={this.props.item}
                    isEditMode={isEditMode}
                    getErrorMessage={this.getErrorMessage}
                    onInputValueChange={this.onValueInputChange}
                    topBtnClick={isEditMode ? this.onUpdateClick : this.onDeleteClick}
                    bottomBtnClick={this.onUpdateBtnClick}
                    setFavourite={this.props.setFavourite}
        />;
    }
    protected componentDidUpdate() {
        if (this.state.inEditMode) {
            const inputId: string = this.getInputId();
            const input = document.getElementById(inputId);
            if (input !== null && typeof input !== constants.UNDEFINED_STRING) {
                input.focus();
            }
        }
    }
    protected componentDidMount() {
        this.setState({
            itemInputValue: this.props.item.value
        } as ISpPropertyBagItemState);
    }

    private getInputId() {
        return "spPropInput_" + this.props.item.key.trim();
    }
    private onDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (confirm(constants.CONFIRM_DELETE_PROPERTY)) {
            this.props.deleteProperty(this.props.item);
        }
        return false;
    }
    private onUpdateClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.updateProperty({ ...this.props.item, value: this.state.itemInputValue });
        return false;
    }
    private onValueInputChange(inputText: string) {
        this.setState({ ...this.state, itemInputValue: inputText });
        return false;
    }
    private onUpdateBtnClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState({ ...this.state, inEditMode: !this.state.inEditMode, itemInputValue: this.props.item.value });
        return false;
    }

    private getErrorMessage(value: string): string {
        return (value === constants.EMPTY_STRING && this.state.inEditMode)
            ? constants.EMPTY_TEXTBOX_ERROR_MESSAGE
            : constants.EMPTY_STRING;
    }
}

const mapStateToProps = (state: IMapStateToPropsState, ownProps: any): any => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>): ISpPropertyBagItemActions => {
    return {
        deleteProperty: (property: IProperty) => {
            dispatch(propertyActionsCreatorsMap.deleteProperty(property));
        },
        setFavourite: (props: IProperty) => {
            dispatch(propertyActionsCreatorsMap.setFavourite(props));
        },
        updateProperty: (property: IProperty) => {
            dispatch(propertyActionsCreatorsMap.updateProperty(property));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpPropertyBagItem);
