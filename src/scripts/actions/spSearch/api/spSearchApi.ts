import {
    IInitialState,
    IResult,
    IResultAndTotal,
    ISearchResult,
    ISearchResultKeyValue
} from "../interfaces/spSearchInterfaces";
import ApiBase from "./../../common/apiBase";
import { constants } from "./../constants/constants";

export default class SpSearchApi extends ApiBase {
    public getResults(state: IInitialState): Promise<IResultAndTotal> {
        return new Promise((resolve, reject) => {
            this.getWebUrl().then((webUrl: string) => {

                let reqUrl: string = `${webUrl}/_api/search/query`;

                reqUrl += `?querytext='${state.textQuery}'`;
                reqUrl += `&trimduplicates=${state.trimDuplicates}`;
                reqUrl += `&rowlimit=${state.rowLimit}`;
                reqUrl += `&startrow=${state.skip}`;

                if (state.selectFields.length > 0) {
                    reqUrl += `&selectproperties='${state.selectFields.join(",")}'`;
                }
                if (state.sortBy.length > 0) {
                    reqUrl += `&sortlist='${state.sortBy.join(",")}'`;
                }
                if (state.sourceId !== "") {
                    reqUrl += `&sourceid='${state.sourceId}'`;
                }
                if (state.filters !== "") {
                    reqUrl += `&refinementfilters='${state.filters}'`;
                }

                this.getRequest(reqUrl).then((response: any) => {
                    const resultRows = response.data.PrimaryQueryResult.RelevantResults.Table.Rows;
                    const total: number = response.data.PrimaryQueryResult.RelevantResults.TotalRows;
                    const results: ISearchResult = resultRows.map((item: any, index: number) => {

                        const cells: ISearchResultKeyValue[] = item.Cells as ISearchResultKeyValue[];

                        const titleOpts: ISearchResultKeyValue[] = cells.filter((i: any, n: number) => {
                            return ["Title", "DocId"].indexOf(i.Key) >= 0;
                        });

                        const titleStr: string = titleOpts.length === 2 ? titleOpts.find((i: any, n: number) => {
                            return i.Key === "Title";
                        }).Value : titleOpts[0].Value;
                        return {
                            key: index.toString(),
                            title: titleStr,
                            props: cells
                        } as IResult;
                    });
                    resolve({ total, results });
                }).catch((error: any) => {
                    reject(error);
                });
            });
        });
    }
}
