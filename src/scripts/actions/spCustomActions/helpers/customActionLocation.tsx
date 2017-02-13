import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import { Link } from "react-router";
import SpCustomActionsItemFormScriptLink from "../components/spCustomActionsItemFormScriptLink";
import SpCustomActionsItemFormStandarMenu from "../components/spCustomActionsItemFormStandarMenu";
import { ICustomAction } from "../interfaces/spCustomActionsInterfaces";

export interface ICustomActionType extends IContextualMenuItem {
    type: string;
}

export interface ILocationItem {
    filterItem: (item: any) => boolean;
    key: string;
    type: string;
    name: string;
    spLocationName: string;
    renderForm: (item: ICustomAction, onChange: (value: string, key: string) => void) => JSX.Element;
}
class CustomActionLocationHelper {
    protected _location: ILocationItem[] = [
        {
            filterItem: (item: any) => {
                return item.Location === "ScriptLink" && !!item.ScriptSrc;
            },
            key: "ScriptSrc",
            name: "Script Src",
            renderForm: (item: ICustomAction, onChange: (value: string, key: string) => void): JSX.Element => {
                return <SpCustomActionsItemFormScriptLink item={item} onInputChange={onChange} isScriptBlock={false} />;
            },
            spLocationName: "ScriptLink",
            type: "ScriptSrc"
        },
        {
            filterItem: (item: any) => {
                return item.Location === "ScriptLink" && !!item.ScriptBlock;
            },
            key: "ScriptBlock",
            name: "Script Block",
            renderForm: (item: ICustomAction, onChange: (value: string, key: string) => void): JSX.Element => {
                return <SpCustomActionsItemFormScriptLink item={item} onInputChange={onChange} isScriptBlock={true} />;
            },
            spLocationName: "ScriptLink",
            type: "ScriptBlock"
        },
        {
            filterItem: (item: any) => {
                const allowedGroups = ["ActionsMenu", "SiteActions"];
                return item.Location === "Microsoft.SharePoint.StandardMenu" && allowedGroups.indexOf(item.Group) >= 0;
            },
            key: "StandardMenu",
            name: "Standard Menu",
            renderForm: (item: ICustomAction, onChange: (value: string, key: string) => void): JSX.Element => {
                return <SpCustomActionsItemFormStandarMenu item={item} onInputChange={onChange} />;
            },
            spLocationName: "Microsoft.SharePoint.StandardMenu",
            type: "StandardMenu"
        }
    ];
    public get supportedCustomActions(): string[] {
        return this._location.map((item: ILocationItem) => {
            return item.spLocationName;
        });
    }
    public get supportedCustomActionsFilter(): Array<(item: any) => boolean> {
        return this._location.map((item: ILocationItem) => {
            return item.filterItem;
        });
    }
    public get contextMenuItems(): ICustomActionType[] {
        return this._location.map((item: ILocationItem) => {
            return {
                className: "ms-ContextualMenu-item",
                key: item.key,
                name: item.name,
                onRender: this._renderCharmMenuItem,
                type: item.type,
            };
        });
    }
    public getFormComponent(item: ICustomAction, onChange: (value: string, key: string) => void): JSX.Element {
        let filtered: ILocationItem[];
        if (item.location === "ScriptLink") {
            filtered = this._location.filter((location: ILocationItem) => {
                if (item.scriptBlock) {
                    return location.type === "ScriptBlock";
                } else {
                    return location.type === "ScriptSrc";
                }
            });
        } else {
            filtered = this._location.filter((location: ILocationItem) => {
                return location.spLocationName === item.location;
            });
        }

        return (filtered.length > 0) ? filtered[0].renderForm(item, onChange) : null;
    }
    public getLocationItem(item: ICustomAction): ILocationItem {
        let filtered: ILocationItem[];
        if (item.location === "ScriptLink") {
            filtered = this._location.filter((location: ILocationItem) => {
                if (item.scriptBlock) {
                    return location.type === "ScriptBlock";
                } else {
                    return location.type === "ScriptSrc";
                }
            });
        } else {
            filtered = this._location.filter((location: ILocationItem) => {
                return location.spLocationName === item.location;
            });
        }

        return (filtered.length > 0) ? filtered[0] : null;
    }

    public getLocationByKey(key: string): ILocationItem {
        const filtered: ILocationItem[] = this._location.filter((location: ILocationItem) => {
            return location.key === key;
        });

        return (filtered.length > 0) ? filtered[0] : null;
    }

    public getSpLocationNameByType(type: string): string {
        const loc = this.getLocationByKey(type);
        return (loc) ? loc.spLocationName : null;
    }

    private _renderCharmMenuItem(item: ICustomActionType) {
        return <Link className="ms-ContextualMenu-link" to={"newItem/" + item.type}>
            <div className="ms-ContextualMenu-linkContent">
                <span className="ms-ContextualMenu-itemText ms-fontWeight-regular">{item.name}</span>
            </div>
        </Link>;
    }
}

export const customActionLocationHelper = new CustomActionLocationHelper();
