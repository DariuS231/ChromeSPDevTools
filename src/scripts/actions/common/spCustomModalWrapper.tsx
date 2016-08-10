/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.tsx"/>
import * as React from 'react';

interface SpCustomModalWrapperProps {
    modalDialogTitle:string
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
            width: '60%',
            height: '94%',
            margin: '10px auto',
            position: 'relative',
            padding: '10px',
            borderRadius: '5px'
        }

        var linkBtnStyles = {
            top: 0,
            right: 0,
            position: 'absolute',
            height: '25px',
            width: '25px',
            backgroundColor: 'lightgrey',
            color: 'black',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontSize: 'large',
            borderRadius: '0 5px'
        }
        
        return <div style={modalContainerDivStyles}>
            <div style={divModalStyles}>
                <div>
                    <h1>
                        {this.props.modalDialogTitle}
                    </h1>
                    <a href="javascript:void(0)" style={linkBtnStyles} onClick={this.closeBtnClick.bind(this) }>X</a>
                    <hr style={{marginBottom:0}}/>
                </div>
                { this.props.children }
            </div>
        </div>;
    }
}