import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IInitialState } from "../interfaces/spSearchInterfaces";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";

const initialState: IInitialState = {
};

export const spFeaturesReducer = (state: IInitialState = initialState, action: IAction<any>): IInitialState => {

    switch (action.type) {
        default:
            return state;
    }

};
