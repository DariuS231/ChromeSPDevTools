import { Button, DefaultButton } from "office-ui-fabric-react/lib/";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { List } from "office-ui-fabric-react/lib/List";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import * as React from "react";
import { IResult, ISpPropertyBagProps } from "../interfaces/spSearchInterfaces";
import SpSearchMessage from "./spSearchMessage";
import SpSearchResultsItem from "./spSearchResultsItem";

const SpSearchResults: React.StatelessComponent<ISpPropertyBagProps> = (props: ISpPropertyBagProps) => {

    const downloadButton = (prs: ISpPropertyBagProps) => {
        const dt: Date = new Date();
        const dtStr: string = `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`;
        let csvString = `\n\n`;
        csvString += `Date and Time:,${dtStr}\n`;
        csvString += `Query Text:,${prs.textQuery}\n`;
        csvString += `Trim Duplicates:,${prs.trimDuplicates}\n`;
        csvString += `Row Limit:,${prs.rowLimit}\n`;
        csvString += `Skip:,${prs.skip}\n`;
        csvString += `Select Fields:,${prs.selectFields.concat(",")}\n`;
        csvString += `Filters:,${prs.filters.concat(",")}\n`;
        csvString += `Sort:,${prs.sortBy.concat(",")}\n`;
        csvString += `Result Source ID:,${prs.sourceId}\n`;
        csvString += `Showing,${prs.results.length},out of, ${prs.totalResults}\n`;
        csvString += `\n\n`;

        csvString += prs.resultsColumns.join(",");
        prs.results.forEach((item) => {
            csvString += "\n";
            let separator = "";
            prs.resultsColumns.forEach((column) => {
                const prop = item.props.find((p) => p.Key === column);
                csvString += `${separator}"${prop.Value}"`;
                separator = ",";
            });

        });
        const blobObj = new Blob([csvString]);
        const fileUrl = window.URL.createObjectURL(blobObj);
        const fileName = dtStr.replace(/\//g, "-").replace(/:/g, "-").replace(/ /g, "_") + ".csv";

        return (
            <DefaultButton href={fileUrl} download={fileName} title="Export CSV" icon="ExcelDocument">
                Export CSV
        </DefaultButton>
        );
    };
    const renderListItem = (item: IResult, index: number) => {
        const onSeeAllPropsClick = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>) => {
            props.actions.getAllProperties(item);
        };
        const onCollapseClick = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>) => {
            props.actions.setCollapsed(item);
        };
        return <SpSearchResultsItem item={item} onSeeAllPropsClick={onSeeAllPropsClick} onCollapse={onCollapseClick} />;
    };

    let _resultsComponent: JSX.Element;

    if (props.showFetching) {
        _resultsComponent = <Spinner type={SpinnerType.large} label={"Fetching results..."} />;
    } else if (props.results.length > 0) {
        _resultsComponent = (
            <div>
                <div className="spSearch-results-header">
                    <div className="spSearch-results-header-total">
                        Showing {props.results.length} out of {props.totalResults}
                    </div>
                    <div className="spSearch-results-header-button">{downloadButton(props)}</div>
                </div>
                <div className="spSearch-results-list">
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
