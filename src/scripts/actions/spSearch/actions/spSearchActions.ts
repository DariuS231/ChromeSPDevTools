import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from "redux";
import SpSearchApi from "../api/spSearchApi";
import { IAction, IMessageData } from "./../../common/interfaces";
import { ActionsId as actions, constants } from "./../constants/constants";


const api = new SpSearchApi();

const spSearchActionsCreatorMap: any = {
};

export default spSearchActionsCreatorMap;
