// tslint:disable-next-line:no-reference
/// <reference path="../../../../typings/index.d.ts" />
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { AppBase } from "./../common/AppBase";
import SpCustomModalWrapper from "./../common/components/spCustomModalWrapper";
import Utils from "./../common/utils"; import SpSiteContent from "./components/spSiteContent";
import { configureStore } from "./store/configureStore-dev";

class App extends AppBase {
    constructor() {
        super("spPropBaseDiv");
    }
    public show() {
        const that = this;
        Utils.ensureSPObject().then(() => {
            const store = configureStore({});
            render(
                <Provider store={store}>
                    <SpCustomModalWrapper onCloseClick={that.remove}
                        modalDialogTitle="Lists and Libraries" modalWidth="700px" >
                        <SpSiteContent />
                    </SpCustomModalWrapper>
                </Provider>, document.getElementById(that.baseDivId));
        });
    }
}
window.SpSiteContentObj = new App();
window.SpSiteContentObj.show();
