import * as React from 'react';
import { actions } from '../actions/spSiteContentActions';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

interface SpSiteContentFilterProps {
    openInNewTab: boolean,
    showAll: boolean
}
const showAllClick = (e: any) => {
    let showAllNewVal: boolean = e.target.checked;
    actions.setShowAll(showAllNewVal);
}
const openInNewTabClick = (e: any) => {
    let openInNewTabNewVal: boolean = e.target.checked;
    actions.setOpenInNewWindow(openInNewTabNewVal);
}
const onFilterChange = (str: string) => {
    actions.setFilter(str);
}
export const SpSiteContentFilter: React.StatelessComponent<SpSiteContentFilterProps> = (props: SpSiteContentFilterProps) => (
    <div className="ms-Grid filters-container">
        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                <SearchBox onChange={onFilterChange} />
            </div>
            <div className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3">
                <Checkbox label='Show all' defaultChecked={props.showAll} onChange={showAllClick} />
            </div>
            <div className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3">
                <Checkbox label='Open in new Tab' defaultChecked={props.openInNewTab} onChange={openInNewTabClick} />
            </div>
        </div>
    </div>
);