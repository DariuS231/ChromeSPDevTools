import * as React from 'react';
import SpCustomActionItem from './customActionItem'
import { CustomActionType } from './../constants/enums';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { List } from 'office-ui-fabric-react/lib/List';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ICustomAction } from './../../common/interfaces'

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
