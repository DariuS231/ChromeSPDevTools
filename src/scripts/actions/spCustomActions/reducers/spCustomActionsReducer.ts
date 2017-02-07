import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ICustomAction, IInitialState } from "../interfaces/spCustomActionsInterfaces";
import { ViewMode } from "./../../common/enums";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";
import { CustomActionType } from "./../constants/enums";

const initialState: IInitialState = {
    customActionType: CustomActionType.Web,
    customActions: [],
    filterText: constants.EMPTY_STRING,
    isWorkingOnIt: true,
    messageData: {
        message: constants.EMPTY_STRING,
        showMessage: false,
        type: MessageBarType.info
    },
    userHasPermission: false
};

export const spCustomActionsReducer = (state: IInitialState = initialState, action: IAction<any>): IInitialState => {
    switch (action.type) {
        case actions.CREATE_CUSTOM_ACTION:
            const newCustomAction: ICustomAction = action.payload;
            return {
                ...state,
                customActions: [...state.customActions, newCustomAction],
                isWorkingOnIt: false,
                messageData: {
                    message: constants.MESSAGE_CUSTOM_ACTION_CREATED,
                    showMessage: true,
                    type: MessageBarType.success
                }
            };
        case actions.DELETE_CUSTOM_ACTION:
            const delCustomAction: ICustomAction = action.payload;
            return {
                ...state,
                customActions: [...state.customActions.filter((prop: ICustomAction) => prop.id !== delCustomAction.id)],
                isWorkingOnIt: false,
                messageData: {
                    message: constants.MESSAGE_CUSTOM_ACTION_DELETED,
                    showMessage: true,
                    type: MessageBarType.success
                }
            };
        case actions.UPDATE_CUSTOM_ACTION:
            const updtdCustomAction: ICustomAction = action.payload;
            const filtered = state.customActions.map((prop: ICustomAction) => {
                if (prop.id === updtdCustomAction.id) {
                    return updtdCustomAction;
                } else {
                    return prop;
                }
            });
            return {
                ...state,
                customActions: filtered,
                isWorkingOnIt: false,
                messageData: {
                    message: constants.MESSAGE_CUSTOM_ACTION_UPDATED,
                    showMessage: true,
                    type: MessageBarType.success
                }
            };
        case actions.SET_ALL_CUSTOM_ACTIONS:
            const properties: ICustomAction[] = action.payload;
            return {
                ...state,
                customActions: properties,
                isWorkingOnIt: false
            };
        case actions.SET_FILTER_TEXT:
            const filterText: string = action.payload;
            return { ...state, filterText };
        case actions.SET_MESSAGE_DATA:
            const messageData: IMessageData = action.payload;
            return { ...state, messageData };
        case actions.SET_USER_PERMISSIONS:
            const userHasPermission: boolean = action.payload;
            return { ...state, userHasPermission };
        case actions.SET_WORKING_ON_IT:
            const isWorkingOnIt: boolean = action.payload;
            return { ...state, isWorkingOnIt };
        default:
            return state;
    }

};
