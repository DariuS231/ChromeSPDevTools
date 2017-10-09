import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Image } from "office-ui-fabric-react/lib/Image";
import { List } from "office-ui-fabric-react/lib/List";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { TextField } from "office-ui-fabric-react/lib/TextField";

interface ISpSearchItemProps { }

const SpSearchSettings: React.StatelessComponent<ISpSearchItemProps> = (props: ISpSearchItemProps) => {
    return <div style={{ display: "inline-block", width: "30%" }} >
        <Checkbox label={"Trim Duplicates"} />
        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg14">
                <TextField label={"Row Limit"} type="number" />
            </div>
            <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg14">
                <TextField label={"Start"} type="number" />
            </div>
            <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg14">
                <TextField label={"Skip"} type="number" />
            </div>
        </div>
        <TextField label={"Select Fields"} placeholder="ID,Title,ContentType...." />
        <TextField label={"Refiners"} placeholder="ID,Title,ContentType...." />
        <TextField label={"Filters"} placeholder="Title:FileName" />
        <TextField label={"Sort"} placeholder="ID:ascending,Rank:descending" />
        <TextField label={"Result Source Id"} placeholder="3AD71BB0-0A3D-4529-86E7-4E8DF7E753B5" />
    </div>;

};

export default SpSearchSettings;
