/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/spCustomModalWrapper';
import {AppBase} from './../common/AppBase';
import SpSiteContent from './spSiteContent.tsx'

class App extends AppBase {
    constructor() {
       super('spPropBaseDiv');
    }
    public show() {
        let that = this;
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            ReactDOM.render(<SpCustomModalWrapper  onCloseClick={that.remove.bind(this) } modalDialogTitle="Lists and Libraries" modalWidth="700px">
                <SpSiteContent  closeWindowFunction={that.remove.bind(this) } />
            </SpCustomModalWrapper>, document.getElementById(that.baseDivId));
        });
    }
}

window.SpSiteContentObj = new App();
window.SpSiteContentObj.show();