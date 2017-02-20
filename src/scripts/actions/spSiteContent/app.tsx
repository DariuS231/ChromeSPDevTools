import * as React from "react";
import { render } from "react-dom";
import SpCustomModalWrapper from './../common/components/spCustomModalWrapper';
import { AppBase } from './../common/AppBase';
import SpSiteContent from './components/spSiteContent';
import Utils from './../common/utils';

class App extends AppBase {
    constructor() {
        super('spPropBaseDiv');
    }
    public show() {
        let that = this;
        Utils.ensureSPObject().then(() => {
            render(<SpCustomModalWrapper onCloseClick={that.remove.bind(this)} modalDialogTitle="Lists and Libraries" modalWidth="700px">
                <SpSiteContent />
            </SpCustomModalWrapper>, document.getElementById(that.baseDivId));
        });
    }
}
window.SpSiteContentObj = new App();
window.SpSiteContentObj.show();