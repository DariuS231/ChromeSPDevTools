import * as React from "react";
import { IAction } from "../interfaces";

import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";

interface IFilterTextBoxProps {
    setFilterText: (filterText: string) => IAction<string>;
    filterStr: string;
    parentOverrideClass?: string;
    children?: any;
}

const FilterTextBox: React.StatelessComponent<IFilterTextBoxProps> = (props: IFilterTextBoxProps) => {
    return <div className="ms-Grid filters-container">
        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                <SearchBox value={props.filterStr} onChange={props.setFilterText} />
            </div>
            <div className={props.parentOverrideClass || "ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6"}>
                {props.children}
            </div>
        </div>
    </div>;
};

export default FilterTextBox;
