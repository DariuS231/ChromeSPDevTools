import * as React from "react";
import { IconButton } from "./iconButton";

interface IFavouriteButtonProps {
    onClick: React.EventHandler<React.MouseEvent<HTMLAnchorElement>>;
    isFavourite: boolean;
}
export const FavouriteButton: React.StatelessComponent<IFavouriteButtonProps> = (props: IFavouriteButtonProps) => {
    const title: string = props.isFavourite ? "Unpin favourite" : "Pin as favourites";
    const starType: string = props.isFavourite ? "FavoriteStarFill" : "FavoriteStar";
    return <IconButton icon={starType} title={title} onClick={props.onClick} />;
};
