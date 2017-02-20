import * as ReactDOM from "react-dom";
import "./../styles/components.scss";
import { constants } from "./constants";

export class AppBase {
    protected baseDivId: string;
    protected styleLinkId: string;
    constructor(divId: string) {
        this.baseDivId = divId;
        this.styleLinkId = constants.STYLE_TAG_ID;
        this.remove = this.remove.bind(this);

        let baseDiv: HTMLElement = document.getElementById(this.baseDivId);
        if (!baseDiv) {
            baseDiv = document.createElement(constants.HTML_TAG_DIV);
            baseDiv.setAttribute(constants.HTML_ATTR_ID, this.baseDivId);
            let parentEl = document.querySelector(constants.HTML_TAG_FORM) as HTMLElement;
            if (!parentEl) { // There is no Form element on modern pages, so the content gets add to the body instead
                parentEl = document.querySelector(constants.HTML_TAG_BODY) as HTMLElement;
            }
            parentEl.appendChild(baseDiv);
        }

        const head = document.head || document.getElementsByTagName(constants.HTML_TAG_HEAD)[0];
        const style: HTMLLinkElement = document.createElement(constants.HTML_TAG_LINK) as HTMLLinkElement;
        // tslint:disable-next-line:max-line-length
        const cssUrl = constants.STYLE_TAG_URL;
        style.type = constants.STYLE_TAG_ATTR_TYPE;
        style.rel = constants.STYLE_TAG_ATTR_REL;
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
