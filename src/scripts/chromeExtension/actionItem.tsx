import * as React from "react";

interface IActionItemProps {
    item: any;
}

const ActionItem: React.StatelessComponent<IActionItemProps> = (props: IActionItemProps) => {
    const onItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const codeStr = `
            (function(cdnUrl) {
                var script = HTMLScriptElement = document.createElement("script");
                script.src = cdnUrl;
                (document.head || document.documentElement).appendChild(script);
                script.parentNode.removeChild
            })("` + props.item.scriptUrl + `");`;
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
