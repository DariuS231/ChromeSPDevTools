import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpSearchApi from "../api/spSearchApi";
import { IInitialState, ISearchResult, ISpSearchActionCreatorsMapObject } from "../interfaces/spSearchInterfaces";
import { ActionFactory } from "./../../common/actionFactory";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";

const api = new SpSearchApi();

const setQueryText = ActionFactory<string>(actions.SET_QUERY_TEXT);
const setTrimDuplicates = ActionFactory<boolean>(actions.SET_TRIM_DUPLICATES);
const setRowLimit = ActionFactory<number>(actions.SET_ROW_LIMIT);
const setStart = ActionFactory<number>(actions.SET_START);
const setSkip = ActionFactory<number>(actions.SET_SKIP);
const setSelectFields = ActionFactory<string[]>(actions.SET_SELECT_FIELDS);
const setRefiners = ActionFactory<string[]>(actions.SET_REFINERS);
const setFilters = ActionFactory<string[]>(actions.SET_FILTER);
const setSortBy = ActionFactory<string[]>(actions.SET_SORT);
const setResultSource = ActionFactory<string>(actions.SET_RESULT_SOURCE);
const setSearchResults = ActionFactory<ISearchResult>(actions.SET_SEARCH_RESULTS);

const getResults = (state: IInitialState) => {
    return (dispatch: Dispatch<IAction<ISearchResult>>) => {
        return api.getResults(state).then((results: ISearchResult) => {
            dispatch(setSearchResults(results));
        });
    };
};

const spSearchActionsCreatorMap: ISpSearchActionCreatorsMapObject = {
    setQueryText,
    setTrimDuplicates,
    setRowLimit,
    setStart,
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
