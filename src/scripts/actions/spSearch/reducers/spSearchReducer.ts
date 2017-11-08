import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IInitialState, IResult, IResultAndTotal, ISearchResult } from "../interfaces/spSearchInterfaces";
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
    showFetching: false,
    messageData: {
        message: "",
        type: MessageBarType.info,
        showMessage: false
    }
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
        case actions.SET_FETCHING_DATA:
            const showFetching: boolean = action.payload;
            return { ...state, showFetching };
        case actions.SET_MESSAGE_DATA:
            const messageData: IMessageData = action.payload;
            return { ...state, messageData };
        case actions.SET_ERROR_MESSAGE_DATA:
            const errorMessageData: IMessageData = action.payload;
            return { ...state, messageData: errorMessageData, results: [], totalResults: 0, showFetching: false };
        case actions.SET_SEARCH_RESULTS:
            const res: IResultAndTotal = action.payload;
            const msgData: IMessageData = (res.results.length === 0)
                ? {
                    showMessage: true,
                    message: "The search did not yield any results.",
                    type: MessageBarType.warning
                }
                : {
                    showMessage: false,
                    message: "",
                    type: MessageBarType.info
                };
            return {
                ...state,
                results: res.results,
                totalResults: res.total,
                showFetching: false,
                messageData: msgData
            };
        case actions.SET_SEARCH_RESULT:
            const item: IResult = action.payload;
            const newList = state.results.map((result: IResult) => {
                return (result.key === item.key) ? item : result;
            });
            return {
                ...state,
                results: newList,
                showFetching: false
            };
        default:
            return state;
    }

};
