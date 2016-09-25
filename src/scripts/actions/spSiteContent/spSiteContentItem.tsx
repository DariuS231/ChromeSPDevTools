/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { SpSiteContentItemStyles as styles, ButtonsStyle as buttonsStyles } from './../common/Styles'

interface SpSiteContentItemProps {
    item: ISiteContent,
    openInNewTab: boolean
}
interface SpSiteContentItemState { }

export default class SpSiteContentItem extends React.Component<SpSiteContentItemProps, SpSiteContentItemState> {
    public render() {
        let target: string = this.props.openInNewTab ? '_blank' : '_self';
        return (
            <li style={styles.listItem}>
                <div style={styles.divContainer}>
                    <a target={target} title={this.props.item.title} alt={this.props.item.title} href={this.props.item.listUrl}>
                        <img src={this.props.item.imageUrl} alt={this.props.item.title} style={styles.imageItem} />
                        <h2 style={styles.itemTitle}>{this.props.item.title}</h2>
                    </a>
                    <p style={styles.totalItems}>{this.props.item.itemCount} items</p>
                    <a target={target} href={this.props.item.settingsUrl} style={buttonsStyles.settingsStyles}>List Settings</a>
                </div>
            </li>);
    }
}
