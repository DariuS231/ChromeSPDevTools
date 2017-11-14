import { Button } from "office-ui-fabric-react/lib/";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import utils from "../../common/utils";
import { ISpPropertyBagProps } from "../interfaces/spSearchInterfaces";

const SpSearchHeader: React.StatelessComponent<ISpPropertyBagProps> = (props: ISpPropertyBagProps) => {

    const _onSearchClick = (ev: any): void => {
        props.actions.getResults(props);
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
    return (
        < div className="ms-Grid-row" >
            <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                <TextField
                    multiline={true}
                    resizable={false}
                    value={props.textQuery}
                    onChanged={props.actions.setQueryText}
                    onGetErrorMessage={_validateSearchText}
                    onKeyPress={onKeyPress} />
            </div>
            <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                <Button
                    value="Search"
                    title="Search"
                    icon="Search"
                    description="Search"
                    disabled={disableBtn}
                    onClick={_onSearchClick} />
            </div>
        </div >
    );

};

export default SpSearchHeader;
