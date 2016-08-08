/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.tsx"/>
import * as React from 'react';

export default class SpCustomModalWrapper extends React.Component<SpCustomModalWrapperProps, SpCustomModalWrapperState> {
    constructor() {
        super();
        this.state = { isClosed: false };
    }
    private closeBtnClick(e: any) {
        this.setState({ isClosed: true });
    }
    public render() {
        var modalContainerDivStyles: any = {
            width: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.5)',
            top: 0,
            bottom: 0,
            zIndex: 99991
        };
        if (this.state.isClosed) {
            modalContainerDivStyles['display'] = 'none';
        }
        var divModalStyles = {
            background: 'white',
            width: '50%',
            height: '98%',
            margin: '10px auto',
            position: 'relative'
        }

        var linkBtnStyles = {
            top: 0,
            right: 0,
            position: 'absolute'
        }
        return <div style={modalContainerDivStyles}>
            <div style={divModalStyles}>
                <div>
                    <h1>
                        {this.props.modalDialogTitle}
                    </h1>
                    <a href="javascript:void(0)" style={linkBtnStyles} onClick={this.closeBtnClick.bind(this) }>X</a>
                    <hr/>
                </div>
                { this.props.children }
            </div>
        </div>;
    }
}