import ApiBase from "./../../common/apiBase";
import { constants } from "./../constants/constants";
import { IInitialState, ISearchResult, ISearchResultKeyValue } from "../interfaces/spSearchInterfaces";

export default class SpSearchApi extends ApiBase {
    public getResults(state: IInitialState): Promise<ISearchResult[]> {
        return new Promise((resolve, reject) => {
            debugger;
            this.getWebUrl().then(webUrl => {
                //const reqUrl = `${webUrl}/_api/search/query?querytext='*'&trimduplicates=false&selectproperties='Title%2cId%2cRefinableString43%2cPath'&refinementfilters='RefinableString43:test'&clienttype='ContentSearchRegular'`;
                const reqUrl = `${webUrl}/_api/search/query?querytext='*'`;
                this.getRequest(reqUrl).then((response: any) => {
                    const resultRows = response.data.PrimaryQueryResult.RelevantResults.Table.Rows;
                    const results: ISearchResult[] = resultRows.map((item: any, index: number) => {
                        return item.Cells as ISearchResultKeyValue[];
                    });
                    resolve(results);
                }).catch((error: any) => {
                    reject(error);
                });
            });
        });
    }
}
