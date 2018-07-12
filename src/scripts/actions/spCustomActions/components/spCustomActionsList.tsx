import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import { ICustomAction } from "../interfaces/spCustomActionsInterfaces";
import { CustomActionType } from "./../constants/enums";
import SpCustomActionItem from "./spCustomActionsItem";

interface ISpCustomActionList {
    customActions: ICustomAction[];
    caType: CustomActionType;
    filterText: string;
    deleteCustomAction: (ca: ICustomAction, caType: CustomActionType) => void;
}
export const SpCustomActionList: React.StatelessComponent<ISpCustomActionList> = (props: ISpCustomActionList) => {
    const filter: string = props.filterText.toLowerCase();
    const renderListItem = (item: ICustomAction, index: number): JSX.Element => {
        return (
            <SpCustomActionItem item={item} key={index} caType={props.caType}
                deleteCustomAction={props.deleteCustomAction} />);
    };
    const list: ICustomAction[] = filter !== "" ? props.customActions.filter((ca: ICustomAction, index: number) => {
        return ca.name.toLowerCase().indexOf(filter) >= 0;
    }) : props.customActions;

    list.sort((a: ICustomAction, b: ICustomAction) => {
        return a.sequence - b.sequence;
    });
    return (<List items={list} onRenderCell={renderListItem} />);
};
