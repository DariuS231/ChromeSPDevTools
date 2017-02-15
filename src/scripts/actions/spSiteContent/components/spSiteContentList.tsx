import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import { StatelessComponent } from "react";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { SpSiteContentItem } from "./SpSiteContentItem";

interface ISpSiteContentListProps {
    items: ISiteContent[];
    linkTarget: string;
    filterString: string;
    showAll: boolean;
}
export const SpSiteContentList: React.StatelessComponent<ISpSiteContentListProps> =
    (props: ISpSiteContentListProps) => {
        const filter: string = props.filterString.toLowerCase();
        let items: ISiteContent[] = filter !== ""
            ? props.items.filter((item: ISiteContent, index: number) => {
                return item.title.toLowerCase().indexOf(filter) >= 0
                    || item.description.toLowerCase().indexOf(filter) >= 0;
            }) : props.items;
        if (!props.showAll) {
            items = items.filter((item: ISiteContent, index: number) => {
                return item.hidden;
            });
        }
        const renderListItem = (item: ISiteContent, index: number) => {
            return <SpSiteContentItem item={item} linkTarget={props.linkTarget} />;
        };
        return <List items={items} onRenderCell={renderListItem} />;
    };
