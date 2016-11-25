/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import SpCustomActionItem from './customActionItem'
import { CustomActionType } from './../common/enums';

import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { List } from 'office-ui-fabric-react/lib/List';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';

export const SpCustomActionList = (props: { customActions: Array<ICustomAction>, reloadCActions: any, showMessage: any, workingOnIt: any, type:CustomActionType }) =>
    
        <List items={props.customActions}
            onRenderCell={(item, index) => (
                <SpCustomActionItem
                    item={item}
                    key={index}
                    workingOnIt={props.workingOnIt}
                    showMessage={props.showMessage}
                    reloadCActions={props.reloadCActions}
                    caType={props.type} />
            )} />;
