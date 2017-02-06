import * as ReactDOM from "react-dom";

import "./../styles/components.scss";

export class AppBase {
    protected baseDivId: string;
    protected styleLinkId: string;
    constructor(divId: string) {
        this.baseDivId = divId;
        this.styleLinkId = "spChromeDevToolStyles";
        this.remove = this.remove.bind(this);

        let baseDiv: HTMLElement = document.getElementById(this.baseDivId);
        if (!baseDiv) {
            baseDiv = document.createElement("div");
            baseDiv.setAttribute("id", this.baseDivId);
            let parentEl = document.querySelector("form") as HTMLElement;
            if (!parentEl) { // There is no Form element on modern pages, so the content gets add to the body instead
                parentEl = document.querySelector("body") as HTMLElement;
            }
            parentEl.appendChild(baseDiv);
        }

        const head = document.head || document.getElementsByTagName("head")[0];
        const style = document.createElement("link");
        // tslint:disable-next-line:max-line-length
        const cssUrl = "https://cdn.rawgit.com/DariuS231/ChromeSPDevTools/92a48bd7dff4e8696ecf9e1a6321eae4556ac88a/dist/actions/styles/bundle.css";
        style.type = "text/css";
        style.rel = "stylesheet";
        style.id = this.styleLinkId;
        style.href = cssUrl;
        head.appendChild(style);
    }
    protected remove = (): void => {
        const style = document.getElementById(this.styleLinkId);
        style.parentElement.removeChild(style);
        ReactDOM.unmountComponentAtNode(document.getElementById(this.baseDivId));
    }
}
