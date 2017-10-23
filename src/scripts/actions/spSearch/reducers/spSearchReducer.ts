import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IInitialState, IResultAndTotal, ISearchResult } from "../interfaces/spSearchInterfaces";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";

const initialState: IInitialState = {
    results: new Array(),
    totalResults: 0,
    textQuery: "*",
    rowLimit: 10,
    skip: 0,
    trimDuplicates: true,
    selectFields: new Array(),
    sourceId: "",
    Refiners: new Array(),
    filters: "",
    sortBy: new Array(),
    showFetching: false
};

export const spSearchReducer = (state: IInitialState = initialState, action: IAction<any>): IInitialState => {

    switch (action.type) {
        case actions.SET_QUERY_TEXT:
            const queryStr: string = action.payload;
            return { ...state, textQuery: queryStr };
        case actions.SET_TRIM_DUPLICATES:
            const trimDuplicates: boolean = action.payload;
            return { ...state, trimDuplicates };
        case actions.SET_ROW_LIMIT:
            const rowLimit: number = action.payload;
            return { ...state, rowLimit };
        case actions.SET_SKIP:
            const skip: number = action.payload;
            return { ...state, skip };
        case actions.SET_SELECT_FIELDS:
            const fields: string[] = action.payload;
            return { ...state, selectFields: fields };
        case actions.SET_REFINERS:
            const refiners: string[] = action.payload;
            return { ...state, Refiners: refiners };
        case actions.SET_SORT:
            const sortBy: string[] = action.payload;
            return { ...state, sortBy };
        case actions.SET_FILTER:
            const filter: string = action.payload;
            return { ...state, filters: filter };
        case actions.SET_RESULT_SOURCE:
            const sourceId: string = action.payload;
            return { ...state, sourceId };
        case actions.SET_SEARCH_RESULTS:
            const res: IResultAndTotal = action.payload;
            return { ...state, results: res.results, totalResults: res.total };

        default:
            return state;
    }

};
