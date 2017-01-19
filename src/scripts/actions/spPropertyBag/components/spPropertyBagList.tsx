import * as React from 'react';
import { List } from 'office-ui-fabric-react/lib/List';
import SpPropertyBagItem from './SpPropertyBagItem';
import { IProperty } from '../interfaces/spPropertyBagInterfaces'

interface SpPropertyBagListProps {
    items: IProperty[],
    filterString: string
}
export const SpPropertyBagList: React.StatelessComponent<SpPropertyBagListProps> = (props: SpPropertyBagListProps) => {

    const filter: string = props.filterString.toLowerCase();
    const properties: Array<IProperty> = filter !== '' ? props.items.filter((prop: IProperty, index: number) => {
        return prop.key.toLowerCase().indexOf(filter) >= 0 || prop.value.toLowerCase().indexOf(filter) >= 0;
    }) : props.items;

    properties.sort(function (a, b) {
        return a.key.localeCompare(b.key);
    });
    return (<List items={properties} onRenderCell={(item: IProperty, index: number) => {
        return (<SpPropertyBagItem
            item={item}
            key={item.key}
            itemIndex={index} />)
    }} />)
};

