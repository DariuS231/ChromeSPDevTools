import * as React from 'react';
import SpCustomActionItem from './spCustomActionsItem'
import { CustomActionType } from './../constants/enums';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { List } from 'office-ui-fabric-react/lib/List';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ICustomAction } from './../../common/interfaces'

export const SpCustomActionList = (props: { customActions: Array<ICustomAction>, type: CustomActionType, filtertText: string }) => {
    const filter: string = props.filtertText.toLowerCase();
    const list: Array<ICustomAction> = filter !== '' ? props.customActions.filter((ca: ICustomAction, index: number) => {
        return ca.name.toLowerCase().indexOf(filter) >= 0;
    }) : props.customActions;
    
    return <List items={list} onRenderCell={(item, index) => (<SpCustomActionItem item={item} key={index} caType={props.type} /> )} />

}
