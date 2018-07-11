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

    public buildRequestURL(state: IInitialState): string {
        let reqUrl: string = `${state.webUrl}/_api/search/query`;
        reqUrl += `?querytext='${state.textQuery}'`;
        reqUrl += `&trimduplicates=${state.trimDuplicates}`;
        reqUrl += `&rowlimit=${state.rowLimit}`;
        reqUrl += `&startrow=${state.skip}`;

        if (state.selectFields.length > 0) {
            reqUrl += `&selectproperties='${state.selectFields.map(x => x.trimStart().trimEnd()).join(",")}'`;
        }
        if (state.sortBy.length > 0) {
            reqUrl += `&sortlist='${state.sortBy.map(x => x.trimStart().trimEnd()).join(",")}'`;
        }
        if (state.sourceId !== "") {
            reqUrl += `&sourceid='${state.sourceId}'`;
        }
        if (state.filters !== "") {
            reqUrl += `&refinementfilters='${state.filters}'`;
        }
        return reqUrl;
    }
    public async getResults(state: IInitialState): Promise<IResultAndTotal> {
        try {
            const reqUrl = this.buildRequestURL(state);
            const response: any = await this.getRequest(reqUrl);
            const resultRows = response.data.PrimaryQueryResult.RelevantResults.Table.Rows;
            const total: number = response.data.PrimaryQueryResult.RelevantResults.TotalRows;
            const results: ISearchResult = resultRows.map((item: any, index: number) => {
                return this.parseCellValue(item.Cells as ISearchResultKeyValue[], false, true);
            });
            const columns: string[] = results.length > 0 ? results.map((i) => i.props.map((p) => p.Key))[0] : [];
            return { total, results, resultsColumns: columns };
        } catch (ex) {
            throw ex;
        }
    }
    public async getAllProperties(item: IResult): Promise<IResult> {
        let webUrl = await this.getWebUrl();

        let baseReqUrl: string = `${webUrl}/_api/search/query`;
        baseReqUrl += `?querytext='IndexDocId:${item.key}'`;
        baseReqUrl += `&rowlimit=1`;

        let reqUrl = baseReqUrl + `&refiners='managedproperties(filter=600/0/*)'`;
        reqUrl += `&selectproperties='DocId'`;

        const respa: any = await this.getRequest(reqUrl);
        const refinersResult = respa.data.PrimaryQueryResult.RefinementResults.Refiners;
        const refiners = refinersResult.find((s: any, b: any) => {
            return s.Name === "managedproperties";
        });
        const propsStr: string = refiners.Entries.filter((entry: any, index: number) => {
            return constants.PROPS_TO_IGNORE.indexOf(entry.RefinementName) === -1;
        }).map((entry: any, index: any) => {
            return entry.RefinementName;
        }).join(",");

        reqUrl = baseReqUrl + `&selectproperties='${propsStr}'`;
        const respb: any = await this.getRequest(reqUrl);
        this.getRequest(reqUrl);
        const respItem = respb.data.PrimaryQueryResult.RelevantResults.Table.Rows[0];
        const itemResult: IResult = this.parseCellValue(respItem.Cells as ISearchResultKeyValue[], true, false);

        return itemResult;
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
