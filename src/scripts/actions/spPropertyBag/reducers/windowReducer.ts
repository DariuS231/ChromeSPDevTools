/// <reference path="./../../common/interfaces.ts"/>

import { WindowActionID as actions } from './../constants/enums'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import { IWindowsState, IAction } from '../interfaces/spPropertyBagInterfaces'

const initialState = {
    isWorkingOnIt: true,
    userHasPermission: false,
    filterText: '',
    messageData: {
        showMessage: false,
        message: '',
        type: MessageBarType.info
    }
}
export const spwindowReducer = (state: IWindowsState = initialState, action: IAction<string, any>) => {
    switch (action.type) {
        case actions.SET_FILTER_TEXT:
            return Object.assign({}, state, { filterText: action.payload });
        case actions.SET_MESSAGE_DATA:
            return Object.assign({}, state, { messageData: action.payload });
        case actions.SET_USER_PERMISSIONS:
            return Object.assign({}, state, { userHasPermission: action.payload });
        case actions.SET_WORKING_ON_IT:
            return Object.assign({}, state, { isWorkingOnIt: action.payload });
        default:
            return state;
    }

}