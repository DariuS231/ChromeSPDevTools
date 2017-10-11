import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpSearchApi from "../api/spSearchApi";
import { ISearchResult, ISpSearchActionCreatorsMapObject } from "../interfaces/spSearchInterfaces";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";

const api = new SpSearchApi();


const ActionFactory = <T>(typeId:string) =>{
    return (value: T): IAction<T> => {
        return {
            payload: value,
            type: typeId
        };
    };
}

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
const setSerchResults = ActionFactory<ISearchResult[]>(actions.SET_SEARCH_RESULTS);

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
    setSerchResults
};

export default spSearchActionsCreatorMap;
