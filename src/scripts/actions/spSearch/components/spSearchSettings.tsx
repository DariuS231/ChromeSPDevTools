import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Image } from "office-ui-fabric-react/lib/Image";
import { List } from "office-ui-fabric-react/lib/List";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import * as React from "react";
import SpSearchSettingsCheckBox from "./spSearchSettingsCheckBox";
import SpSearchSettingsInputNumber from "./spSearchSettingsInputNumber";
import SpSearchSettingsInputStringArray from "./SpSearchSettingsInputStringArray";
import SpSearchSettingsInputString from "./SpSearchSettingsInputString";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { ISpPropertyBagProps } from "../interfaces/spSearchInterfaces";


const SpSearchSettings: React.StatelessComponent<ISpPropertyBagProps> = (props: ISpPropertyBagProps) => {

    return (
        <div style={{ display: "inline-block", width: "30%", verticalAlign: 'top' }} >
            <div style={{ top: "0", position: 'relative' }}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                        <SpSearchSettingsCheckBox label={"Trim Duplicates"} checked={props.trimDuplicates} action={props.actions.setTrimDuplicates} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">

                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                        <SpSearchSettingsInputNumber label={"Row Limit"} value={props.rowLimit} action={props.actions.setRowLimit} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                        <SpSearchSettingsInputNumber label={"Start"} value={props.start} action={props.actions.setStart} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                        <SpSearchSettingsInputNumber label={"Skip"} value={props.skip} action={props.actions.setSkip} />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <SpSearchSettingsInputStringArray label={"Select Fields"} value={props.selectFields} action={props.actions.setSelectFields} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <SpSearchSettingsInputStringArray label={"Refiners"} value={props.Refiners} action={props.actions.setRefiners} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <SpSearchSettingsInputString label={"Filters"} value={props.filters} action={props.actions.setFilters} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <SpSearchSettingsInputStringArray label={"Sort"} value={props.sortBy} action={props.actions.setSortBy} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <SpSearchSettingsInputString label={"Result Source Id"} value={props.sourceId} action={props.actions.setResultSource} />
                    </div>
                </div>

            </div>
        </div>
    );

};

export default SpSearchSettings;
