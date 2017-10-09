import * as React from "react";
import { IProperty } from "../interfaces/spPropertyBagInterfaces";
import { constants } from "./../constants/constants";
import { SpPropertyBagNewItemForm } from "./spPropertyBagNewItemForm";

interface ISpPropertyBagNewItemProps {
    addProperty: Function;
}
interface ISpPropertyBagNewItemState {
    newProperty: IProperty;
}

export default class SpPropertyBagNewItem
    extends React.Component<ISpPropertyBagNewItemProps, ISpPropertyBagNewItemState> {
    protected cleanProperty: IProperty = {
        isFavourite: false,
        key: constants.EMPTY_STRING,
        value: constants.EMPTY_STRING
    };
    constructor() {
        super();
        this.state = { newProperty: this.cleanProperty };
        this.addBtnClick = this.addBtnClick.bind(this);
        this.onKeyInputChange = this.onKeyInputChange.bind(this);
        this.onValueInputChange = this.onValueInputChange.bind(this);
    }
    public render() {
        return <SpPropertyBagNewItemForm
            addBtnClick={this.addBtnClick}
            newProperty={this.state.newProperty}
            onKeyInputChange={this.onKeyInputChange}
            onValueInputChange={this.onValueInputChange}
        />;
    }

    private addBtnClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.addProperty(this.state.newProperty);
        this.setState({ newProperty: this.cleanProperty });
        return false;
    }
    private onKeyInputChange(str: string) {
        this.setState({
            newProperty: { ...this.state.newProperty, key: str }
        });
    }

    private onValueInputChange(str: string) {
        this.setState({
            newProperty: { ...this.state.newProperty, value: str }
        });
    }
}
