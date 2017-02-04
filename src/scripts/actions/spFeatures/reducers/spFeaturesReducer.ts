import { ActionsId as actions, constants } from './../constants/constants'
import { IFeature, IInitialState } from '../interfaces/spFeaturesInterfaces'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { IMessageData, IAction } from './../../common/interfaces'

const initialState: IInitialState = {
    isWorkingOnIt: true,
    userHasPermission: false,
    siteFeatures: [],
    webFeatures: [],
    filterText: constants.EMPTY_STRING,
    messageData: {
        showMessage: false,
        message: constants.EMPTY_STRING,
        type: MessageBarType.info
    }
}

export const spFeaturesReducer = (state: IInitialState = initialState, action: IAction<any>): IInitialState => {
    switch (action.type) {
        case actions.SET_SITE_FEATURES:
            const fsiteFatures: IFeature = action.payload;
            return Object.assign({}, state, {
                siteFeatures: fsiteFatures,
                isWorkingOnIt: false
            });
        case actions.SET_ALL_FEATURES:
            const webFeatures: IFeature = action.payload.webFeatures;
            const siteFeatures: IFeature = action.payload.siteFeatures;
            return Object.assign({}, state, {
                siteFeatures: siteFeatures,
                webFeatures: webFeatures,
                userHasPermission: true,
                isWorkingOnIt: false
            });
        case actions.ACTIVATE_FEATURE:
            const activeFeature: IFeature = action.payload;
            return state;
        case actions.DEACTIVATE_FEATURE:
            const deActiveFeature: IFeature = action.payload;
            return state;
        case actions.SET_FILTER_TEXT:
            const filterText: string = action.payload;
            return Object.assign({}, state, { filterText: filterText });
        case actions.SET_MESSAGE_DATA:
            const messageData: IMessageData = action.payload;
            return Object.assign({}, state, { messageData: messageData });
        case actions.SET_NO_PERMISSIONS:
            return Object.assign({}, state, {
                messageData: {
                    showMessage: true,
                    message: constants.MESSAGE_USER_NO_PERMISSIONS,
                    type: MessageBarType.error
                }
            });
        case actions.SET_WORKING_ON_IT:
            const isWorkingOnIt: boolean = action.payload;
            return Object.assign({}, state, { isWorkingOnIt: isWorkingOnIt });
        default:
            return state;
    }

}