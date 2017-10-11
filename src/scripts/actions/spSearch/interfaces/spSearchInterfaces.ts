
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import { IAction, IMessageData } from "./../../common/interfaces";


export interface ISearchResult{
    [key: string]: string
}
export interface IInitialState {
    results: ISearchResult[],
    textQuery: string,
    rowLimit:number,
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

export interface ISpSearchActionCreatorsMapObject extends ActionCreatorsMapObject{
    setQueryText: ActionCreator<IAction<string>>;
    setTrimDuplicates: ActionCreator<IAction<boolean>>;
    setRowLimit: ActionCreator<IAction<number>>;
    setStart: ActionCreator<IAction<number>>;
    setSkip: ActionCreator<IAction<number>>;
    setSelectFields: ActionCreator<IAction<string[]>>;
    setRefiners: ActionCreator<IAction<string[]>>;
    setFilters: ActionCreator<IAction<string[]>>;
    setSortBy: ActionCreator<IAction<string[]>>;
    setResultSource: ActionCreator<IAction<string>>;
    setSerchResults: ActionCreator<IAction<ISearchResult[]>>;
}

export interface IMapDispatchToISpSearchProps {
    actions: ISpSearchActionCreatorsMapObject;
}


export interface IMapStateToPropsState {
    spSearch: IInitialState;
}

export interface IMapStateToProps {
    results: ISearchResult[],
    textQuery: string,
    rowLimit:number,
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

export interface ISpPropertyBagProps {
    results: ISearchResult[],
    textQuery: string,
    rowLimit:number,
    start:number,
    skip:number,
    trimDuplicates: boolean,
    selectFields:string[],
    sourceId:string,
    Refiners:string[],
    filters:string,
    sortBy: string[]
    showFetching:boolean
    actions: ISpSearchActionCreatorsMapObject;
}