/// <reference path="../../../../typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModal from './../common/spCustomModal';
import SpPropertyBag from './spPropertyBag.tsx'

let baseDivId:string = 'spPropBaseDiv';
let baseDiv:HTMLElement = document.getElementById(baseDivId);
if(!baseDiv){
    baseDiv = document.createElement('div');
    baseDiv.setAttribute('id',baseDivId)
    document.querySelector('form').appendChild(baseDiv);
}

ReactDOM.render(<SpCustomModal componentChild={SpPropertyBag} />, document.getElementById(baseDivId));