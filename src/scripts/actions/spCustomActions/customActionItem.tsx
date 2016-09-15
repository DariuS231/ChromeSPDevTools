/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { CustomActionItemStyles as styles } from './../common/Styles';
import { ViewMode } from './../common/enums';

import CustomActionDisplay  from './customActionDisplay';
import CustomActionEdit  from './customActionEdit';

interface CustomActionItemProps {
    item: ICustomAction,
    workingOnIt: any,
    showMessage: any,
    reloadCActions: any
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
            this.props.workingOnIt(true);
            let caGuid: SP.Guid = new SP.Guid(this.props.item.id.toString());
            let ctx: SP.ClientContext = SP.ClientContext.get_current();
            let web: SP.Web = ctx.get_web();

            let ca: SP.UserCustomAction = web.get_userCustomActions().getById(caGuid);
            ca.deleteObject();
            ctx.load(ca);
            let onSuccess: Function = Function.createDelegate(this, function (sender: any, err: any) {
                this.props.reloadCActions();
                this.props.workingOnIt(false);
            });
            let onError: Function = Function.createDelegate(this, function (a: any, b: any) {
                console.log("ERROR");
            });

            ctx.executeQueryAsync(onSuccess, onError);
        }
    }
    public render() {
        let isViewMode: boolean = this.state.mode === ViewMode.View;
        let item: any = isViewMode
            ? <CustomActionDisplay item={this.props.item} />
            : <CustomActionEdit item={this.props.item} changeModefunction={this.changeMode.bind(this) } workingOnIt={this.props.workingOnIt.bind(this)}  showMessage={this.props.showMessage.bind(this)} reloadCActions={this.props.reloadCActions.bind(this) }  />;
        return (
            <li style={styles.caListItem}>
                {item}
                {((isViewMode: boolean) => {
                    if (isViewMode) {
                        return <div>
                            <a href="javascript:void(0)" style={styles.updateBtnStyle} onClick={this.changeMode.bind(this) }></a>
                            <a href="javascript:void(0)" style={styles.deleteBtnStyle} onClick={this.deleteCustomAction.bind(this) }></a>
                        </div>
                    }
                })(isViewMode) }
            </li>);
    }
}
