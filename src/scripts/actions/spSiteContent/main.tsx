/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/spCustomModalWrapper';
import SpSiteContent from './spSiteContent.tsx'

function render() {
    let baseDivId: string = 'spSiteContentDiv';
    let baseDiv: HTMLElement = document.getElementById(baseDivId);
    if (!baseDiv) {
        baseDiv = document.createElement('div');
        baseDiv.setAttribute('id', baseDivId)
        document.querySelector('form').appendChild(baseDiv);
    }

    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        ReactDOM.render(<SpCustomModalWrapper modalDialogTitle="All Site Content" modalWidth="700px"><SpSiteContent/></SpCustomModalWrapper>, document.getElementById(baseDivId));
    });
}

render();