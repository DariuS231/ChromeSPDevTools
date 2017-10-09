import * as ReactDOM from "react-dom";
import { constants } from "./constants";

import "./../styles/components.scss";

export class AppBase {
    protected baseDivId: string;
    constructor(divId: string) {
        this.baseDivId = divId;

        let baseDiv: HTMLElement = document.getElementById(this.baseDivId);
        if (!baseDiv) {
            baseDiv = document.createElement(constants.HTML_TAG_DIV);
            baseDiv.setAttribute(constants.HTML_ATTR_ID, this.baseDivId);
            let parentEl = document.querySelector(constants.HTML_TAG_BODY) as HTMLElement;
            parentEl.appendChild(baseDiv);
        }
    }
    protected remove = (): void => {
        const style = document.getElementById(constants.STYLE_TAG_ID);
        style.parentElement.removeChild(style);
        ReactDOM.unmountComponentAtNode(document.getElementById(this.baseDivId));
    }
}
