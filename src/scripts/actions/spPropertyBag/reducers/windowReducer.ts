/// <reference path="./../../common/interfaces.ts"/>

import { WindowActionID as actions } from './../constants/spPropertyBagActionsIDs'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

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
export const spwindowReducer = (state:any = initialState, action:any) => {
    switch (action.type) {
        case actions.SET_FILTER_TEXT:
            return Object.assign({}, state, { filterText: action.filterText });
        case actions.SET_MESSAGE_DATA:
            return Object.assign({}, state, { messageData: action.messageData });
        case actions.SET_USER_PERMISSIONS:
            return Object.assign({}, state, { userHasPermission: action.userHasPermission });
        case actions.SET_WORKING_ON_IT:
            return Object.assign({}, state, { isWorkingOnIt: action.isWorkingOnIt });
        default:
            return state;
    }

}