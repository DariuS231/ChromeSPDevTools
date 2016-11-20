/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import SpCustomActionItem from './customActionItem'
import { CustomActionType } from './../common/enums';
import {
    MessageBarType,
    List,
    Button,
    ButtonType
} from './../../../../node_modules/office-ui-fabric-react/lib/index';

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
