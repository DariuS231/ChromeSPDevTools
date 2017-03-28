import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
import * as React from "react";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { FavouriteButton } from "./../../common/components/favouriteButton";
import { IconLink } from "./../../common/components/iconLink";
import { SpSiteContentConstants as constants } from "./../constants/spSiteContentConstants";
import SpSiteContentMenu from "./spSiteContentMenu";

interface ISpSiteContentItemProps {
    item: ISiteContent;
    linkTarget: string;
}

export const SpSiteContentItem: React.StatelessComponent<ISpSiteContentItemProps> =
    (props: ISpSiteContentItemProps) => (
        <div className="ms-ListBasicExample-itemCell">
            <Image
                src={props.item.imageUrl}
                width={constants.itemImageWidth}
                height={constants.itemImageHeight}
                className={"ms-ListBasicExample-itemImage" + (props.item.hidden ? " hidden-spList" : "")}
            />
            <div className="ms-ListBasicExample-itemContent">
                <a
                    title={props.item.description}
                    alt={props.item.title}
                    href={props.item.listUrl}
                    className="ms-ListBasicExample-itemName ms-font-l ms-fontColor-themePrimary ms-fontWeight-semibold"
                    target={props.linkTarget}
                >
                    {props.item.title}
                </a>
                <div className="ms-ListBasicExample-itemIndex">
                    {`Items: ${props.item.itemCount} `}
                </div>
                <div className="ms-ListBasicExample-itemIndex">
                    {`Modified: ${props.item.lastModified.toLocaleDateString()} ${props.item.lastModified.toLocaleTimeString()}`}
                </div>
            </div>
            <div className="ms-ListItem-actions">
                <FavouriteButton isFavourite={props.item.isFavourite} onClick={(event:any) => { console.log("Clicked Fav"); }} />
                <SpSiteContentMenu item={props.item} linkTarget={props.linkTarget} />
            </div>
        </div>
    );
