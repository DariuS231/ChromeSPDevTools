import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

interface SpPropertyBagFilterProps {
    setFilterText: Function,
    filterStr: string
}

const SpPropertyBagFilter: React.StatelessComponent<SpPropertyBagFilterProps> = (props: SpPropertyBagFilterProps) => {
    const onSearchBoxChange = (str: string) => {
        props.setFilterText(str);
    }
    return <div className="ms-Grid filters-container">
        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                <SearchBox value={props.filterStr} onChange={onSearchBoxChange} />
            </div>
            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6"> </div>
        </div>
    </div>
};

export default SpPropertyBagFilter;