import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import { StatelessComponent } from "react";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { IAction } from "./../../common/interfaces";
import { SpSiteContentItem } from "./spSiteContentItem";

interface ISpSiteContentListProps {
    items: ISiteContent[];
    filterString: string;
    setFavourite: (item: ISiteContent) => IAction<ISiteContent>;
    showAll: boolean;
    linkTarget: string;
}
export const SpSiteContentList: React.StatelessComponent<ISpSiteContentListProps> =
    (props: ISpSiteContentListProps) => {
        const filter: string = props.filterString.toLowerCase();
        const items: ISiteContent[] = props.items.filter((item: ISiteContent, index: number) => {
            return (filter === "" || item.title.toLowerCase().indexOf(filter) >= 0)
                && (item.isFavourite || (props.showAll || item.hidden));
        });

        items.sort((a: ISiteContent, b: ISiteContent) => {
            return (a.isFavourite === b.isFavourite)
                ? (a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1)
                : (a.isFavourite ? -1 : 1);
        });
        const renderListItem = (item: ISiteContent, index: number) => {
            return <SpSiteContentItem item={item} linkTarget={props.linkTarget} setFavourite={props.setFavourite} />;
        };
        return <List items={items} onRenderCell={renderListItem} />;
    };
