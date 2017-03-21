import * as React from "react";
import { constants } from "../constants";
import Utils from "../utils";

interface ISpCustomModalWrapperProps {
    modalDialogTitle: string;
    modalWidth?: string;
    onCloseClick: any;
}
export default class SpCustomModalWrapper extends React.Component<ISpCustomModalWrapperProps, {}> {
    constructor() {
        super();
        this.state = { isClosed: false };
        this.closeBtnClick = this.closeBtnClick.bind(this);
    }
    public render() {
        return <div className="chrome-sp-dev-tool-wrapper">
            <div
                className="sp-dev-too-modal"
                style={(this.props.modalWidth !== undefined) ? { width: this.props.modalWidth } : {}}
            >
                <div className="sp-dev-tool-modal-header">
                    <span
                        className="ms-font-xxl ms-fontColor-themePrimary ms-fontWeight-semibold"
                    >{this.props.modalDialogTitle}
                    </span>
                    <a
                        title={constants.MODAL_WRAPPER_CLOSE_BUTTON_TEXT}
                        className="ms-Button ms-Button--icon sp-dev-tool-close-btn"
                        href={constants.MODAL_WRAPPER_CLOSE_BUTTON_HREF}
                        onClick={this.closeBtnClick}
                    >
                        <span className="ms-Button-icon">
                            <i className="ms-Icon ms-Icon--Cancel" />
                        </span>
                        <span className="ms-Button-label" />
                    </a>
                    <hr />
                </div>
                {this.props.children}
            </div>
        </div>;
    }

    private closeBtnClick(e: any) {
        this.props.onCloseClick();
    }
}
