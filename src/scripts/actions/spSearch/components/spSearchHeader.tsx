import { Button } from "office-ui-fabric-react/lib/";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import utils from "../../common/utils";
import { ISpPropertyBagProps } from "../interfaces/spSearchInterfaces";
import SpSearchApi from "../api/spSearchApi";

const api = new SpSearchApi();

const SpSearchHeader: React.StatelessComponent<ISpPropertyBagProps> = (props: ISpPropertyBagProps) => {

    const copyTextId: string = "SpSearchHeader_copyText";
    const _onSearchClick = (ev: any): void => {
        props.actions.getResults(props);
    };
    const _onCopyClick = (ev: any): void => {
        const copyText: HTMLInputElement = document.getElementById(copyTextId) as HTMLInputElement;
        copyText.select();
        document.execCommand("copy");
    };
    const onKeyPress = (ev: any) => {
        if (ev.key === "Enter") {
            props.actions.getResults(props);
            ev.preventDefault();
        }
    };
    const _validateSearchText = (str: string): string => {
        const errorMessage: string = str.trim() === "" ? "Text Query can´t be empty." : "";
        if (true && errorMessage !== "") {
            props.actions.setQueryText(str);
        }
        return errorMessage;
    };
    const disableBtn: boolean = !utils.isGuidValid(props.sourceId) || props.textQuery === "";
    const reqUrl = api.buildRequestURL(props);

    return (
        <div>
            <div className="ms-Grid-row" >
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 spSearch-header-copy">
                    <div className="spSearch-header-copy-url">
                        {reqUrl}
                    </div>
                    <Button value="Copy" title="Copy" icon="Copy" description="Copy" disabled={disableBtn} onClick={_onCopyClick}
                        className="spSearch-header-copy-btn" />
                    <div className="spSearch-header-copy-input">
                        <TextField value={reqUrl} id={copyTextId} />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-row" >

                <div className="ms-Grid-col ms-u-sm11 ms-u-md11 ms-u-lg11">
                    <TextField
                        multiline={true}
                        resizable={false}
                        value={props.textQuery}
                        onChanged={props.actions.setQueryText}
                        onGetErrorMessage={_validateSearchText}
                        onKeyPress={onKeyPress} />
                </div>
                <div className="ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                    <Button
                        value="Search"
                        title="Search"
                        icon="Search"
                        description="Search"
                        disabled={disableBtn}
                        onClick={_onSearchClick}
                        style={{ paddingLeft: 0, margin: 0 }} />
                </div>
            </div>
        </div>
    );

};

export default SpSearchHeader;
