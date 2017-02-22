import * as React from "react";
import { constants } from "../actions/common/constants";

interface IActionItemProps {
    item: any;
    stylesUrl: string;
}

const ActionItem: React.StatelessComponent<IActionItemProps> = (props: IActionItemProps) => {
    const onItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const codeStr = `
            (function(cdnUrl, stylesUrl) {
                var head = document.head || document.getElementsByTagName("${constants.HTML_TAG_HEAD}")[0];
                var style = document.createElement("${constants.HTML_TAG_LINK}");
                style.type = "${constants.STYLE_TAG_ATTR_TYPE}";
                style.rel = "${constants.STYLE_TAG_ATTR_REL}";
                style.id = "${constants.STYLE_TAG_ID}";
                style.href = stylesUrl;
                head.appendChild(style);

                var script = document.createElement("${constants.HTML_TAG_SCRIPT}");
                script.src = cdnUrl;
                (document.head || document.documentElement).appendChild(script);
                script.parentNode.removeChild
            })("${props.item.scriptUrl}", "${props.stylesUrl}");`;
        chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
            chrome.tabs.executeScript(tab[0].id, {
                code: codeStr
            }, () => {
                window.close();
            });
        });

        return false;
    };
    return <button className="ms-Button ms-Button--compound action-btn" onClick={onItemClick}>
        <img src={props.item.image} />
        <div>
            <span className="ms-font-l ms-fontColor-themePrimary ms-fontWeight-regular">{props.item.title}</span>
            <span className="ms-Button-description">{props.item.description}</span>
        </div>
    </button>;
};

export default ActionItem;
