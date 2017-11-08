
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import { IAction, IMessageData } from "./../../common/interfaces";

export interface ISearchResultKeyValue {
    Key: string;
    Value: string;
    ValueType: string;
}
export interface IResult {
    key: string;
    title: string;
    props: ISearchResultKeyValue[];
}

export type ISearchResult = Array<IResult>

export interface IResultAndTotal {
    results: ISearchResult;
    total: number;
}
export interface ISpSearchActionCreatorsMapObject extends ActionCreatorsMapObject {
    setQueryText: ActionCreator<IAction<string>>;
    setTrimDuplicates: ActionCreator<IAction<boolean>>;
    setRowLimit: ActionCreator<IAction<number>>;
    setSkip: ActionCreator<IAction<number>>;
    setSelectFields: ActionCreator<IAction<string[]>>;
    setRefiners: ActionCreator<IAction<string[]>>;
    setFilters: ActionCreator<IAction<string[]>>;
    setSortBy: ActionCreator<IAction<string[]>>;
    setResultSource: ActionCreator<IAction<string>>;
    setSearchResults: ActionCreator<IAction<IResultAndTotal>>;
    getResults: (state: IInitialState) => (dispatch: Dispatch<IAction<IResultAndTotal>>) => Promise<void>;
    getAllProperties: (item: IResult) => (dispatch: Dispatch<IAction<IResult>>) => Promise<void>;
}

export interface IMapDispatchToISpSearchProps {
    actions: ISpSearchActionCreatorsMapObject;
}

export interface IMapStateToPropsState {
    spSearch: IInitialState;
}

export interface IInitialState {
    results: ISearchResult;
    totalResults: number;
    textQuery: string;
    rowLimit: number;
    skip: number;
    trimDuplicates: boolean;
    selectFields: string[];
    sourceId: string;
    Refiners: string[];
    filters: string;
    sortBy: string[];
    showFetching: boolean;
    messageData: IMessageData;
}

export interface IMapStateToProps extends IInitialState {
}

export interface ISpPropertyBagProps extends IInitialState {
    actions: ISpSearchActionCreatorsMapObject;
}
