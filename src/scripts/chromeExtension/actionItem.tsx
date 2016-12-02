/// <reference path="../../../typings/index.d.ts"/>

import * as React from 'react';

interface ActionItemProps {
    item: any
}
interface ActionItemState {

}

export default class ActionItem extends React.Component<ActionItemProps, ActionItemState> {

    private onItemClick(e: any) {
        e.preventDefault();

        let codeStr = `
            (function(cdnUrl) {
                var script = HTMLScriptElement = document.createElement('script');
                script.src = cdnUrl;
                (document.head || document.documentElement).appendChild(script);
                script.parentNode.removeChild
            })('` + this.props.item.scriptUrl + `');`;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
            chrome.tabs.executeScript(tab[0].id, {
                code: codeStr
            }, function () {
                window.close();
            });
        });

        return false;
    }

    public render() {
        let item: any = this.props.item;

        return <button className="ms-Button ms-Button--compound action-btn" onClick={this.onItemClick.bind(this) }>
            <img src={item.image} />
            <div>
                <span className="ms-font-l ms-fontColor-themePrimary ms-fontWeight-regular">{this.props.item.title}</span>
                <span className="ms-Button-description">{this.props.item.description}</span>
            </div>
        </button>;
    }
}