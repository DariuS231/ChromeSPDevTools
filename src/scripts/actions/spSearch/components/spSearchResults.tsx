import { List } from "office-ui-fabric-react/lib/List";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import * as React from "react";
import { IResult, ISearchResult, ISearchResultKeyValue, ISpPropertyBagProps } from "../interfaces/spSearchInterfaces";
import SpSearchMessage from "./spSearchMessage";
import { SpSearchResultsItem } from "./spSearchResultsItem";

const SpSearchResults: React.StatelessComponent<ISpPropertyBagProps> = (props: ISpPropertyBagProps) => {

    const renderListItem = (item: IResult, index: number) => {
        const onSeeAllPropsClick = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>) => {
            props.actions.getAllProperties(item);
        };
        return <SpSearchResultsItem item={item} onSeeAllPropsClick={onSeeAllPropsClick} />;
    };

    let _resultsComponent: JSX.Element;

    if (props.showFetching) {
        _resultsComponent = <Spinner type={SpinnerType.large} label={"Fetching results..."} />;
    } else if (props.results.length > 0) {
        _resultsComponent = (
            <div>
                <div>
                    Showing {props.results.length} out of {props.totalResults}
                </div>
                <div>
                    <List items={props.results} onRenderCell={renderListItem} />
                </div>
            </div>
        );
    } else {
        _resultsComponent = null;
    }

    return (
        <div className="sp-Search-columns results" >
            <SpSearchMessage messageData={props.messageData} />
            {_resultsComponent}
        </div>
    );
};

export default SpSearchResults;
