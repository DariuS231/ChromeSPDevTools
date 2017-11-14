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
                        return this.parseCellValue(item.Cells as ISearchResultKeyValue[], false, true);
                    });
                    resolve({ total, results });
                }).catch((error: any) => {
                    reject(error);
                });
            });
        });
    }
    public getAllProperties(item: IResult): Promise<IResult> {
        return new Promise((resolve, reject) => {
            this.getWebUrl().then((webUrl: string) => {

                let baseReqUrl: string = `${webUrl}/_api/search/query`;
                baseReqUrl += `?querytext='IndexDocId:${item.key}'`;
                baseReqUrl += `&rowlimit=1`;

                let reqUrl = baseReqUrl + `&refiners='managedproperties(filter=600/0/*)'`;
                reqUrl += `&selectproperties='DocId'`;

                this.getRequest(reqUrl).then((respa: any) => {
                    const refinersResult = respa.data.PrimaryQueryResult.RefinementResults.Refiners;
                    const refiners = refinersResult.find((s: any, b: any) => {
                        return s.Name === "managedproperties";
                    });
                    const propsStr: string = refiners.Entries.map((entry: any, index: any) => {
                        return entry.RefinementName;
                    }).join(",");

                    reqUrl = baseReqUrl + `&selectproperties='${propsStr}'`;

                    this.getRequest(reqUrl).then((respb: any) => {
                        const respItem = respb.data.PrimaryQueryResult.RelevantResults.Table.Rows[0];
                        const itemResult: IResult
                            = this.parseCellValue(respItem.Cells as ISearchResultKeyValue[], true, false);

                        resolve(itemResult);
                    }).catch((error: any) => {
                        reject(error);
                    });
                }).catch((error: any) => {
                    reject(error);
                });
            });
        });
    }
    private parseCellValue(cells: ISearchResultKeyValue[], allPropsFetched: boolean, collapsed: boolean): IResult {
        const cellsCt: number = cells.length;
        let cellsIndex: number = 0;

        let docIdStr: string = null;
        let titleStr: string = null;
        do {
            const cell: ISearchResultKeyValue = cells[cellsIndex];
            const cellKey: string = cell.Key.toLowerCase();
            if (cellKey === "title") {
                titleStr = cell.Value;
            } else if (cellKey === "docid") {
                docIdStr = cell.Value;
            }
            cellsIndex++;
        } while (cellsIndex < cellsCt && (!docIdStr || !titleStr));

        return {
            key: docIdStr,
            title: titleStr || docIdStr,
            props: cells,
            allPropsFetched,
            collapsed

        } as IResult;
    }
}
