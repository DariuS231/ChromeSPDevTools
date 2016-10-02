/// <reference path="../../../../typings/index.d.ts"/>

import * as ReactDOM from "react-dom";

export class AppBase {
    baseDivId: string;
    styleLinkId:string;
    constructor(divId:string) {
        this.baseDivId = divId;
        this.styleLinkId = 'spChromeDevToolStyles';

        let baseDiv: HTMLElement = document.getElementById(this.baseDivId);
        if (!baseDiv) {
            baseDiv = document.createElement('div');
            baseDiv.setAttribute('id', this.baseDivId)
            document.querySelector('form').appendChild(baseDiv);
        }

        let head = document.head || document.getElementsByTagName('head')[0];
        let style = document.createElement('link');

        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.id = this.styleLinkId;
        style.href = 'https://appsforoffice.microsoft.com/fabric/fabric-core/4.0.0/fabric.min.css';
        head.appendChild(style);
    }
    remove = (): void => {
        var style = document.getElementById(this.styleLinkId);
        style. parentElement.removeChild(style);
        ReactDOM.unmountComponentAtNode(document.getElementById(this.baseDivId));
    }
}