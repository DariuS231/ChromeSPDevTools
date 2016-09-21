/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { KeyValueItemStyles as kviStyles } from '../common/Styles'
import { SpFeaturesStyles as featureStyles } from '../common/Styles'
interface FeatureItemState {
}

interface FeatureItemProps {
    item: IFeature,
    itemIndex: number,
    onClick: any,
}

export default class FeatureItem extends React.Component<FeatureItemProps, FeatureItemState> {

    private onActionClick(e: any) {
        this.props.onClick(this.props.item.id, this.props.item.name, this.props.item.activated, this.props.item.scope);
    }

    private spErrorHandler(sender: any, err: any) {
        console.log(err.get_message());
        //this.setState({ isWorkingOnIt: false, messageType: MessageType.Error, message: 'An error ocurred, check the log for more information.', showMessage: true } as SpPropertyBagState)
    }

    public render() {
        let activateBtn: any;
        let deactivateBtn: any;

        let actBtnStyle: any = featureStyles.activateBtnStyle;
        let deactBtnStyle: any = featureStyles.deactivateBtnStyle;

        actBtnStyle['backgroundPosition'] = '10% 50%';
        deactBtnStyle['backgroundPosition'] = '10% 50%';

        activateBtn = (<input type="button"  onClick={this.onActionClick.bind(this) } style={actBtnStyle} title="Activate" value="Activate"/>);
        deactivateBtn = (<input type="button" onClick={this.onActionClick.bind(this) } style={deactBtnStyle} title="Deactivate" value="Deactivate"/>);

        let featureAction = (this.props.item.activated === true) ? activateBtn : deactivateBtn

        return <tr key="{this.props.item.id}" id="{this.props.item.id}" style={(Math.abs(this.props.itemIndex % 2) !== 1) ? kviStyles.oddTableRowStyles : {}}>
            <th style={featureStyles.headerStyle}>
                <td style={featureStyles.featureLogo}>
			        <img src={this.props.item.logo} alt="" data-themekey="#"/>
		        </td>
                <td>
                    {this.props.item.name}
                </td>
            </th>
            <td style={kviStyles.tableCellStyle}>
              {featureAction}
            </td>
        </tr>;
    }
}