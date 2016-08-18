/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
import { WorkingOnItStyles as styles } from './Styles'
interface WorkingOnItProps { }
interface WorkingOnItState { }

export default class WorkingOnIt extends React.Component<WorkingOnItProps, WorkingOnItState> {
    public render() {
        return <div style={ styles.workingOnItContStyles }>
            <img style={styles.workingOnItItemsStyles} src="/_layouts/15/images/gears_anv4.gif" alt="Working on it..."/>
            <h2 style={styles.workingOnItItemsStyles}>Working on it...</h2>
        </div>;
    }
}