/// <reference path="../../../typings/index.d.ts"/>

import * as React from 'react';
import ActionItem from './ActionItem'
import { List } from 'office-ui-fabric-react/lib/List';

interface IActionData {
    title: string,
    descriptio: string,
    image: string,
    scriptUrl: string
};

interface PopUpProps {

}
interface PopUpState {
    actions: Array<IActionData>
}

export default class PopUp extends React.Component<PopUpProps, PopUpState> {
    constructor() {
        super();
        this.state = {
            actions: []
        };
    }
    public getActions() {
        let that: any = this;
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data/actions.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status === 200) {
                var data = JSON.parse(xobj.responseText);
                that.setState({ actions: data });
            }
        };
        xobj.send(null);

    }
    private componentDidMount() {
        this.getActions();
    }
    public render() {
        return <div className="container">
            <span className="ms-font-xxl ms-fontColor-themePrimary ms-fontWeight-semibold">Chrome SP Dev Tools</span>
            <hr/>
            <List items={ this.state.actions } onRenderCell={ (item, index) => (<ActionItem item={item} />) }/>
        </div>
    }
}