import { Image } from "office-ui-fabric-react/lib/Image";
import * as React from "react";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { FavouriteButton } from "./../../common/components/favouriteButton";
import { IAction } from "./../../common/interfaces";
import { SpSiteContentConstants as constants } from "./../constants/spSiteContentConstants";
import SpSiteContentMenu from "./spSiteContentMenu";

interface ISpSiteContentItemProps {
    item: ISiteContent;
    linkTarget: string;
    setFavourite: (item: ISiteContent) => IAction<ISiteContent>;
}

export const SpSiteContentItem: React.StatelessComponent<ISpSiteContentItemProps> =
    (props: ISpSiteContentItemProps) => {
        const favouriteClick = (event: any) => {
            props.setFavourite(props.item);
        };
        return (
            <div className="ms-ListBasicSpChromeDevTool-itemCell">
                <Image src={props.item.imageUrl} width={constants.itemImageWidth} height={constants.itemImageHeight}
                    className={"ms-ListBasicSpChromeDevTool-itemImage" + (props.item.hidden ? " hidden-spList" : "")} />
                <div className="ms-ListBasicSpChromeDevTool-itemContent">
                    <a title={props.item.description} alt={props.item.title} href={props.item.listUrl}
                        target={props.linkTarget}
                        className="ms-ListBasicSpChromeDevTool-itemName ms-font-l ms-fontColor-themePrimary ms-fontWeight-semibold">
                        {props.item.title}
                    </a>
                    <div className="ms-ListBasicSpChromeDevTool-itemIndex">
                        {`Items: ${props.item.itemCount} `}
                    </div>
                    <div className="ms-ListBasicSpChromeDevTool-itemIndex">
                        {`Modified: ${props.item.lastModified.toLocaleDateString()} ${props.item.lastModified.toLocaleTimeString()}`}
                    </div>
                </div>
                <div className="ms-ListItem-actions">
                    <FavouriteButton isFavourite={props.item.isFavourite} onClick={favouriteClick} />
                    <SpSiteContentMenu item={props.item} linkTarget={props.linkTarget} />
                </div>
            </div>)
    };
