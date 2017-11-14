import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { IProperty } from "../interfaces/spPropertyBagInterfaces";
import { FavouriteButton } from "./../../common/components/favouriteButton";
import { IconButton } from "./../../common/components/iconButton";
import { constants } from "./../constants/constants";

interface ISpPropertyBagItemFormProps {
    inputId: string;
    item: IProperty;
    isEditMode: boolean;
    inputValue: string;
    getErrorMessage: (value: string) => string | PromiseLike<string>;
    onInputValueChange: (newValue: any) => void;
    topBtnClick: React.EventHandler<React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>>;
    bottomBtnClick: React.EventHandler<React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>>;
    setFavourite: (props: IProperty) => void;
}

export const SpPropertyBagItemForm: React.StatelessComponent<ISpPropertyBagItemFormProps> =
    (props: ISpPropertyBagItemFormProps) => {
    const topBtnText: string = props.isEditMode ? constants.SAVE_TEXT : constants.DELETE_TEXT;
    const bottomBtnText: string = props.isEditMode ? constants.CANCEL_TEXT : constants.EDIT_TEXT;
    const favouriteClick = (event: any) => {
            props.setFavourite({
                key: props.item.key,
                value: props.item.value,
                isFavourite: props.item.isFavourite
            } as IProperty);
        };
    return (<div className="ms-ListBasicSpChromeDevTool-itemCell  ms-Grid-row" data-is-focusable={true}>
        <div className="ms-ListBasicSpChromeDevTool-itemContent ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <TextField
                id={props.inputId}
                onGetErrorMessage={props.getErrorMessage}
                label={props.item.key}
                value={props.inputValue}
                disabled={!props.isEditMode}
                onChanged={props.onInputValueChange}
            />

        <div className="action-buttons">
            <FavouriteButton isFavourite={props.item.isFavourite} onClick={favouriteClick} />
            <IconButton title={bottomBtnText} icon={bottomBtnText} onClick={props.bottomBtnClick} />
            <IconButton title={topBtnText} icon={topBtnText} onClick={props.topBtnClick} />
        </div>
        </div>
    </div>);
};
