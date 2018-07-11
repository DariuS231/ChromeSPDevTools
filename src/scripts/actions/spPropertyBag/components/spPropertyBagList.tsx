import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import { IProperty } from "../interfaces/spPropertyBagInterfaces";
import { constants } from "./../constants/constants";
import SpPropertyBagItem from "./spPropertyBagItem";

interface ISpPropertyBagListProps {
    items: IProperty[];
    filterString: string;
}
export const SpPropertyBagList:
    React.StatelessComponent<ISpPropertyBagListProps> = (props: ISpPropertyBagListProps) => {

        const filter: string = props.filterString.toLowerCase();
        const properties: IProperty[] = filter !== constants.EMPTY_STRING
            ? props.items.filter((prop: IProperty, index: number) => {
                return prop.key.toLowerCase().indexOf(filter) >= 0 || prop.value.toLowerCase().indexOf(filter) >= 0;
            }) : props.items;

        properties.sort((a, b) => {
            return (a.isFavourite === b.isFavourite)
                ? (a.key.toUpperCase() < b.key.toUpperCase() ? -1 : 1)
                : (a.isFavourite ? -1 : 1);
        });
        const renderListItem = (item: IProperty, index: number) => {
            return (<SpPropertyBagItem item={item} key={item.key} itemIndex={index} />);
        };
        return (<List items={properties} onRenderCell={renderListItem} />);
    };
