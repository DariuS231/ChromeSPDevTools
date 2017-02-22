import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import { StatelessComponent } from "react";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { SpSiteContentItem } from "./SpSiteContentItem";

interface ISpSiteContentListProps {
    items: ISiteContent[];
    filterString: string;
    showAll: boolean;
    linkTarget: string;
}
export const SpSiteContentList: React.StatelessComponent<ISpSiteContentListProps> =
    (props: ISpSiteContentListProps) => {
        const filter: string = props.filterString.toLowerCase();
        const items: ISiteContent[] = props.items.filter((item: ISiteContent, index: number) => {
            return (filter === "" || item.title.toLowerCase().indexOf(filter) >= 0)
                && (props.showAll || item.hidden);
        })
        const renderListItem = (item: ISiteContent, index: number) => {
            return <SpSiteContentItem item={item} linkTarget={props.linkTarget} />;
        };
        return <List items={items} onRenderCell={renderListItem} />;
    };
