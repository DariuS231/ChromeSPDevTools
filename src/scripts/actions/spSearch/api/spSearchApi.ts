import {
    IInitialState,
    IResult,
    ISearchResult,
    ISearchResultKeyValue
} from "../interfaces/spSearchInterfaces";
import ApiBase from "./../../common/apiBase";
import { constants } from "./../constants/constants";

export default class SpSearchApi extends ApiBase {
    public getResults(state: IInitialState): Promise<ISearchResult> {
        return new Promise((resolve, reject) => {
            this.getWebUrl().then(webUrl => {
                let reqUrl = `${webUrl}/_api/search/query?querytext='${state.textQuery}'&trimduplicates=${state.trimDuplicates}`;

                reqUrl += `&rowlimit=${state.rowLimit}`;
                reqUrl += `&startrow=${state.start}`;
                if (state.selectFields.length > 0) {
                    reqUrl += `&selectproperties='${state.selectFields.join(",")}'`;
                }
                if (state.sortBy.length > 0) {
                    reqUrl += `&selectproperties='${state.sortBy.join(",")}'`;
                }

                this.getRequest(reqUrl).then((response: any) => {
                    const resultRows = response.data.PrimaryQueryResult.RelevantResults.Table.Rows;
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
                    resolve(results);
                }).catch((error: any) => {
                    reject(error);
                });
            });
        });
    }
}
