import * as React from 'react';

import { List } from 'office-ui-fabric-react/lib/List';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { Image } from 'office-ui-fabric-react/lib/Image';
import SpFeaturesItem from './spFeaturesItem';
import { IFeature } from '../interfaces/spFeaturesInterfaces';

interface SpFeaturesListProps {
    items: Array<IFeature>,
    listTitle: string,
    tablesClassName: string,
    onToggleClick: (feature: IFeature) => void
}

const SpFeaturesList: React.StatelessComponent<SpFeaturesListProps> = (props: SpFeaturesListProps) => {
    return <div className={props.tablesClassName} >
        <div className='ms-font-l ms-fontWeight-semibold'>{props.listTitle}</div>
        <FocusZone direction={FocusZoneDirection.vertical} >
            <List items={props.items} onRenderCell={(item, index) => (<SpFeaturesItem item={item} key={index} onToggleClick={props.onToggleClick} />)} />
        </FocusZone>
    </div>;
}

export default SpFeaturesList;