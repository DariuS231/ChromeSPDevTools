import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/components/spCustomModalWrapper';
import SpCustomActionItem from './components/spCustomActionsItem'
import { AppBase } from './../common/AppBase';
import Utils from './../common/utils';
import SpCustomActions from './components/spCustomActions'
import { Provider } from 'react-redux';
import { constants } from './constants/constants'
import { configureStore } from './store/configureStore-dev'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'


class App extends AppBase {
    constructor() {
        super(constants.COMPONENT_WEB_CA_DIV_ID)
    }
    public show() {
        let that = this;
        Utils.ensureSPObject().then(() => {
            const store = configureStore({});

            const wrapper: React.StatelessComponent<{ children?: any }> = (props: { children?: any }) => {
                return <SpCustomModalWrapper onCloseClick={this.remove} modalDialogTitle={constants.MODAL_WEB_CA_DIALOG_TITLE}>
                    <div className="action-container sp-customActions">
                        {props.children} 
                    </div>
                </SpCustomModalWrapper>
            }

            ReactDOM.render(<Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={wrapper} >
                        <IndexRoute component={SpCustomActions} />
                        <Route path="item" component={SpCustomActionItem} />
                        <Route path="item/:guid" component={SpCustomActionItem} />
                    </Route>
                </Router>
            </Provider>, document.getElementById(that.baseDivId));
        });
    }
}

window.SpCustomActionsObj = new App();
window.SpCustomActionsObj.show();