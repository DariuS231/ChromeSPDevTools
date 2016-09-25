/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import { KeyValueItemStyles as kviStyles, ButtonsStyle as buttonsStyle  } from '../common/Styles'
import { SpFeaturesStyles as featureStyles } from '../common/Styles'
interface FeatureItemState {
}

interface FeatureItemProps {
    showOnlyIconsInButtons: boolean,
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
        let actBtnText = 'Activate';
        let deactBtnText = 'Deactivate';
        let actBtnStyles = buttonsStyle.activateBtnStyle;
        let deactBtnStyles = buttonsStyle.deactivateBtnStyle;
        if (this.props.showOnlyIconsInButtons) {
            actBtnText = deactBtnText = '';
            actBtnStyles['backgroundPosition']  = deactBtnStyles['backgroundPosition'] =  '50% 50%';
        }
        let activateBtn: any = (<input type="button"  onClick={this.onActionClick.bind(this) } style={actBtnStyles} title="Activate" value={actBtnText}/>);
        let deactivateBtn: any = (<input type="button" onClick={this.onActionClick.bind(this) } style={deactBtnStyles} title="Deactivate" value={deactBtnText}/>);

        let featureAction = (this.props.item.activated === true) ? activateBtn : deactivateBtn

        return <tr  id="{this.props.item.id}" style={(Math.abs(this.props.itemIndex % 2) !== 1) ? kviStyles.oddTableRowStyles : {}}>
            <th style={featureStyles.headerStyle}>
                <div style={featureStyles.featureLogo}>
                    <img src={this.props.item.logo} alt="" data-themekey="#"/>
                </div>
                <div>
                    {this.props.item.name}
                </div>
            </th >
            <td style={kviStyles.tableCellStyle}>
                {featureAction}
            </td>
        </tr>;
    }
}