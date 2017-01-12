import { PropertyActionID as actions } from './../constants/enums'
import { IProperty, IAction, IInitialState } from '../interfaces/spPropertyBagInterfaces'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

const initialState: IInitialState = {
    isWorkingOnIt: true,
    userHasPermission: false,
    webProperties: [],
    filterText: '',
    messageData: {
        showMessage: false,
        message: '',
        type: MessageBarType.info
    }
}

export const spPropertyBagReducer = (state: IInitialState = initialState, action: IAction<string, any>): IInitialState => {
    switch (action.type) {
        case actions.CREATE_PROPERTY:
            const newPropperty: IProperty = action.payload;
            return Object.assign({}, state, {
                webProperties: [...state.webProperties, Object.assign({}, newPropperty)],
                isWorkingOnIt: false
            });
        case actions.DELETE_PROPERTY:
            const delPropperty: IProperty = action.payload;
            return Object.assign({}, state, {
                webProperties: [...state.webProperties.filter(prop => prop.key !== delPropperty.key)],
                isWorkingOnIt: false
            });
        case actions.UPDATE_PROPERTY:
            const updtdPropperty: IProperty = action.payload;
            return Object.assign({}, state, {
                webProperties: [...state.webProperties.filter(prop => prop.key !== delPropperty.key), Object.assign({}, updtdPropperty)],
                isWorkingOnIt: false
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