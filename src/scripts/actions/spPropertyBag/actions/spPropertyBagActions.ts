
import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpPropertyBagApi from "../api/spPropertyBagApi";
import { Favourites } from "../helpers/spPropertyBagfavourites";
import { IProperty, ISpPropertyBagActionCreatorsMapObject } from "../interfaces/spPropertyBagInterfaces";
import { ActionFactory } from "./../../common/actionFactory";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";

const api = new SpPropertyBagApi();

const modifyProperty = ActionFactory<IProperty>(actions.UPDATE_PROPERTY);

const removeProperty = ActionFactory<IProperty>(actions.DELETE_PROPERTY);
const addProperty = ActionFactory<IProperty>(actions.CREATE_PROPERTY);
const setAllProperties = ActionFactory<IProperty[]>(actions.SET_ALL_PROPERTIES);
const setFilterText = ActionFactory<string>(actions.SET_FILTER_TEXT);
const setWorkingOnIt = ActionFactory<boolean>(actions.SET_WORKING_ON_IT);
const setUserHasPermissions = ActionFactory<boolean>(actions.SET_USER_PERMISSIONS);
const setMessageData = ActionFactory<IMessageData>(actions.SET_MESSAGE_DATA);

const setFavourite = (property: IProperty) => {
    const newFav: boolean = !property.isFavourite;
    newFav ? Favourites.addToFavourites(property.key) : Favourites.removeFromFavourites(property.key);
    return {
        payload: { ...property, isFavourite: newFav },
        type: actions.SET_FAVOURITE
    };
};

const getAllProperties = () => {
    return async (dispatch: Dispatch<IAction<IProperty[]>>) => {
        try {
            const properties: IProperty[] = await api.getProperties();
            dispatch(setAllProperties(properties));
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_GET_ALL_PROPERTIES,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const createProperty = (property: IProperty) => {
    return async (dispatch: Dispatch<IAction<IProperty>>) => {
        try {
            const retProperty: IProperty = await api.createProperty(property);
            dispatch(addProperty(retProperty));
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_CREATE_PROPERTY,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const updateProperty = (property: IProperty) => {
    return async (dispatch: Dispatch<IAction<IProperty>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const retProperty: IProperty = await api.updateProperty(property);
            dispatch(modifyProperty(retProperty));
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_UPDATE_PROPERTY,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const deleteProperty = (property: IProperty) => {
    return async (dispatch: Dispatch<IAction<IProperty>>) => {
        try {
            dispatch(setWorkingOnIt(true));
            const retProperty: IProperty = await api.deleteProperty(property);
            dispatch(removeProperty(retProperty));
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_DELETE_PROPERTY,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};
const checkUserPermissions = (permissionKing: SP.PermissionKind) => {
    return async (dispatch: Dispatch<IAction<IProperty>>) => {
        try {
            const hasPermissions: boolean = await api.checkUserPermissions(permissionKing);
            if (hasPermissions) {
                dispatch(setUserHasPermissions(true));
                dispatch(getAllProperties());
            } else {
                dispatch(setWorkingOnIt(false));
                dispatch(setMessageData({
                    message: constants.MESSAGE_USER_NO_PERMISSIONS,
                    showMessage: true,
                    type: MessageBarType.error
                }));
            }
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            dispatch(setMessageData({
                message: constants.ERROR_MESSAGE_CHECK_USER_PERMISSIONS,
                showMessage: true,
                type: MessageBarType.error
            }));
        }
    };
};

const spPropertyBagActionsCreatorMap: ISpPropertyBagActionCreatorsMapObject = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    checkUserPermissions,
    setFavourite,
    setFilterText,
    setWorkingOnIt,
    setUserHasPermissions,
    setMessageData
};

export default spPropertyBagActionsCreatorMap;
