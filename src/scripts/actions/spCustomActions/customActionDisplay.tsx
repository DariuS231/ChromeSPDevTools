/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { CustomActionItemStyles as styles } from './../common/Styles'

interface CustomActionDisplayProps {
    item: ICustomAction
}
interface CustomActionDisplayState { }

export default class CustomActionDisplay extends React.Component<CustomActionDisplayProps, CustomActionDisplayState> {

    public render() {
        let script = (this.props.item.location === 'ScriptLink')
            ? (<p style={styles.totalItems}>ScriptSrc: {this.props.item.scriptSrc}</p>)
            : (<p style={styles.totalItems}>scriptBlock: {this.props.item.scriptBlock}</p>);

        return (
            <div style={styles.divContainer}>
                <a title={this.props.item.name} alt={this.props.item.name} href="#">
                    <h2 style={styles.itemTitle}>{this.props.item.name}</h2>
                </a>
                <p style={styles.totalItems}>Location: {this.props.item.location}</p>
                <p style={styles.totalItems}>Sequence: {this.props.item.sequence}</p>
                { script }
            </div>);
    }
}
