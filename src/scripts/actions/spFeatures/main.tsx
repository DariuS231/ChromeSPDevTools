/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/spCustomModalWrapper';
import SpFeatures from './SpFeatures.tsx'

class App {
    baseDivId: string = 'spPropBaseDiv';
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
            ReactDOM.render(<SpCustomModalWrapper appContainerId={that.baseDivId} onCloseClick={that.remove.bind(this) } modalDialogTitle="Feature Administration Panel" modalWidth="800px">
                <SpFeatures showOnlyIconsInButtons={showOnlyIconsInButtons} appContainerId={that.baseDivId} closeWindowFunction={that.remove.bind(this) } />
            </SpCustomModalWrapper>, document.getElementById(that.baseDivId));
        });
    }
}

window.SpPropertyBagObj = new App();
window.SpPropertyBagObj.show(true);