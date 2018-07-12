import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpFeaturesApi from "../api/spFeaturesApi";
import { FeatureScope } from "../constants/enums";
import { IFeature, ISpFeaturesActionCreatorsMapObject } from "../interfaces/spFeaturesInterfaces";
import { ActionFactory } from "./../../common/actionFactory";
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

const setFilterText = ActionFactory<string>(actions.SET_FILTER_TEXT);
const setWorkingOnIt = ActionFactory<boolean>(actions.SET_WORKING_ON_IT);
const setMessageData = ActionFactory<IMessageData>(actions.SET_MESSAGE_DATA);
// const setFeature = ActionFactory<IFeature>(actions.SET_FEATURE);

const setNoPermissions: ActionCreator<IAction<boolean>> = (): IAction<boolean> => {
    return {
        payload: true,
        type: actions.SET_NO_PERMISSIONS
    };
};
const getAllFeaturesSuccess: ActionCreator<IAction<IAllFeaturesSuccess>> =
    (webFeatures: IFeature[], siteFeatures: IFeature[]): IAction<IAllFeaturesSuccess> => {
        return {
            payload: { webFeatures, siteFeatures },
            type: actions.SET_ALL_FEATURES
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
    return async (dispatch: Dispatch<IAction<IFeature[]>>) => {
        try {
            const features: IFeature[] = await api.getFeatures(feature.scope)
            if (feature.scope === FeatureScope.Web) {
                dispatch(getWebFeaturesSuccess(features, feature));
            } else {
                dispatch(getSiteFeaturesSuccess(features, feature));
            }
        } catch (error) {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_GETTING_FEATURES, error));
        }
    };
};

const activateFeature = (feature: IFeature) => {
    return async (dispatch: Dispatch<IAction<IFeature>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            await api.activateFeature(feature);
            dispatch(getFeatures(feature));
        } catch (error) {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_ACTIVATING_FEATURE, error));
        }
    };
};

const deActivateFeature = (feature: IFeature) => {
    return async (dispatch: Dispatch<IAction<IFeature>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            await api.deActivateFeature(feature);
            dispatch(getFeatures(feature));
        } catch (error) {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_DEACTIVATING_FEATURE, error));
        }
    };
};

const checkUserPermissions = (permissionKing: SP.PermissionKind) => {
    return async (dispatch: Dispatch<IAction<void>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const hasPermissions: boolean = await api.checkUserPermissions(permissionKing);
            if (hasPermissions) {
                const siteFeatures = await api.getFeatures(FeatureScope.Site);
                const webFeatures = await api.getFeatures(FeatureScope.Web);
                dispatch(getAllFeaturesSuccess(webFeatures, siteFeatures));

            } else {
                dispatch(setNoPermissions());
            }
        } catch (error) {
            dispatch(handleAsyncError(constants.ERROR_MESSAGE_CHECK_USER_PERMISSIONS, error));
        }

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
