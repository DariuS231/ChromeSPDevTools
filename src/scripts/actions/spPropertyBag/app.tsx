/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/spCustomModalWrapper';
import { AppBase } from './../common/AppBase';
import Utils from './../common/utils';
import SpPropertyBag from './components/spPropertyBag'
import { Provider } from 'react-redux';
//import { configureStore } from './store/configureStore-dev'
import { configureStore } from './store/configureStore-prod'


class App extends AppBase {
    constructor() {
        super('spPropBaseDiv')
    }
    public show() {
        let that = this;
        Utils.ensureSPObject().then(() => {
            const store = configureStore({});
            ReactDOM.render(
                <Provider store={store}>
                    <SpCustomModalWrapper onCloseClick={that.remove} modalDialogTitle="Web Property bags" modalWidth="700px">
                        <SpPropertyBag closeWindowFunction={that.remove} />
                    </SpCustomModalWrapper>
                </Provider>, document.getElementById(that.baseDivId)
            );
        });
    }
}

window.SpPropertyBagObj = new App();
window.SpPropertyBagObj.show();