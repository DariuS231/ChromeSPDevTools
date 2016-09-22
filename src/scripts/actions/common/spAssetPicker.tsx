/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./interfaces.ts"/>
import * as React from 'react';
interface SpAssetPickerProps {
    assetDialogTitle: string
}
interface SpAssetPickerState {
    assetUrl: string
}

export default class SpAssetPicker extends React.Component<SpAssetPickerProps, SpAssetPickerState> {
    constructor(){
        super();
        this.state = {assetUrl : ''};
    }
    private assetSelectorCallBack(dialogResult: number, returnValue: any): void {
        if (dialogResult === 1) {
            this.setState({
                assetUrl: returnValue.AssetUrl
            });
        }
    }
    private showAssetPicker(): void {
        let modalOptions: any = {
            title: this.props.assetDialogTitle,
            url: '/_layouts/assetportalbrowser.aspx',
            dialogReturnValueCallback: this.assetSelectorCallBack.bind(this)
        }
        SP.UI.ModalDialog.showModalDialog(modalOptions);
    }

    public render() {
        return <div>
            <input type="text" value={this.state.assetUrl}/>
            <input type="button" onClick={this.showAssetPicker.bind(this)}/>
        </div>;
    }
}