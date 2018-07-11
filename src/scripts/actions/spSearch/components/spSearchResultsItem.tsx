import {
    DetailsList, DetailsListLayoutMode,
    IColumn, SelectionMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as React from "react";
import { IResult } from "../interfaces/spSearchInterfaces";

interface ISpSearchResultsItemProps {
    item: IResult;
    onSeeAllPropsClick: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>) => void;
    onCollapse: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>) => void;
}

const SpSearchResultsItem: React.StatelessComponent<ISpSearchResultsItemProps> = (props: ISpSearchResultsItemProps) => {
    const _columns: IColumn[] = [
        { key: "Key", name: "Key", fieldName: "Key", maxWidth: 160, minWidth: 160 } as IColumn,
        { key: "Value", name: "Value", fieldName: "Value" } as IColumn
    ];

    const properties = () => {
        if (!props.item.collapsed) {
            return (
                <div className="ms-ListBasicSpChromeDevTool-itemDesc">
                    <div>
                        <DetailsList items={props.item.props} setKey="set" layoutMode={DetailsListLayoutMode.justified}
                            selectionMode={SelectionMode.none}
                            isHeaderVisible={false}
                            columns={_columns}
                        />
                    </div>
                </div>
            );
        } else { return null; }
    }
    const loadAll = () => {
        if (!props.item.collapsed && !props.item.allPropsFetched) {
            return (
                <div className="ms-ListBasicSpChromeDevTool-loadAll">
                    <a href="#" onClick={props.onSeeAllPropsClick} className="ms-Link" >
                        <i className="ms-Icon ms-Icon--BulletedList" /> Get all properties
                    </a>
                </div>
            );
        } else { return null; }
    }
    return (
        <div className="ms-ListBasicSpChromeDevTool-itemCell" data-is-focusable={true} key={props.item.key}>
            <div className="ms-ListBasicSpChromeDevTool-itemContent">
                <div className="ms-ListBasicSpChromeDevTool-itemName">
                    <a onClick={props.onCollapse} href="#"> {props.item.title}
                        <Icon iconName={props.item.collapsed ? "ChevronDownSmall" : "ChevronUpSmall"} />
                    </a>
                </div>
                {properties()}
                {loadAll()}
            </div>
        </div>
    );
};

export default SpSearchResultsItem;
