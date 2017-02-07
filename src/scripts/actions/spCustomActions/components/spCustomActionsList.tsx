import * as React from "react";
import SpCustomActionItem from "./spCustomActionsItem"
import { CustomActionType } from "./../constants/enums";
import { List } from "office-ui-fabric-react/lib/List";
import { ICustomAction } from "../interfaces/spCustomActionsInterfaces";

interface ISpCustomActionList {
    customActions: ICustomAction[],
    caType: CustomActionType,
    filtertText: string,
    deleteCustomAction: (ca: ICustomAction, caType: CustomActionType) => void
}
export const SpCustomActionList: React.StatelessComponent<ISpCustomActionList> = (props: ISpCustomActionList) => {
    const filter: string = props.filtertText.toLowerCase();
    const list: ICustomAction[] = filter !== "" ? props.customActions.filter((ca: ICustomAction, index: number) => {
        return ca.name.toLowerCase().indexOf(filter) >= 0;
    }) : props.customActions;

    list.sort(function (a, b) {
        return a.sequence - b.sequence;
    });
    return (<List items={list} onRenderCell={(item: ICustomAction, index: number) => {
        return (<SpCustomActionItem item={item} key={index} caType={props.caType} deleteCustomAction={props.deleteCustomAction} />)
    } } />)

}
