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
}
interface ISpSearchResultsItemState {
    collapsed: boolean;
}

export class SpSearchResultsItem extends React.Component<ISpSearchResultsItemProps, ISpSearchResultsItemState> {
    private _columns: IColumn[] = [
        { key: "Key", name: "Key", fieldName: "Key", maxWidth: 160, minWidth: 160 } as IColumn,
        { key: "Value", name: "Value", fieldName: "Value" } as IColumn
    ];
    constructor() {
        super();
        this.state = { collapsed: true };
        this.onToggle = this.onToggle.bind(this);
    }
    public render() {
        return (
            <div className="ms-ListBasicSpChromeDevTool-itemCell" data-is-focusable={true} key={this.props.item.key}>
                <div className="ms-ListBasicSpChromeDevTool-itemContent">
                    <div className="ms-ListBasicSpChromeDevTool-itemName">
                        <a onClick={this.onToggle} href="#"> {this.props.item.title}{this.state.collapsed
                            ? <i className="ms-Icon ms-Icon--ChevronDownSmall" aria-hidden="true" />
                            : <i className="ms-Icon ms-Icon--ChevronUpSmall" aria-hidden="true" />
                        } </a>
                    </div>
                    {this.properties(this.state.collapsed, this.props.item.props)}
                    {this.loadAll(this.state.collapsed)}
                </div>
            </div>
        );
    }

    private properties(collapsed: boolean, props: ISearchResultKeyValue[]) {
        if (!collapsed) {
            return (
                <div className="ms-ListBasicSpChromeDevTool-itemDesc">
                    <div>
                        <DetailsList items={props} setKey="set" layoutMode={DetailsListLayoutMode.justified}
                            selectionMode={SelectionMode.none}
                            isHeaderVisible={false}
                            columns={this._columns}
                        />
                    </div>
                </div>
            );
        } else { return null; }
    }
    private loadAll(collapsed: boolean) {
        if (!collapsed) {
            return (
                <div className="ms-ListBasicSpChromeDevTool-loadAll">
                    <a href="#" onClick={this.props.onSeeAllPropsClick} className="ms-Link" >
                        <i className="ms-Icon ms-Icon--BulletedList" /> Get all properties
                    </a>
                </div>
            );
        } else { return null; }
    }
    private onToggle(ev?: React.FormEvent<HTMLElement | HTMLInputElement>) {
        this.setState({ collapsed: !this.state.collapsed });
    }
}
