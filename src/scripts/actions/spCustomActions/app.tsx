/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/spCustomModalWrapper';
import SpCustomActions from './spCustomActions.tsx'

export default class App extends React.Component<{}, {}> {
    baseDivId: string = 'spCuastomActionsBaseDiv';
    constructor() {
        super();
    }
    remove(containerId: string) {
        ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
    }
    render() {
        return <SpCustomModalWrapper appContainerId={this.baseDivId} onCloseClick={this.remove.bind(this) } modalDialogTitle="Web Custom Actions" modalWidth="700px">
            <SpCustomActions  appContainerId={this.baseDivId} closeWindowFunction={this.remove.bind(this) } />
        </SpCustomModalWrapper>;
    }
}
