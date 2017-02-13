import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { hashHistory, IndexRoute, Redirect, Route, Router } from "react-router";
import { AppBase } from "./../common/AppBase";
import SpCustomModalWrapper from "./../common/components/spCustomModalWrapper";
import Utils from "./../common/utils";
import SpCustomActions from "./components/spCustomActions";
import SpCustomActionItemEdit from "./components/spCustomActionsItemEdit";
import { CustomActionType } from "./constants/enums";
import { configureStore } from "./store/configureStore-dev";

export class App extends AppBase {
    private _componentsDivId: string;
    private _customActionType: CustomActionType;

    constructor(modalDialogName: string, componentsDivId: string, customActionType: CustomActionType) {
        super(modalDialogName);

        this._componentsDivId = componentsDivId;
        this._customActionType = customActionType;

        this.onCloseWrapperClick = this.onCloseWrapperClick.bind(this);
    }

    public onCloseWrapperClick() {
        hashHistory.push("/");
        this.remove();
    }
    public show() {
        const that = this;
        Utils.ensureSPObject().then(() => {
            const store = configureStore(this._customActionType);

            const wrapper: React.StatelessComponent<{ children?: any }> = (props: { children?: any }) => {
                return <SpCustomModalWrapper
                    onCloseClick={this.onCloseWrapperClick}
                    modalDialogTitle={this.baseDivId}
                ><div className="action-container sp-customActions">
                        {props.children}
                    </div>
                </SpCustomModalWrapper>;
            };

            ReactDOM.render(<Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={wrapper} >
                        <IndexRoute component={SpCustomActions} />
                        <Route path="newItem/:type" component={SpCustomActionItemEdit} />
                        <Route path="item/:guid" component={SpCustomActionItemEdit} />
                    </Route>
                    <Redirect from="*" to="/" />
                </Router>
            </Provider>, document.getElementById(that.baseDivId));
        });
    }
}
