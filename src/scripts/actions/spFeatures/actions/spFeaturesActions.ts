import { ActionsId as actions, constants } from './../constants/constants'
import { IFeature, ISpFeaturesActionCreatorsMapObject } from '../interfaces/spFeaturesInterfaces'
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import SpFeaturesApi from '../api/spFeaturesApi'
import { IMessageData, IAction } from './../../common/interfaces'


const api = new SpFeaturesApi();

const setFilterText: ActionCreator<IAction<string>> = (filterText: string): IAction<string> => {
    return {
        type: actions.SET_FILTER_TEXT,
        payload: filterText
    }
}
const setWorkingOnIt: ActionCreator<IAction<boolean>> = (isWorkingOnIt: boolean): IAction<boolean> => {
    return {
        type: actions.SET_WORKING_ON_IT,
        payload: isWorkingOnIt
    }
}
const setUserHasPermissions: ActionCreator<IAction<boolean>> = (userHasPermission: boolean): IAction<boolean> => {
    return {
        type: actions.SET_USER_PERMISSIONS,
        payload: userHasPermission
    }
}
const setMessageData: ActionCreator<IAction<IMessageData>> = (messageData: IMessageData): IAction<IMessageData> => {
    return {
        type: actions.SET_MESSAGE_DATA,
        payload: messageData
    }
}

const getAllSiteFeatures = () => {
    return function (dispatch: Dispatch<IAction<Array<IFeature>>>) {
        return api.getFeatures().then(
            (properties: Array<IFeature>) => {
                
            }
        );
    };
}
const getAllWebFeatures = () => {
    return function (dispatch: Dispatch<IAction<Array<IFeature>>>) {
        return api.getFeatures().then(
            (properties: Array<IFeature>) => {
                
            }
        );
    };
}

const activateFeature = (feature: IFeature) => {
    return function (dispatch: Dispatch<IAction<IFeature>>) {
        dispatch(setWorkingOnIt(true));
        return api.activateFeature(feature).then(
            (feature: IFeature) => {
                
            }
        );
    };
}

const deActivateFeature = (feature: IFeature) => {
    return function (dispatch: Dispatch<IAction<IFeature>>) {
        dispatch(setWorkingOnIt(true));
        return api.deActivateFeature(feature).then(
            (feature: IFeature) => {
                
            }
        );
    };
}

const checkUserPermissions = (permissionKing: SP.PermissionKind) => {
    return function (dispatch: Dispatch<IAction<IFeature>>) {
        return api.checkUserPermissions(permissionKing).then(
            (hasPermissions: boolean) => {
                if (hasPermissions) {
                    dispatch(setUserHasPermissions(true));
                    
                } else {
                    dispatch(setWorkingOnIt(false));
                    dispatch(setMessageData({
                        showMessage: true,
                        message: constants.MESSAGE_USER_NO_PERMISSIONS,
                        type: MessageBarType.error
                    }));
                }
            }
        );
    };
}

const spFeaturesActionsCreatorMap: ISpFeaturesActionCreatorsMapObject = {
    deActivateFeature,
    activateFeature,
    getAllWebFeatures,
    getAllSiteFeatures,
    checkUserPermissions,
    setFilterText,
    setWorkingOnIt,
    setUserHasPermissions,
    setMessageData
}

export default spFeaturesActionsCreatorMap;
