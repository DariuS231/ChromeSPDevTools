/// <reference path="../../../../typings/index.d.ts"/>

import * as React from 'react';

interface SpCustomModalProps {
    componentChild:any
}

export default class SpCustomModal extends React.Component<SpCustomModalProps,{}> {
    public render() {
        var modalContainerDivStyles = { 
            width : '100%', 
            height : '100%', 
            position : 'absolute', 
            backgroundColor : 'rgba(0,0,0,0.5)', 
            top : 0, 
            zIndex : 99991 
        };
        var divModal = {
            background: 'white',
            width: '50%',
            height: '100%',
            margin: '10px auto',
        }
        return  <div style={modalContainerDivStyles}>
                    <div style={divModal}>
                        {this.props.componentChild}
                    </div>
                </div>;
    }
}