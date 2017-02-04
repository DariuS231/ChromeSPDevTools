import * as React from 'react';

import { List } from 'office-ui-fabric-react/lib/List';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { IFeature } from '../interfaces/spFeaturesInterfaces';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

interface SpFeaturesItemProps {
    item: IFeature,
    onToggleClick: (checked: boolean) => void
}

const SpFeaturesItem: React.StatelessComponent<SpFeaturesItemProps> = (props: SpFeaturesItemProps) => {
    return <div className='ms-ListBasicExample-itemCell' data-is-focusable={true} title={props.item.description}>
        <Image className='ms-ListBasicExample-itemImage' src={props.item.logo} width={31} height={22} />
        <div className='ms-ListBasicExample-itemContent ms-ListBasicExample-featureName ms-font-m ms-fontColor-themePrimary ms-fontWeight-semibold'>
            {props.item.name}
        </div>
        <Toggle checked={props.item.activated} label='' onText='On' offText='Off' onChanged={props.onToggleClick} />
    </div>

}

export default SpFeaturesItem;