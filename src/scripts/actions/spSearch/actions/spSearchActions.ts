import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpSearchApi from "../api/spSearchApi";
import {
    IInitialState,
    IResultAndTotal,
    ISearchResult,
    ISpSearchActionCreatorsMapObject
} from "../interfaces/spSearchInterfaces";
import { ActionFactory } from "./../../common/actionFactory";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";

const api = new SpSearchApi();

const setQueryText = ActionFactory<string>(actions.SET_QUERY_TEXT);
const setTrimDuplicates = ActionFactory<boolean>(actions.SET_TRIM_DUPLICATES);
const setRowLimit = ActionFactory<number>(actions.SET_ROW_LIMIT);
const setSkip = ActionFactory<number>(actions.SET_SKIP);
const setSelectFields = ActionFactory<string[]>(actions.SET_SELECT_FIELDS);
const setRefiners = ActionFactory<string[]>(actions.SET_REFINERS);
const setFilters = ActionFactory<string[]>(actions.SET_FILTER);
const setSortBy = ActionFactory<string[]>(actions.SET_SORT);
const setResultSource = ActionFactory<string>(actions.SET_RESULT_SOURCE);
const setSearchResults = ActionFactory<IResultAndTotal>(actions.SET_SEARCH_RESULTS);
const setFetchingData = ActionFactory<boolean>(actions.SET_FETCHING_DATA);
const setMessageData = ActionFactory<IMessageData>(actions.SET_MESSAGE_DATA);
const setErrorMessageData = ActionFactory<IMessageData>(actions.SET_ERROR_MESSAGE_DATA);

const getResults = (state: IInitialState) => {
    return (dispatch: Dispatch<IAction<IResultAndTotal>>) => {
        dispatch(setFetchingData(true));
        return api.getResults(state).then((results: IResultAndTotal) => {
            dispatch(setSearchResults(results));
        }).catch((reason: any) => {
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
        });
    };
};

const spSearchActionsCreatorMap: ISpSearchActionCreatorsMapObject = {
    setQueryText,
    setTrimDuplicates,
    setRowLimit,
    setSkip,
    setSelectFields,
    setRefiners,
    setFilters,
    setSortBy,
    setResultSource,
    setSearchResults,
    getResults
};

export default spSearchActionsCreatorMap;
