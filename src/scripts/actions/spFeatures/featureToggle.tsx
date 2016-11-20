/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';

import {
    Toggle
} from './../../../../node_modules/office-ui-fabric-react/lib/index';

interface FeatureItemState {
}

interface FeatureItemProps {
    showOnlyIconsInButtons: boolean,
    item: IFeature,
    itemIndex: number,
    onClick: any,
}

export default class FeatureToggle extends React.Component<FeatureItemProps, FeatureItemState> {

    private onActionClick(e: any) {
        this.props.onClick(this.props.item.id, this.props.item.name, this.props.item.activated, this.props.item.scope);
    }

    private spErrorHandler(sender: any, err: any) {
        console.log(err.get_message());
    }

    public render() {
        //Toggle component to activate/deactive, but I can't associate an event to the selection
        let featureAction = (this.props.item.activated === true)
            ? (<Toggle checked={false} label='' onText='On' offText='Off' onChanged={this.onActionClick.bind(this)} />)
            : (<Toggle checked={true} label='' onText='On' offText='Off' onChanged={this.onActionClick.bind(this)} />);

        return <div className='ms-ListFeature-toggle'>
            {featureAction}
        </div>;
    }
}