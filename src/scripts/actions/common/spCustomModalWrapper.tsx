/// <reference path="../../../../typings/index.d.ts"/>

import * as React from 'react';

interface SpCustomModalProps {

}


export default class SpCustomModalWrapper extends React.Component<{},{isClosed:boolean}> {
    constructor(){
        super();
        this.state = {isClosed:false};
    }
    private closeBtnClick(e:any){
        this.setState({isClosed:true});
    }
    public render() {
        var modalContainerDivStyles:any = { 
            width : '100%', 
            height : '100%', 
            position : 'absolute', 
            backgroundColor : 'rgba(0,0,0,0.5)', 
            top : 0, 
            zIndex : 99991 
        };
        if(this.state.isClosed){
            modalContainerDivStyles['display'] = 'none';
        }
        var divModalStyles = {
            background: 'white',
            width: '50%',
            height: '100%',
            margin: '10px auto',
            position : 'relative'
        }

        var linkBtnStyles = {
            top : 0,
            right: 0,
            position : 'absolute'
        }
        return  <div style={modalContainerDivStyles}>
                    <div style={divModalStyles}>
                        <a href="javascript:void(0)" style={linkBtnStyles} onClick={this.closeBtnClick.bind(this)}>X</a>
                        { this.props.children }
                    </div>
                </div>;
    }
}