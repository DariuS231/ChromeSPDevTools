/// <reference path="./../../common/interfaces.ts"/>

import { WindowActionID as actions } from './../constants/enums'
import { ActionCreator, ActionCreatorsMapObject } from 'redux'

import { IAction, IProperty } from '../interfaces/spPropertyBagInterfaces'

const setFilterText: ActionCreator<IAction<actions, string>> = (filterText: string): IAction<actions, string> => {
    return {
        type: actions.SET_FILTER_TEXT,
        payload: filterText
    }
}
const setWorkingOnIt: ActionCreator<IAction<actions, boolean>> = (isWorkingOnIt: boolean): IAction<actions, boolean> => {
    return {
        type: actions.SET_WORKING_ON_IT,
        payload: isWorkingOnIt
    }
}
const setUserHasPermissions: ActionCreator<IAction<actions, boolean>> = (userHasPermission: boolean): IAction<actions, boolean> => {
    return {
        type: actions.SET_USER_PERMISSIONS,
        payload: userHasPermission
    }
}
const setMessageData: ActionCreator<IAction<actions, IMessageData>> = (messageData: IMessageData): IAction<actions, IMessageData> => {
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
