import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { FeatureScope } from "../constants/enums";
import { IFeature, IInitialState } from "../interfaces/spFeaturesInterfaces";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";

const initialState: IInitialState = {
    filterText: constants.EMPTY_STRING,
    isWorkingOnIt: true,
    messageData: {
        message: constants.EMPTY_STRING,
        showMessage: false,
        type: MessageBarType.info
    },
    siteFeatures: [],
    userHasPermission: false,
    webFeatures: [],
};

export const spFeaturesReducer = (state: IInitialState = initialState, action: IAction<any>): IInitialState => {
    const getFeatureUpdatedMessage = (feature: IFeature): string => {
        return "The web feature " + feature.name + " has been " + (!feature.activated ? "Activated" : "Deactivated");
    };
    switch (action.type) {
        case actions.SET_SITE_FEATURES_AFTER_UPDATE:
            const fSiteFeatures: IFeature[] = action.payload.features;
            const fSiteFeature: IFeature = action.payload.feature;

            return {
                ...state,
                isWorkingOnIt: false,
                messageData: {
                    message: getFeatureUpdatedMessage(fSiteFeature),
                    showMessage: true,
                    type: MessageBarType.success
                },
                siteFeatures: fSiteFeatures
            };
        case actions.SET_WEB_FEATURES_AFTER_UPDATE:
            const fWebFeatures: IFeature[] = action.payload.features;
            const fWebFeature: IFeature = action.payload.feature;

            return {
                ...state,
                isWorkingOnIt: false,
                messageData: {
                    message: getFeatureUpdatedMessage(fWebFeature),
                    showMessage: true,
                    type: MessageBarType.success
                },
                webFeatures: fWebFeatures
            };
        case actions.SET_ALL_FEATURES:
            const webFeatures: IFeature[] = action.payload.webFeatures;
            const siteFeatures: IFeature[] = action.payload.siteFeatures;
            return { ...state, isWorkingOnIt: false, siteFeatures, webFeatures, userHasPermission: true };
        case actions.ACTIVATE_FEATURE:
            const activeFeature: IFeature = action.payload;
            return state;
        case actions.DEACTIVATE_FEATURE:
            const deActiveFeature: IFeature = action.payload;
            return state;
        case actions.SET_FILTER_TEXT:
            const filterText: string = action.payload;
            return { ...state, filterText };
        case actions.SET_MESSAGE_DATA:
            const messageData: IMessageData = action.payload;
            return { ...state, messageData };
        case actions.SET_NO_PERMISSIONS:
            return {
                ...state,
                messageData: {
                    message: constants.MESSAGE_USER_NO_PERMISSIONS,
                    showMessage: true,
                    type: MessageBarType.error
                }
            };
        case actions.SET_WORKING_ON_IT:
            const isWorkingOnIt: boolean = action.payload;
            return { ...state, isWorkingOnIt };
        case actions.HANDLE_ASYNC_ERROR:
            const errorMessage: IMessageData = action.payload;
            return { ...state, isWorkingOnIt: false, messageData: errorMessage };
        default:
            return state;
    }

};
