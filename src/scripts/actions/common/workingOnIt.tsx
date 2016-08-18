/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
interface WorkingOnItProps { }
interface WorkingOnItState { }

export default class WorkingOnIt extends React.Component<WorkingOnItProps, WorkingOnItState> {
    public render() {
        let styles = {
            workingOnItContStyles: {
                overflow: 'auto',
                height: '90%',
                width: '100%',
                textAlign: 'center',
                verticalAlign: 'middle',
                marginTop: '6.5px'
            },
            workingOnItItemsStyles: {
                display: 'inline-block',
                verticalAlign: 'middle',
                margin: '20px'
            }
        };
        return <div style={ styles.workingOnItContStyles }>
            <img style={styles.workingOnItItemsStyles} src="/_layouts/15/images/gears_anv4.gif" alt="Working on it..."/>
            <h2 style={styles.workingOnItItemsStyles}>Working on it...</h2>
        </div>;
    }
}