/// <reference path="../../../../../typings/index.d.ts"/>
/// <reference path="./../../common/interfaces.ts"/>
/// <reference path="./../../common/enums.ts"/>
import * as React from 'react';
import { StatelessComponent } from 'react';
import { List } from 'office-ui-fabric-react/lib/List';
import KeyValueItem from './SpPropertyBagItem';
import { IProperty } from '../interfaces/spPropertyBagInterfaces'

interface SpPropertyBagListProps {
    items: IProperty[]
}
export const SpPropertyBagList: React.StatelessComponent<SpPropertyBagListProps> = (props: SpPropertyBagListProps) => {
    const onUpdateClick = () =>{
        
    }
    const onDeleteClick = () =>{
        
    }
    const rendeItem = (item: IProperty, index: number) =>{
        return (<KeyValueItem
                        item={item}
                        key={item.key}
                        itemIndex={index}
                        onUpdateClick={onUpdateClick}
                        onDeleteClick={onDeleteClick} />)
    }
    return (<List items={props.items} onRenderCell={rendeItem} />)
};

