/// <reference path="../../../../typings/index.d.ts"/>

import * as ReactDOM from "react-dom";

export class AppBase {
    baseDivId: string;
    styleLinkId:string;
    constructor(divId:string) {
        this.baseDivId = divId;
        this.styleLinkId = 'spChromeDevToolStyles';
        this.remove = this.remove.bind(this);

        let baseDiv: HTMLElement = document.getElementById(this.baseDivId);
        if (!baseDiv) {
            baseDiv = document.createElement('div');
            baseDiv.setAttribute('id', this.baseDivId)
            let parentEl = document.querySelector('form') as HTMLElement;
            if(!parentEl){ //There is no Form element on modern pages, so the content gets add to the body instead
                parentEl = document.querySelector('body') as HTMLElement;
            }
            parentEl.appendChild(baseDiv);
        }

        let head = document.head || document.getElementsByTagName('head')[0];
        let style = document.createElement('link');

        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.id = this.styleLinkId;
        style.href = 'https://cdn.rawgit.com/DariuS231/ChromeSPDevTools/b45f0470f67fa29bfe1ae45e8faa0e04837c175c/dist/actions/styles/bundle.css';
        head.appendChild(style);
    }
    remove = (): void => {
        var style = document.getElementById(this.styleLinkId);
        style. parentElement.removeChild(style);
        ReactDOM.unmountComponentAtNode(document.getElementById(this.baseDivId));
    }
}