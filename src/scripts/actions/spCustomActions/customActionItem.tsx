/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { CustomActionItemStyles as styles } from './../common/Styles';
import { ViewMode } from './../common/enums';

import CustomActionDisplay  from './customActionDisplay';
import CustomActionEdit  from './customActionEdit';

interface CustomActionItemProps {
    item: ICustomAction
}
interface CustomActionItemState {
    mode: ViewMode
}

export default class CustomActionItem extends React.Component<CustomActionItemProps, CustomActionItemState> {
    constructor() {
        super();
        this.state = { mode: ViewMode.View };
    }
    private changeMode(e: any) {
        this.setState({ mode: (this.state.mode === ViewMode.View ? ViewMode.Edit : ViewMode.View) })
    }
    private deleteCustomAction(e: any) {
        if (confirm("Are you sure you want to remove this Custom Action?")) {
            let caGuid: SP.Guid = new SP.Guid(this.props.item.id);
            let ctx: SP.ClientContext = SP.ClientContext.get_current();
            let web: SP.Web = ctx.get_web();

            let ca: SP.UserCustomAction = web.get_userCustomActions().getById(caGuid);
            ca.deleteObject();
            ctx.load(ca);
            ctx.executeQueryAsync(function (a: any, b: any) {
                console.log("Deleted");
            }, function (a: any, b: any) {
                console.log("ERROR");
            });
        }
    }
    public render() {

        let item: any;
        let btnText: string;
        if (this.state.mode === ViewMode.View) {
            item = (<CustomActionDisplay item={this.props.item} />);
            btnText = "Edit";
        } else {
            item = (<CustomActionEdit item={this.props.item} />);
            btnText = "Save";
        }
        return (
            <li style={{ position: 'relative' }}>
                {item}
                <a href="javascript:void(0)" style={{ position: 'absolute', top: '5px', right: '15px' }} onClick={this.changeMode.bind(this) }>{btnText}</a>
                <a href="javascript:void(0)" style={{ position: 'absolute', top: '35px', right: '15px' }} onClick={this.deleteCustomAction.bind(this) }>Delete</a>
            </li>);
    }
}
