import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IInitialState } from "../interfaces/spSearchInterfaces";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";

const initialState: IInitialState = {
    results: new Array(),
    textQuery: "*",
    rowIndex: 10,
    start: 0,
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
        default:
            return state;
    }

};
