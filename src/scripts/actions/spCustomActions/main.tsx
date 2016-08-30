/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory, withRouter, IndexRedirect } from 'react-router'
import App from './app'

class Main {
    baseDivId: string = 'spCuastomActionsBaseDiv';
    constructor() {
        let baseDiv: HTMLElement = document.getElementById(this.baseDivId);
        if (!baseDiv) {
            baseDiv = document.createElement('div');
            baseDiv.setAttribute('id', this.baseDivId)
            document.querySelector('form').appendChild(baseDiv);
        }
    }

    public show() {
        let that = this;
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            ReactDOM.render(
                <Router history={browserHistory}>
                    <Route path="*" component={App}>
                    </Route>
                </Router>
            , document.getElementById(that.baseDivId));
        });
    }
}

window.SpCustomActionsObj = new Main();
window.SpCustomActionsObj.show();