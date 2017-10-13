import * as React from "react";
import { List } from "office-ui-fabric-react/lib/List";
import { ISearchResult, ISearchResultKeyValue, IResult } from "../interfaces/spSearchInterfaces";

interface ISpSearchListProps {
    results: ISearchResult
}


const SpSearchResults: React.StatelessComponent<ISpSearchListProps> = (props: ISpSearchListProps) => {
    const renderListItem = (item: IResult, index: number) => {
        return (
            <div key={item.key}>
                {item.title}
                {/* <ol>
                    {item.props.map((i:any, ind: number) => {
                        return <li>{i.Key + ": " + i.Value}</li>;
                    })}
                </ol> */}
            </div>
        );
    };

    return (
        <div style={{ display: "inline-block", width: "70%", verticalAlign: 'top' }} >
            <div style={{ top: "0", position: 'relative' }}>
                <List items={props.results} onRenderCell={renderListItem} />
            </div>
        </div>
    );
};

export default SpSearchResults;
