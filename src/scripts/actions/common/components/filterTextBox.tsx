import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import * as React from "react";
import { constants } from "../constants";
import { IAction } from "../interfaces";

interface IFilterTextBoxProps {
    setFilterText: (filterText: string) => IAction<string>;
    filterStr: string;
    parentOverrideClass?: string;
    referenceCallBack?: (element: HTMLElement) => void;
    children?: any;
}

class FilterTextBox extends React.Component<IFilterTextBoxProps, {}> {
    public input: HTMLElement;
    constructor() {
        super();
        this._divRefCallBack = this._divRefCallBack.bind(this);
    }
    public componentDidMount() {
        if (this.input) {
            this.input.focus();
        }
    }
    public render() {

        return (
            <div className="ms-Grid filters-container">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6" ref={this._divRefCallBack}>
                        <SearchBox value={this.props.filterStr} onChange={this.props.setFilterText} />
                    </div>
                    <div className={this.props.parentOverrideClass || "ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6"}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    private _divRefCallBack(element: HTMLElement): void {
        if (element && !!this.props.referenceCallBack) {
            this.props.referenceCallBack(element.querySelector(constants.HTML_TAG_INPUT) as HTMLElement);
        }
    }
}

export default FilterTextBox;
