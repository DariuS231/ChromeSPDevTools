/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/spCustomModalWrapper';
import { AppBase } from './../common/AppBase';
import { CustomActionType } from './../common/enums';
import SpCustomActions from './components/spCustomActions';
import Utils from './../common/utils';

class App extends AppBase {
    constructor() {
        super('spCuastomActionsBaseDiv')
    }

    public show() {
        let that = this;
        Utils.ensureSPObject().then(() => {
            ReactDOM.render(<SpCustomModalWrapper onCloseClick={that.remove} modalDialogTitle="Site Custom Actions" modalWidth="700px">
                <SpCustomActions closeWindowFunction={that.remove} customActionType={CustomActionType.Site} />
            </SpCustomModalWrapper>, document.getElementById(that.baseDivId));
        });
    }
}

window.SpCustomActionsObj = new App();
window.SpCustomActionsObj.show();