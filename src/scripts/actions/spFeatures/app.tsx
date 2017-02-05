import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/components/spCustomModalWrapper';
import { AppBase } from './../common/AppBase';
import Utils from './../common/utils';
import SpFeatures from './components/SpFeatures'
import { Provider } from 'react-redux';
import { constants } from './constants/constants'
import { configureStore } from './store/configureStore-dev'


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
                        <SpFeatures />
                    </SpCustomModalWrapper>
                </Provider>, document.getElementById(that.baseDivId)
            );
        });
    }
}

window.SpFeaturesObj = new App();
window.SpFeaturesObj.show();