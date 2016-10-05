/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import Utils from './utils';

interface SpCustomModalWrapperProps {
    modalDialogTitle: string,
    modalWidth?: string,
    onCloseClick: any
}
interface SpCustomModalWrapperState { }

export default class SpCustomModalWrapper extends React.Component<SpCustomModalWrapperProps, SpCustomModalWrapperState> {
    constructor() {
        super();
        this.state = { isClosed: false };
    }
    private closeBtnClick(e: any) {
        this.props.onCloseClick();
    }
    public render() {

        return <div className="chrome-sp-dev-tool-wrapper">
            <div className="sp-dev-too-modal" style={(this.props.modalWidth !== undefined) ? { width: this.props.modalWidth } : {}}>
                <div className="sp-dev-tool-modal-header">
                    <span className="ms-font-xxl ms-fontColor-themePrimary ms-fontWeight-semibold">{this.props.modalDialogTitle}</span>
                    <a title="Close" className="ms-Button ms-Button--icon sp-dev-tool-close-btn" href="javascript:void(0)" onClick={this.closeBtnClick.bind(this) }>
                        <span className="ms-Button-icon">
                            <i className="ms-Icon ms-Icon--Cancel"></i>
                        </span>
                        <span className="ms-Button-label">
                        </span>
                    </a>
                    <hr/>
                </div>
                { this.props.children }
            </div>
        </div>;
    }
}