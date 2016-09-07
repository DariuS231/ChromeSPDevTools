/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { CustomActionItemStyles as styles } from './../common/Styles';
import { ViewMode } from './../common/enums';

import CustomActionDisplay  from './customActionDisplay';

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
    public render() {

        let item: any;
        let btnText:string;
        if (this.state.mode === ViewMode.View) {
            item = (<CustomActionDisplay item={this.props.item} />);
            btnText = "Edit";
        } else {
            item = (<CustomActionDisplay item={this.props.item} />);
            btnText = "Save";
        }
        return (
            <li style={{ position: 'relative' }}>
                {item}
                <a href="javascript:void(0)" style={{ position: 'absolute', top: '5px', right: '15px' }} onClick={this.changeMode.bind(this) }>{btnText}</a>
            </li>);
    }
}
