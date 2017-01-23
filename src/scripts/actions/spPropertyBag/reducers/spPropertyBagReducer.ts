import { ActionsId as actions, constants } from './../constants/constants'
import { IProperty, IInitialState } from '../interfaces/spPropertyBagInterfaces'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { IMessageData, IAction } from './../../common/interfaces'

const initialState: IInitialState = {
    isWorkingOnIt: true,
    userHasPermission: false,
    webProperties: [],
    filterText: constants.EMPTY_STRING,
    messageData: {
        showMessage: false,
        message: constants.EMPTY_STRING,
        type: MessageBarType.info
    }
}

export const spPropertyBagReducer = (state: IInitialState = initialState, action: IAction<any>): IInitialState => {
    switch (action.type) {
        case actions.CREATE_PROPERTY:
            const newPropperty: IProperty = action.payload;
            return Object.assign({}, state, {
                webProperties: [...state.webProperties, Object.assign({}, newPropperty)],
                isWorkingOnIt: false,
                messageData: {
                    showMessage: true,
                    message: constants.MESSAGE_PROPERTY_CREATED,
                    type: MessageBarType.success
                }
            });
        case actions.DELETE_PROPERTY:
            const delPropperty: IProperty = action.payload;
            return Object.assign({}, state, {
                webProperties: [...state.webProperties.filter(prop => prop.key !== delPropperty.key)],
                isWorkingOnIt: false,
                messageData: {
                    showMessage: true,
                    message: constants.MESSAGE_PROPERTY_DELETED,
                    type: MessageBarType.success
                }
            });
        case actions.UPDATE_PROPERTY:
            const updtdPropperty: IProperty = action.payload;
            const filtered = state.webProperties.map((prop: IProperty) => {
                if (prop.key === updtdPropperty.key) {
                    return updtdPropperty;
                } else {
                    return prop;
                }
            });
            return Object.assign({}, state, {
                webProperties: filtered,
                isWorkingOnIt: false,
                messageData: {
                    showMessage: true,
                    message: constants.MESSAGE_PROPERTY_UPDATED,
                    type: MessageBarType.success
                }
            });
        case actions.SET_ALL_PROPERTIES:
            const properties: Array<IProperty> = action.payload;
            return Object.assign({}, state, {
                webProperties: properties,
                isWorkingOnIt: false
            });
        case actions.SET_FILTER_TEXT:
            const filterText: string = action.payload;
            return Object.assign({}, state, { filterText: filterText });
        case actions.SET_MESSAGE_DATA:
            const messageData: IMessageData = action.payload;
            return Object.assign({}, state, { messageData: messageData });
        case actions.SET_USER_PERMISSIONS:
            const userHasPermission: boolean = action.payload;
            return Object.assign({}, state, { userHasPermission: userHasPermission });
        case actions.SET_WORKING_ON_IT:
            const isWorkingOnIt: boolean = action.payload;
            return Object.assign({}, state, { isWorkingOnIt: isWorkingOnIt });
        default:
            return state;
    }

}