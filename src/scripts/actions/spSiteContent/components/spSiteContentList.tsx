import * as React from 'react';
import { StatelessComponent } from 'react';
import { List } from 'office-ui-fabric-react/lib/List';
import { SpSiteContentItem } from './SpSiteContentItem';

interface SpSiteContentListProps {
    items: ISiteContent[],
    linkTarget: string
}
export const SpSiteContentList: React.StatelessComponent<SpSiteContentListProps> = (props: SpSiteContentListProps) => (
    <List items={props.items} onRenderCell={(item, index) => (<SpSiteContentItem item={item} linkTarget={props.linkTarget} />)} />
);
