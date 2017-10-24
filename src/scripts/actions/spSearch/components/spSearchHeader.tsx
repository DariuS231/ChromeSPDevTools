import { Button } from "office-ui-fabric-react/lib/";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { ISpPropertyBagProps } from "../interfaces/spSearchInterfaces";

const SpSearchHeader: React.StatelessComponent<ISpPropertyBagProps> = (props: ISpPropertyBagProps) => {

    const onSearchClick = (ev: any): void => {
        props.actions.getResults(props);
    }
    const _validateSearchText = (str: string): string => {
        return str.trim() === "" ? "Text Query can´t be empty." : "";
    }
    return (
        < div className="ms-Grid-row" >
            <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                <TextField
                    multiline={true}
                    resizable={false}
                    value={props.textQuery}
                    onChanged={props.actions.setQueryText}
                    onGetErrorMessage={_validateSearchText} />
            </div>
            <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                <Button
                    value="Search"
                    title="Search"
                    icon="Search"
                    description="Search"
                    onClick={onSearchClick} />
            </div>
        </div >
    );

};

export default SpSearchHeader;
