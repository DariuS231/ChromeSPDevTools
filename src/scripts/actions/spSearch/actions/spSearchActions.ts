import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Dispatch } from "redux";
import SpSearchApi from "../api/spSearchApi";
import {
    IInitialState, IResult, IResultAndTotal, ISpSearchActionCreatorsMapObject
} from "../interfaces/spSearchInterfaces";
import { ActionFactory } from "./../../common/actionFactory";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions } from "./../constants/constants";

const api = new SpSearchApi();

const setQueryText = ActionFactory<string>(actions.SET_QUERY_TEXT);
const setWebUrl = ActionFactory<string>(actions.SET_WEB_URL);
const setTrimDuplicates = ActionFactory<boolean>(actions.SET_TRIM_DUPLICATES);
const setRowLimit = ActionFactory<number>(actions.SET_ROW_LIMIT);
const setSkip = ActionFactory<number>(actions.SET_SKIP);
const setSelectFields = ActionFactory<string[]>(actions.SET_SELECT_FIELDS);
const setRefiners = ActionFactory<string[]>(actions.SET_REFINERS);
const setFilters = ActionFactory<string[]>(actions.SET_FILTER);
const setSortBy = ActionFactory<string[]>(actions.SET_SORT);
const setResultSource = ActionFactory<string>(actions.SET_RESULT_SOURCE);
const setSearchResults = ActionFactory<IResultAndTotal>(actions.SET_SEARCH_RESULTS);
const setSearchResult = ActionFactory<IResult>(actions.SET_SEARCH_RESULT);
const setFetchingData = ActionFactory<boolean>(actions.SET_FETCHING_DATA);
const setCollapsed = ActionFactory<IResult>(actions.SET_COLLAPSED);
// const setMessageData = ActionFactory<IMessageData>(actions.SET_MESSAGE_DATA);
const setErrorMessageData = ActionFactory<IMessageData>(actions.SET_ERROR_MESSAGE_DATA);

const getWebUrl = () => {
    return async (dispatch: Dispatch<IAction<string>>) => {
        try {
            dispatch(setFetchingData(true));
            const url: string = await api.getWebUrl();
            dispatch(setWebUrl(url));
        } catch (error) {
            dispatch(setErrorMessageData({
                message: "Error While retrieving the Web URL.",
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const getResults = (state: IInitialState) => {
    return async (dispatch: Dispatch<IAction<IResultAndTotal>>) => {
        try {
            dispatch(setFetchingData(true));
            const results: IResultAndTotal = await api.getResults(state);
            dispatch(setSearchResults(results));
        } catch (reason) {
            let errorMessage: string = reason.message || reason;
            if (!!reason.response && !!reason.response.data && !!reason.response.data["odata.error"]
                && !!reason.response.data["odata.error"].code) {
                errorMessage += ` | ${reason.response.data["odata.error"].code}`;
            }
            if (!!reason.response && !!reason.response.data && !!reason.response.data["odata.error"]
                && !!reason.response.data["odata.error"].message
                && !!reason.response.data["odata.error"].message.value) {
                errorMessage += ` | ${reason.response.data["odata.error"].message.value}`;
            }

            dispatch(setErrorMessageData({
                message: errorMessage,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const getAllProperties = (item: IResult) => {
    return async (dispatch: Dispatch<IAction<IResultAndTotal>>) => {
        try {
            dispatch(setFetchingData(true));
            const result: IResult = await api.getAllProperties(item);
            dispatch(setSearchResult(result));
        } catch (reason) {
            let errorMessage: string = reason.message || reason;
            if (!!reason.response
                && !!reason.response.data
                && !!reason.response.data["odata.error"]
                && !!reason.response.data["odata.error"].code) {
                errorMessage += ` | ${reason.response.data["odata.error"].code}`;
            }
            if (!!reason.response
                && !!reason.response.data
                && !!reason.response.data["odata.error"]
                && !!reason.response.data["odata.error"].message
                && !!reason.response.data["odata.error"].message.value) {
                errorMessage += ` | ${reason.response.data["odata.error"].message.value}`;
            }

            dispatch(setErrorMessageData({
                message: errorMessage,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const spSearchActionsCreatorMap: ISpSearchActionCreatorsMapObject = {
    setQueryText,
    setWebUrl,
    setTrimDuplicates,
    setRowLimit,
    setSkip,
    setSelectFields,
    setRefiners,
    setFilters,
    setSortBy,
    setCollapsed,
    setResultSource,
    setSearchResults,
    getWebUrl,
    getResults,
    getAllProperties
};

export default spSearchActionsCreatorMap;
