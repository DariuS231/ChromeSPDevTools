import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import * as React from "react";
import { ActionCreator } from "redux";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { IAction } from "./../../common/interfaces";

interface ISpSiteContentCheckBoxProps {
    checkLabel: string;
    isChecked: boolean;
    onCheckBoxChange: (checked: boolean) => IAction<boolean>;
}

export const SpSiteContentCheckBox: React.StatelessComponent<ISpSiteContentCheckBoxProps> =
    (props: ISpSiteContentCheckBoxProps) => {
        const onCheckBoxChange = (e: any) => {
            const isChecked: boolean = e.target.checked;
            props.onCheckBoxChange(isChecked);
        };
        return <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6">
            <Checkbox label={props.checkLabel} defaultChecked={props.isChecked} onChange={onCheckBoxChange} />
        </div>;
    };
