import {
    DetailsList,
    DetailsListLayoutMode,
    DetailsRow,
    IColumn,
    Selection,
    SelectionMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import { IResult, ISearchResult, ISearchResultKeyValue } from "../interfaces/spSearchInterfaces";

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
                        <i
                            className={"ms-Icon ms-Icon--Chevron" + props.item.collapsed ? "DownSmall" : "UpSmall"}
                            aria-hidden="true" />
                    </a>
                </div>
                {properties()}
                {loadAll()}
            </div>
        </div>
    );
};

export default SpSearchResultsItem;
