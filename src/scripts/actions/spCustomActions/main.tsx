/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/spCustomModalWrapper';
import {AppBase} from './../common/AppBase';
import SpCustomActions from './spCustomActions.tsx'

class App extends AppBase {
    constructor() {
       super('spCuastomActionsBaseDiv')
    }

    public show() {
        let that = this;
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            ReactDOM.render(<SpCustomModalWrapper onCloseClick={that.remove.bind(this) } modalDialogTitle="Web Custom Actions" modalWidth="700px">
                <SpCustomActions closeWindowFunction={that.remove.bind(this) } />
            </SpCustomModalWrapper>, document.getElementById(that.baseDivId));
        });
    }
}

window.SpCustomActionsObj = new App();
window.SpCustomActionsObj.show();