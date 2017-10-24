import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import { IResult, ISearchResult, ISearchResultKeyValue } from "../interfaces/spSearchInterfaces";
import { SpSearchResultsItem } from "./spSearchResultsItem";

interface ISpSearchListProps {
    results: ISearchResult;
    totalResults: number;
}

const SpSearchResults: React.StatelessComponent<ISpSearchListProps> = (props: ISpSearchListProps) => {
    const renderListItem = (item: IResult, index: number) => {
        return <SpSearchResultsItem item={item} />;
    };
    if (props.totalResults > 0) {
        return (
            <div className="sp-Search-columns results" >
                <div>
                    Showing {props.results.length} out of {props.totalResults}
                </div>
                <div>
                    <List items={props.results} onRenderCell={renderListItem} />
                </div>
            </div>
        );

    } else {

        return (
            <div className="sp-Search-columns results" >
                <div>
                    There is nothing to see here!
                </div>
            </div>
        );
    }
};

export default SpSearchResults;
