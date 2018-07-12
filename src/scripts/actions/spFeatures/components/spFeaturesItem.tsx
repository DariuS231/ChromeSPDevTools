import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Image } from "office-ui-fabric-react/lib/Image";
import { List } from "office-ui-fabric-react/lib/List";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import * as React from "react";
import { IFeature } from "../interfaces/spFeaturesInterfaces";

interface ISpFeaturesItemProps {
    item: IFeature;
    onToggleClick: (feature: IFeature) => void;
}

const SpFeaturesItem: React.StatelessComponent<ISpFeaturesItemProps> = (props: ISpFeaturesItemProps) => {
    const toggleCLick = (checked: boolean): void => {
        props.onToggleClick(props.item);
    };
    // tslint:disable-next-line:max-line-length
    const itemClassName = "ms-ListBasicSpChromeDevTool-itemContent ms-ListBasicSpChromeDevTool-featureName ms-font-m ms-fontColor-themePrimary ms-fontWeight-semibold";
    return (
        <div className="ms-ListBasicSpChromeDevTool-itemCell" data-is-focusable={true} title={props.item.description}>
            <Image className="ms-ListBasicSpChromeDevTool-itemImage" src={props.item.logo} width={31} height={22} />
            <div className={itemClassName}>
                {props.item.name}
            </div>
            <Toggle checked={props.item.activated} label="" onText="On" offText="Off" onChanged={toggleCLick} />
        </div>);

};

export default SpFeaturesItem;
