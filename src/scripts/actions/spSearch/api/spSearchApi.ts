import ApiBase from "./../../common/apiBase";
import { constants } from "./../constants/constants";
import { IInitialState, ISearchResult } from "../interfaces/spSearchInterfaces";

export default class SpSearchApi extends ApiBase {
    public getResults(state: IInitialState): Promise<ISearchResult[]> {
        return new Promise((resolve, reject) => {
            this.getWebUrl().then(webUrl => {
                const reqUrl = `${webUrl}/_api/search/query?querytext='*'&trimduplicates=false&selectproperties='Title%2cId%2cRefinableString43%2cPath'&refinementfilters='RefinableString43:test'&clienttype='ContentSearchRegular'`;
                this.getRequest(reqUrl).then((response: any) => {
                    const results: ISearchResult[] = [];

                    resolve(results);
                }).catch((error: any) => {
                    reject(error);
                });
            });
        });
    }
}
