

import * as React from 'react';
import { List } from 'office-ui-fabric-react/lib/List';
import { SpSiteContentItem } from './SpSiteContentItem'

export const SpSiteContentList = (props: { items: ISiteContent[], linkTarget: string }) => (
    <List items={props.items} onRenderCell={(item, index) => (<SpSiteContentItem item={item} linkTarget={props.linkTarget} />)} />
);
