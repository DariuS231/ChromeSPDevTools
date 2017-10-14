import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import { IResult, ISearchResult, ISearchResultKeyValue } from "../interfaces/spSearchInterfaces";
import { SpSearchResultsItem } from "./spSearchResultsItem";

interface ISpSearchListProps {
    results: ISearchResult;
}

const SpSearchResults: React.StatelessComponent<ISpSearchListProps> = (props: ISpSearchListProps) => {
    const renderListItem = (item: IResult, index: number) => {
        return <SpSearchResultsItem item={item} />;
    };

    return (
        <div style={{ display: "inline-block", width: "70%", verticalAlign: "top" }} >
            <div style={{ top: "0", position: "relative" }}>
                <List items={props.results} onRenderCell={renderListItem} />
            </div>
        </div>
    );
};

export default SpSearchResults;
