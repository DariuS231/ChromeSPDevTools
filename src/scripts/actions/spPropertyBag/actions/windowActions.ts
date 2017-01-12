/// <reference path="./../../common/interfaces.ts"/>

import { WindowActionID as actions } from './../constants/enums'
import { ActionCreator, ActionCreatorsMapObject } from 'redux'

import { IAction, IProperty } from '../interfaces/spPropertyBagInterfaces'

const setFilterText: ActionCreator<IAction<string, string>> = (filterText: string): IAction<string, string> => {
    return {
        type: actions.SET_FILTER_TEXT,
        payload: filterText
    }
}
const setWorkingOnIt: ActionCreator<IAction<string, boolean>> = (isWorkingOnIt: boolean): IAction<string, boolean> => {
    return {
        type: actions.SET_WORKING_ON_IT,
        payload: isWorkingOnIt
    }
}
const setUserHasPermissions: ActionCreator<IAction<string, boolean>> = (userHasPermission: boolean): IAction<string, boolean> => {
    return {
        type: actions.SET_USER_PERMISSIONS,
        payload: userHasPermission
    }
}
const setMessageData: ActionCreator<IAction<string, IMessageData>> = (messageData: IMessageData): IAction<string, IMessageData> => {
    return {
        type: actions.SET_USER_PERMISSIONS,
        payload: messageData
    }
}

const windowsActionsCreatorsMap: ActionCreatorsMapObject = {
    setFilterText,
    setWorkingOnIt,
    setUserHasPermissions,
    setMessageData
}

export default windowsActionsCreatorsMap;
