import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Image } from "office-ui-fabric-react/lib/Image";
import { List } from "office-ui-fabric-react/lib/List";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import * as React from "react";
import { ISpPropertyBagProps } from "../interfaces/spSearchInterfaces";
import SpSearchSettingsCheckBox from "./spSearchSettingsCheckBox";
import SpSearchSettingsInputNumber from "./spSearchSettingsInputNumber";
import SpSearchSettingsInputString from "./SpSearchSettingsInputString";
import SpSearchSettingsInputStringArray from "./SpSearchSettingsInputStringArray";


const SpSearchSettings: React.StatelessComponent<ISpPropertyBagProps> = (props: ISpPropertyBagProps) => {
    const guidRegex: RegExp = /^[0-9aA-fF]{8}-([0-9aA-fF]{4}-){3}[0-9aA-fF]{12}$/;
    return (
        <div className="sp-Search-columns settings" >
            <div >
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
                        <SpSearchSettingsCheckBox
                            label={"Trim Duplicates"}
                            checked={props.trimDuplicates}
                            action={props.actions.setTrimDuplicates} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6" />
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                        <SpSearchSettingsInputNumber
                            label={"Row Limit"}
                            value={props.rowLimit}
                            action={props.actions.setRowLimit} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                        <SpSearchSettingsInputNumber label={"Skip"} value={props.skip} action={props.actions.setSkip} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4" />
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <SpSearchSettingsInputStringArray
                            label={"Select Fields"}
                            value={props.selectFields}
                            action={props.actions.setSelectFields}
                            placeHolder={"ID,Title,ContentTypeId..."} />
                    </div>
                    {/* <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <SpSearchSettingsInputStringArray
                            label={"Refiners"}
                            value={props.Refiners}
                            action={props.actions.setRefiners} />
                    </div> */}
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <SpSearchSettingsInputString
                            label={"Filters"}
                            value={props.filters}
                            action={props.actions.setFilters}
                            placeHolder={"Title:Red Cars..."} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <SpSearchSettingsInputStringArray
                            label={"Sort"}
                            value={props.sortBy}
                            action={props.actions.setSortBy}
                            placeHolder={"Author:ascending,Size:descending..."} />
                    </div>
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <SpSearchSettingsInputString
                            label={"Result Source Id"}
                            value={props.sourceId}
                            action={props.actions.setResultSource}
                            placeHolder={"01234567-89AB-CDEF-GHIJ-KLMNOPQRSTUV"}
                            valudation={str => { return !str || guidRegex.test(str) }}
                            valudationError="Invalid GUID" />
                    </div>
                </div>

            </div>
        </div>
    );

};

export default SpSearchSettings;
