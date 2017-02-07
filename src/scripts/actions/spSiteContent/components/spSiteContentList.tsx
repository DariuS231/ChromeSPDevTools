import { List } from "office-ui-fabric-react/lib/List";
import * as React from "react";
import { StatelessComponent } from "react";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { SpSiteContentItem } from "./SpSiteContentItem";

interface ISpSiteContentListProps {
    items: ISiteContent[];
    linkTarget: string;
}
export const SpSiteContentList: React.StatelessComponent<ISpSiteContentListProps> =
    (props: ISpSiteContentListProps) => {
        const renderListItem = (item: ISiteContent, index: number) => {
            return <SpSiteContentItem item={item} linkTarget={props.linkTarget} />;
        };
        return <List items={props.items} onRenderCell={renderListItem} />;
    };
