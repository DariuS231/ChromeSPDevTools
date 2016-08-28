/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/spCustomModalWrapper';
import SpCustomActions from './spCustomActions.tsx'

class App {
    baseDivId: string = 'spCuastomActionsBaseDiv';
    constructor() {

        let baseDiv: HTMLElement = document.getElementById(this.baseDivId);
        if (!baseDiv) {
            baseDiv = document.createElement('div');
            baseDiv.setAttribute('id', this.baseDivId)
            document.querySelector('form').appendChild(baseDiv);
        }
    }
    remove(containerId:string) {
        ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
    }
    public show(showOnlyIconsInButtons: boolean) {
        let that = this;
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            ReactDOM.render(<SpCustomModalWrapper appContainerId={that.baseDivId} onCloseClick={that.remove.bind(this) } modalDialogTitle="Web Custom Actions" modalWidth="700px">
                <SpCustomActions />
            </SpCustomModalWrapper>, document.getElementById(that.baseDivId));
        });
    }
}

window.SpCustomActionsObj = new App();
window.SpCustomActionsObj.show(true);