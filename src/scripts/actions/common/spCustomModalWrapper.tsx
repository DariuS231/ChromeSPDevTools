/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import Utils from './utils';
import { SpCustomModalWrapperStyles as styles } from './Styles'

interface SpCustomModalWrapperProps {
    modalDialogTitle: string,
    modalWidth?: string
}
interface SpCustomModalWrapperState {
    isClosed: boolean
}

export default class SpCustomModalWrapper extends React.Component<SpCustomModalWrapperProps, SpCustomModalWrapperState> {
    constructor() {
        super();
        this.state = { isClosed: false };
    }
    private closeBtnClick(e: any) {
        this.setState({ isClosed: true });
    }
    public render() {
        let modalContainerDivStyles = this.state.isClosed ? styles.hidden : styles.modalContainerDivStyles;
        let divModalStyles = (this.props.modalWidth !== undefined) ? Utils.mergeObjects(styles.divModalStyles, { width: this.props.modalWidth }) : styles.divModalStyles;
        return <div style={modalContainerDivStyles}>
            <div style={divModalStyles}>
                <div>
                    <h1>
                        {this.props.modalDialogTitle}
                    </h1>
                    <a href="javascript:void(0)" style={styles.linkBtnStyles} onClick={this.closeBtnClick.bind(this) }>x</a>
                    <hr style={{ marginBottom: 0 }}/>
                </div>
                { this.props.children }
            </div>
        </div>;
    }
}