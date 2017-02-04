import { ActionsId as actions, constants } from './../constants/constants'
import { IFeature, ISpFeaturesActionCreatorsMapObject } from '../interfaces/spFeaturesInterfaces'
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import SpFeaturesApi from '../api/spFeaturesApi'
import { IMessageData, IAction } from './../../common/interfaces'
import { FeatureScope } from '../constants/enums';


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
const setNoPermissions: ActionCreator<IAction<boolean>> = (): IAction<boolean> => {
    return {
        type: actions.SET_NO_PERMISSIONS,
        payload: true
    }
}
const setMessageData: ActionCreator<IAction<IMessageData>> = (messageData: IMessageData): IAction<IMessageData> => {
    return {
        type: actions.SET_MESSAGE_DATA,
        payload: messageData
    }
}
const getAllFeaturesSuccess: ActionCreator<IAction<{ webFeatures: Array<IFeature>, siteFeatures: Array<IFeature> }>> = (webFeatures: Array<IFeature>, siteFeatures: Array<IFeature>): IAction<{ webFeatures: Array<IFeature>, siteFeatures: Array<IFeature> }> => {
    return {
        type: actions.SET_ALL_FEATURES,
        payload: { webFeatures: webFeatures, siteFeatures: siteFeatures }
    }
}
const getAllSiteFeatures = () => {
    return function (dispatch: Dispatch<IAction<Array<IFeature>>>) {
        return api.getFeatures(FeatureScope.Site).then(
            (properties: Array<IFeature>) => {

            }
        );
    };
}
const getAllWebFeatures = () => {
    return function (dispatch: Dispatch<IAction<Array<IFeature>>>) {
        return api.getFeatures(FeatureScope.Web).then(
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
    return function (dispatch: Dispatch<IAction<void>>) {
        return api.checkUserPermissions(permissionKing).then(
            (hasPermissions: boolean) => {
                if (hasPermissions) {
                    const getSiteFeatures = api.getFeatures(FeatureScope.Site);
                    const getWebFeatures = api.getFeatures(FeatureScope.Web);
                    return Promise.all([getSiteFeatures, getWebFeatures]).then(values => {
                        dispatch(getAllFeaturesSuccess(values[1],values[0]));
                    });

                } else {
                    dispatch(setNoPermissions());
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
    setNoPermissions,
    setMessageData
}

export default spFeaturesActionsCreatorMap;
