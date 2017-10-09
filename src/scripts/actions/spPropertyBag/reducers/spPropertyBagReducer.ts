import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IInitialState, IProperty } from "../interfaces/spPropertyBagInterfaces";
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
    userHasPermission: false,
    webProperties: []
};

export const spPropertyBagReducer = (state: IInitialState = initialState, action: IAction<any>): IInitialState => {
    switch (action.type) {
        case actions.CREATE_PROPERTY:
            const newProperty: IProperty = action.payload;
            return {
                ...state, isWorkingOnIt: false,
                messageData: {
                    message: constants.MESSAGE_PROPERTY_CREATED,
                    showMessage: true,
                    type: MessageBarType.success
                },
                webProperties: [...state.webProperties, newProperty]
            };
        case actions.DELETE_PROPERTY:
            const delProperty: IProperty = action.payload;
            return {
                ...state, isWorkingOnIt: false,
                messageData: {
                    message: constants.MESSAGE_PROPERTY_DELETED,
                    showMessage: true,
                    type: MessageBarType.success
                },
                webProperties: [...state.webProperties.filter((prop: IProperty) => prop.key !== delProperty.key)]
            };
        case actions.UPDATE_PROPERTY:
            const updtdProperty: IProperty = action.payload;
            const filtered = state.webProperties.map((prop: IProperty) => {
                if (prop.key === updtdProperty.key) {
                    return updtdProperty;
                } else {
                    return prop;
                }
            });
            return {
                ...state, isWorkingOnIt: false,
                messageData: {
                    message: constants.MESSAGE_PROPERTY_UPDATED,
                    showMessage: true,
                    type: MessageBarType.success
                },
                webProperties: filtered
            };
        case actions.SET_ALL_PROPERTIES:
            const properties: IProperty[] = action.payload;
            return { ...state, isWorkingOnIt: false, webProperties: properties };
        case actions.SET_FILTER_TEXT:
            const filterText: string = action.payload;
            return { ...state, filterText };
        case actions.SET_MESSAGE_DATA:
            const messageData: IMessageData = action.payload;
            return { ...state, messageData };
        case actions.SET_USER_PERMISSIONS:
            const userHasPermission: boolean = action.payload;
            return { ...state, userHasPermission };
        case actions.SET_WORKING_ON_IT:
            const isWorkingOnIt: boolean = action.payload;
            return { ...state, isWorkingOnIt };
        case actions.HANDLE_ASYNC_ERROR:
            const errorMessage: IMessageData = action.payload;
            return { ...state, isWorkingOnIt: false, messageData: errorMessage };
        case actions.SET_FAVOURITE:
            const favItem: IProperty = action.payload;
            const itemArray: IProperty[] = state.webProperties;
            const filteredFav = itemArray.map((prop: IProperty, index: number) => {
                if (prop.key !== favItem.key) {
                    return prop;
                } else {
                    return favItem;
                }
            });
            return { ...state, webProperties: filteredFav };
        default:
            return state;
    }

};
