import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/components/spCustomModalWrapper';
import { AppBase } from './../common/AppBase';
import Utils from './../common/utils';
import SpPropertyBag from './components/spPropertyBag'
import { Provider } from 'react-redux';
import { constants } from './constants/constants'
import { configureStore } from './store/configureStore-prod'


class App extends AppBase {
    constructor() {
        super(constants.COMPONENT_DIV_ID)
    }
    public show() {
        let that = this;
        Utils.ensureSPObject().then(() => {
            const store = configureStore({});
            ReactDOM.render(
                <Provider store={store}>
                    <SpCustomModalWrapper onCloseClick={that.remove} modalDialogTitle={constants.MODAL_DIALOG_TITLE} modalWidth={constants.MODAL_DIALOG_WIDTH}>
                        <SpPropertyBag closeWindowFunction={that.remove} />
                    </SpCustomModalWrapper>
                </Provider>, document.getElementById(that.baseDivId)
            );
        });
    }
}

window.SpPropertyBagObj = new App();
window.SpPropertyBagObj.show();