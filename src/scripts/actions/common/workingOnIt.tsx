/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.tsx"/>
import * as React from 'react';


export default class WorkingOnIt extends React.Component<WorkingOnItProps, WorkingOnItState> {

    public render() {
        let workingOnItContStyles: any = {overflow:'auto', height: '90%',width:'100%', textAlign: 'center', verticalAlign: 'middle'};
        let workingOnItItemsStyles:any = { display: 'inline-block', verticalAlign: 'middle', margin: '20px'}
        
        return <div style={workingOnItContStyles}>
                    <img style={workingOnItItemsStyles} src="/_layouts/15/images/gears_anv4.gif" alt="Working on it..."/>
                    <h2 style={workingOnItItemsStyles}>Working on it...</h2>
                </div>;
    }
}