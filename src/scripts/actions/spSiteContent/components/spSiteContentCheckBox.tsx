import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import * as React from "react";
import { ActionCreator } from "redux";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import { IAction } from "./../../common/interfaces";

interface ISpSiteContentCheckBoxProps {
    checkLabel: string;
    isCkecked: boolean;
    onCheckBoxChange: (checked: boolean) => IAction<boolean>;
}

export const SpSiteContentCheckBox: React.StatelessComponent<ISpSiteContentCheckBoxProps> =
    (props: ISpSiteContentCheckBoxProps) => {
        const onCheckBoxChange = (e: any) => {
            const isChecked: boolean = e.target.checked;
            props.onCheckBoxChange(isChecked);
        };
        return <div className="ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3">
            <Checkbox label={props.checkLabel} defaultChecked={props.isCkecked} onChange={onCheckBoxChange} />
        </div>;
    };
