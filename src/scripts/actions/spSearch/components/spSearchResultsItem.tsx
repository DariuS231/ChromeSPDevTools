import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    Selection
} from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "office-ui-fabric-react/lib/link";
import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import { IResult, ISearchResult, ISearchResultKeyValue } from "../interfaces/spSearchInterfaces";

interface ISpSearchResultsItemProps {
    item: IResult;
}
interface ISpSearchResultsItemState {
    collapsed: boolean;
}
export class SpSearchResultsItem extends React.Component<ISpSearchResultsItemProps, ISpSearchResultsItemState> {
    constructor() {
        super();
        this.state = { collapsed: true };
        this.onToggle = this.onToggle.bind(this);
    }
    public render() {
        return (
            <div key={this.props.item.key}>
                {this.props.item.title}
                <Link onClick={this.onToggle}>
                    {this.state.collapsed ? "Expand" : "Collapse"}
                </Link>
                {this.properties(this.state.collapsed, this.props.item.props)}
            </div>
        );
    }
    private properties(collapsed: boolean, props: ISearchResultKeyValue[]) {
        if (!collapsed) {
            return (
                <div>
                    <DetailsList items={props} setKey='set' layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        selectionPreservedOnEmptyClick={true}
                    />
                </div>
            );
        } else { return null; }
    }
    private onToggle(ev?: React.FormEvent<HTMLElement | HTMLInputElement>) {
        this.setState({ collapsed: !this.state.collapsed });
    }
}
