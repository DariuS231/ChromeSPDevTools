import { IAction, IMessageData } from "./../../common/interfaces";


export interface searchResult{
    [key: string]: string
}
export interface IInitialState {
    results: searchResult[],
    textQuery: string,
    rowIndex:number,
    start:number,
    skip:number,
    trimDuplicates: boolean,
    selectFields:string[],
    sourceId:string,
    Refiners:string[],
    filters:string,
    sortBy: string[]
    showFetching:boolean
}
