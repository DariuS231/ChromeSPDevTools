import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IInitialState } from "../interfaces/spCustomActionsInterfaces";
import { IMessageData } from "./../../common/interfaces";
import { constants } from "./../constants/constants";
import { CustomActionType } from "./../constants/enums";

export const initialState: IInitialState = {
    customActionType: CustomActionType.Web,
    customActions: [],
    filterText: constants.EMPTY_STRING,
    isWorkingOnIt: true,
    messageData: {
        message: constants.EMPTY_STRING,
        showMessage: false,
        type: MessageBarType.info
    },
    userHasPermission: false
};
