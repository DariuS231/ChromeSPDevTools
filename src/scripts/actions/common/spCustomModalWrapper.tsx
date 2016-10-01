/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import Utils from './utils';
import { SpCustomModalWrapperStyles as styles } from './Styles'

interface SpCustomModalWrapperProps {
    modalDialogTitle: string,
    modalWidth?: string,
    onCloseClick:any
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
        let divModalStyles = (this.props.modalWidth !== undefined) ? Utils.mergeObjects(styles.divModalStyles, { width: this.props.modalWidth }) : styles.divModalStyles;
        return <div style={styles.modalContainerDivStyles}>
         <div style={divModalStyles}>
                <div>
                    <span className="chrome-dev-tool-ms-font-xxl chrome-dev-tool-ms-fontColor-themePrimary chrome-dev-tool-ms-fontWeight-semibold">{this.props.modalDialogTitle}</span>
                    <a href="javascript:void(0)" style={styles.linkBtnStyles} onClick={this.closeBtnClick.bind(this) }>x</a>
                    <hr style={{ marginBottom: 0 }}/>
                </div>
                { this.props.children }
            </div>
        </div>;
    }
}