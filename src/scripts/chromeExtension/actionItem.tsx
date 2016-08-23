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
        chrome.tabs.query({ active: true }, function (tab) {
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

        return <a href="javascript:void(0)" className="list-group-item sp-admin-option" onClick={this.onItemClick.bind(this) }>
            <div className="sp-admin-option-image">
                <img alt="Brand" src={item.image}/>
            </div>
            <div className="sp-admin-option-title">
                {item.title}
            </div>
        </a>;
    }
}