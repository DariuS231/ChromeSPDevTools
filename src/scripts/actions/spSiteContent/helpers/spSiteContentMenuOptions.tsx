import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import { Link } from "react-router";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";

export interface ISpSiteContentMenuOption extends IContextualMenuItem {
    type: string;
}

export interface ISiteContentOption {
    key: string;
    type: string;
    name: string;
}
class SpSiteContentMenuHelper {
    protected _location: ISiteContentOption[] = [
        {
            key: "ScriptSrc",
            name: "Script Src",
            type: "type"
        }
    ];
}

export const spSiteContentMenuHelper = new SpSiteContentMenuHelper();
