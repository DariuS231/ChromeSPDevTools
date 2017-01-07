/// <reference path="./../../common/interfaces.ts"/>

import { WindowActionID as actions } from './../constants/spPropertyBagActionsIDs'

export default class windowActions {

    public static setFilterText(filterText: string) {
        return {
            type: actions.SET_FILTER_TEXT,
            filterText
        }
    }
    public static setWorkingOnIt(isWorkingOnIt: boolean) {
        return {
            type: actions.SET_WORKING_ON_IT,
            isWorkingOnIt
        }
    }
    public static setUserHasPermissions(userHasPermission: boolean) {
        return {
            type: actions.SET_USER_PERMISSIONS,
            userHasPermission
        }
    }
    public static setMessageData(messageData: IMessageData) {
        return {
            type: actions.SET_USER_PERMISSIONS,
            messageData
        }
    }
}