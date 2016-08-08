/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/spCustomModalWrapper';
import SpPropertyBag from './spPropertyBag.tsx'

function render() {
    let baseDivId: string = 'spPropBaseDiv';
    let baseDiv: HTMLElement = document.getElementById(baseDivId);
    if (!baseDiv) {
        baseDiv = document.createElement('div');
        baseDiv.setAttribute('id', baseDivId)
        document.querySelector('form').appendChild(baseDiv);
    }

    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        ReactDOM.render(<SpCustomModalWrapper modalDialogTitle="Web Property Administration Panel"><SpPropertyBag/></SpCustomModalWrapper>, document.getElementById(baseDivId));
    });
}

render();