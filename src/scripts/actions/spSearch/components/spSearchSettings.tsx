import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Image } from "office-ui-fabric-react/lib/Image";
import { List } from "office-ui-fabric-react/lib/List";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { TextField } from "office-ui-fabric-react/lib/TextField";

interface ISpSearchItemProps { }

const SpSearchSettings: React.StatelessComponent<ISpSearchItemProps> = (props: ISpSearchItemProps) => {
    return <div style={{ display: "inline-block", width: "30%", verticalAlign:'top' }} >
        <div style={{ top: "0", position: 'relative' }}>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <Checkbox label={"Trim Duplicates"} checked={true} />
                </div>
                <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                    <Checkbox label={"Trim Duplicates"} checked={true} />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <TextField label={"Row Limit"} type="number" value="10" />
                </div>
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <TextField label={"Start"} type="number" value="0" />
                </div>
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <TextField label={"Skip"} type="number" value="0" />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <TextField label={"Select Fields"} placeholder="ID,Title,ContentType...." />
                </div>
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <TextField label={"Refiners"} placeholder="ID,Title,ContentType...." />
                </div>
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <TextField label={"Filters"} placeholder="Title:FileName" />
                </div>
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <TextField label={"Sort"} placeholder="ID:ascending,Rank:descending" />
                </div>
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <TextField label={"Result Source Id"} placeholder="3AD71BB0-0A3D-4529-86E7-4E8DF7E753B5" />
                </div>
            </div>

        </div>
    </div>;

};

export default SpSearchSettings;
