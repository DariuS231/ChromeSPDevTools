import { PropertyActionID as actions } from './../constants/spPropertyBagActionsIDs'

export default class spPropertyBagActions {

    public static createProperty(property: IKeyValue) {
        return {
            type: actions.CREATE_PROPERTY,
            property
        }
    }
    public static updateProperty(property: IKeyValue) {
        return {
            type: actions.UPDATE_PROPERTY,
            property
        }
    }
    public static deleteProperty(property: IKeyValue) {
        return {
            type: actions.DELETE_PROPERTY,
            property
        }
    }
}