import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import * as React from "react";
import { actions } from "../actions/spSiteContentActions";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";

interface ISpSiteContentFilterProps {
    openInNewTab: boolean;
    showAll: boolean;
}

export const SpSiteContentFilter: React.StatelessComponent<ISpSiteContentFilterProps> =
    (props: ISpSiteContentFilterProps) => {
        const showAllClick = (e: any) => {
            const showAllNewVal: boolean = e.target.checked;
            actions.setShowAll(showAllNewVal);
        };
        const openInNewTabClick = (e: any) => {
            const openInNewTabNewVal: boolean = e.target.checked;
            actions.setOpenInNewWindow(openInNewTabNewVal);
        };
        const onFilterChange = (str: string) => {
            actions.setFilter(str);
        };
        return <div className="ms-Grid filters-container">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <SearchBox onChange={onFilterChange} />
                </div>
                <div className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3">
                    <Checkbox label="Show all" defaultChecked={props.showAll} onChange={showAllClick} />
                </div>
                <div className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3">
                    <Checkbox
                        label="Open in new Tab"
                        defaultChecked={props.openInNewTab}
                        onChange={openInNewTabClick}
                    />
                </div>
            </div>
        </div>;
    };
