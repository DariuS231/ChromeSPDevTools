/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/spCustomModalWrapper';
import {AppBase} from './../common/AppBase';
import SpPropertyBag from './spPropertyBag.tsx'

class App extends AppBase {
    constructor() {
       super('spPropBaseDiv')
    }
    public show(showOnlyIconsInButtons: boolean) {
        let that = this;
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            ReactDOM.render(<SpCustomModalWrapper onCloseClick={that.remove.bind(this) } modalDialogTitle="Web Property bags" modalWidth="700px">
                <SpPropertyBag showOnlyIconsInButtons={showOnlyIconsInButtons} closeWindowFunction={that.remove.bind(this) } />
            </SpCustomModalWrapper>, document.getElementById(that.baseDivId));
        });
    }
}

window.SpPropertyBagObj = new App();
window.SpPropertyBagObj.show(true);