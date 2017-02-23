import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpFeaturesApi from "../api/spFeaturesApi";
import { FeatureScope } from "../constants/enums";
import { IFeature, ISpFeaturesActionCreatorsMapObject } from "../interfaces/spFeaturesInterfaces";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";

interface IAllFeaturesSuccess {
    webFeatures: IFeature[];
    siteFeatures: IFeature[];
}

interface IFeatureUpdateSuccess {
    features: IFeature[];
    feature: IFeature;
}

const api = new SpFeaturesApi();

const setFilterText: ActionCreator<IAction<string>> = (filterText: string): IAction<string> => {
    return {
        payload: filterText,
        type: actions.SET_FILTER_TEXT
    };
};
const setWorkingOnIt: ActionCreator<IAction<boolean>> = (isWorkingOnIt: boolean): IAction<boolean> => {
    return {
        payload: isWorkingOnIt,
        type: actions.SET_WORKING_ON_IT
    };
};
const setNoPermissions: ActionCreator<IAction<boolean>> = (): IAction<boolean> => {
    return {
        payload: true,
        type: actions.SET_NO_PERMISSIONS
    };
};
const setMessageData: ActionCreator<IAction<IMessageData>> = (messageData: IMessageData): IAction<IMessageData> => {
    return {
        payload: messageData,
        type: actions.SET_MESSAGE_DATA
    };
};
const getAllFeaturesSuccess: ActionCreator<IAction<IAllFeaturesSuccess>> =
    (webFeatures: IFeature[], siteFeatures: IFeature[]): IAction<IAllFeaturesSuccess> => {
        return {
            payload: { webFeatures, siteFeatures },
            type: actions.SET_ALL_FEATURES
        };
    };
const setFeature: ActionCreator<IAction<IFeature>> = (feature: IFeature): IAction<IFeature> => {
    return {
        payload: feature,
        type: actions.SET_FEATURE
    };
};

const getWebFeaturesSuccess: ActionCreator<IAction<IFeatureUpdateSuccess>> =
    (features: IFeature[], feature: IFeature): IAction<IFeatureUpdateSuccess> => {
        return {
            payload: { features, feature },
            type: actions.SET_WEB_FEATURES_AFTER_UPDATE
        };
    };

const getSiteFeaturesSuccess: ActionCreator<IAction<IFeatureUpdateSuccess>> =
    (features: IFeature[], feature: IFeature): IAction<IFeatureUpdateSuccess> => {
        return {
            payload: { features, feature },
            type: actions.SET_SITE_FEATURES_AFTER_UPDATE
        };
    };
const handleAsyncError: ActionCreator<IAction<IMessageData>> =
    (errorMessage: string, exceptionMessage: string): IAction<IMessageData> => {
        // tslint:disable-next-line:no-console
        console.log(exceptionMessage);
        return {
            payload: {
                message: errorMessage,
                showMessage: true,
                type: MessageBarType.error
            },
            type: actions.HANDLE_ASYNC_ERROR
        };
    };
const getFeatures = (feature: IFeature) => {
    return (dispatch: Dispatch<IAction<IFeature[]>>) => {
        return api.getFeatures(feature.scope).then((features: IFeature[]) => {
            return (feature.scope === FeatureScope.Web
                ? dispatch(getWebFeaturesSuccess(features, feature))
                : dispatch(getSiteFeaturesSuccess(features, feature)));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_GETTING_FEATURES, reason));
        });
    };
};

const activateFeature = (feature: IFeature) => {
    return (dispatch: Dispatch<IAction<IFeature>>) => {
        dispatch(setWorkingOnIt(true));
        return api.activateFeature(feature).then((featureUpdt: IFeature) => {
            dispatch(getFeatures(feature));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_ACTIVATING_FEATURE, reason));
        });
    };
};

const deActivateFeature = (feature: IFeature) => {
    return (dispatch: Dispatch<IAction<IFeature>>) => {
        dispatch(setWorkingOnIt(true));
        return api.deActivateFeature(feature).then((featureUpdt: IFeature) => {
            dispatch(getFeatures(feature));
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_DEACTIVATING_FEATURE, reason));
        });
    };
};

const checkUserPermissions = (permissionKing: SP.PermissionKind) => {
    return (dispatch: Dispatch<IAction<void>>) => {
        return api.checkUserPermissions(permissionKing).then((hasPermissions: boolean) => {
            if (hasPermissions) {
                const getSiteFeatures = api.getFeatures(FeatureScope.Site);
                const getWebFeatures = api.getFeatures(FeatureScope.Web);
                return Promise.all([getSiteFeatures, getWebFeatures]).then((values: any) => {
                    dispatch(getAllFeaturesSuccess(values[1], values[0]));
                });

            } else {
                dispatch(setNoPermissions());
            }
        }).catch((reason: any) => {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_CHECK_USER_PERMISSIONS, reason));
        });
    };
};

const spFeaturesActionsCreatorMap: ISpFeaturesActionCreatorsMapObject = {
    deActivateFeature,
    activateFeature,
    checkUserPermissions,
    setFilterText,
    setWorkingOnIt,
    setNoPermissions,
    setMessageData
};

export default spFeaturesActionsCreatorMap;
