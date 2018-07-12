import * as React from "react";

import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Image } from "office-ui-fabric-react/lib/Image";
import { List } from "office-ui-fabric-react/lib/List";
import { IFeature } from "../interfaces/spFeaturesInterfaces";
import { constants } from "./../constants/constants";
import SpFeaturesItem from "./spFeaturesItem";

interface ISpFeaturesListProps {
    items: IFeature[];
    listTitle: string;
    tablesClassName: string;
    filterString: string;
    onToggleClick: (feature: IFeature) => void;
}

const SpFeaturesList: React.StatelessComponent<ISpFeaturesListProps> = (props: ISpFeaturesListProps) => {

    const filter: string = props.filterString.toLowerCase();
    const items: IFeature[] = filter !== constants.EMPTY_STRING
        ? props.items.filter((item: IFeature, index: number) => {
            return item.name.toLowerCase().indexOf(filter) >= 0;
        }) : props.items;

    const renderItem = (item: IFeature, index: number) => {
        return <SpFeaturesItem item={item} key={index} onToggleClick={props.onToggleClick} />;
    };
    return (
        <div className={props.tablesClassName} >
            <div className="ms-font-l ms-fontWeight-semibold">
                {props.listTitle}
            </div>
            <FocusZone direction={FocusZoneDirection.vertical} >
                <List items={items} onRenderCell={renderItem} />
            </FocusZone>
        </div>);
};

export default SpFeaturesList;
