import { ActionsId as actions, constants } from './../constants/constants'
import { ICustomAction, IInitialState } from '../interfaces/spCustomActionsInterfaces'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { IMessageData, IAction } from './../../common/interfaces'
import { ViewMode } from './../../common/enums';
import { CustomActionType } from './../constants/enums';

const initialState: IInitialState = {
    isWorkingOnIt: true,
    userHasPermission: false,
    customActions: [],
    filterText: constants.EMPTY_STRING,
    messageData: {
        showMessage: false,
        message: constants.EMPTY_STRING,
        type: MessageBarType.info
    }
}

export const spCustomActionsReducer = (state: IInitialState = initialState, action: IAction<any>): IInitialState => {
    switch (action.type) {
        case actions.CREATE_CUSTOM_ACTION:
            const newCustomAction: ICustomAction = action.payload;
            return Object.assign({}, state, {
                customActions: [...state.customActions, Object.assign({}, newCustomAction)],
                isWorkingOnIt: false,
                messageData: {
                    showMessage: true,
                    message: constants.MESSAGE_CUSTOM_ACTION_CREATED,
                    type: MessageBarType.success
                }
            });
        case actions.DELETE_CUSTOM_ACTION:
            const delCustomAction: ICustomAction = action.payload;
            return Object.assign({}, state, {
                customActions: [...state.customActions.filter(prop => prop.id !== delCustomAction.id)],
                isWorkingOnIt: false,
                messageData: {
                    showMessage: true,
                    message: constants.MESSAGE_CUSTOM_ACTION_DELETED,
                    type: MessageBarType.success
                }
            });
        case actions.UPDATE_CUSTOM_ACTION:
            const updtdCustomAction: ICustomAction = action.payload;
            const filtered = state.customActions.map((prop: ICustomAction) => {
                if (prop.id === updtdCustomAction.id) {
                    return updtdCustomAction;
                } else {
                    return prop;
                }
            });
            return Object.assign({}, state, {
                customActions: filtered,
                isWorkingOnIt: false,
                messageData: {
                    showMessage: true,
                    message: constants.MESSAGE_CUSTOM_ACTION_UPDATED,
                    type: MessageBarType.success
                }
            });
        case actions.SET_ALL_CUSTOM_ACTIONS:
            const properties: Array<ICustomAction> = action.payload;
            return Object.assign({}, state, {
                customActions: properties,
                isWorkingOnIt: false
            });
        case actions.SET_FILTER_TEXT:
            const filterText: string = action.payload;
            return Object.assign({}, state, { filterText: filterText });
        case actions.SET_MESSAGE_DATA:
            const messageData: IMessageData = action.payload;
            return Object.assign({}, state, { messageData: messageData });
        case actions.SET_USER_PERMISSIONS:
            const userHasPermission: boolean = action.payload;
            return Object.assign({}, state, { userHasPermission: userHasPermission });
        case actions.SET_WORKING_ON_IT:
            const isWorkingOnIt: boolean = action.payload;
            return Object.assign({}, state, { isWorkingOnIt: isWorkingOnIt });
        default:
            return state;
    }

}