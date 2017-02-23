import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import { MenuOptionType } from "../constants/enums";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";

export interface ICustomOption extends IContextualMenuItem {
    optionType: MenuOptionType;
    siteContent: ISiteContent;
    visibleIf?: (item: ISiteContent) => boolean;
}

export interface IActionOption extends ICustomOption {
    actionName: string;
}

export interface ILinkOption extends ICustomOption {
    linkTarget: string;
    actionName: string;
    getOptionLink?: (item: ISiteContent) => string;
}
class SpSiteContentMenuHelper {
    protected _options: Array<ILinkOption | IActionOption | ICustomOption> = [
        {
            key: "New Item",
            iconProps: {
                iconName: "Add"
            },
            name: "New Item",
            title: "New Item",
            optionType: MenuOptionType.Link,
            linkTarget: "_blank",
            siteContent: {} as ISiteContent,
            getOptionLink: (item: ISiteContent): string => {
                return item.newFormUrl;
            },
            onRender: this._renderCharmMenuItem,
            visibleIf: (item: ISiteContent): boolean => {
                return !!item.newFormUrl;
            }
        } as ILinkOption,
        {
            key: "Settings",
            iconProps: {
                iconName: "Settings"
            },
            name: "Settings",
            title: "Settings",
            optionType: MenuOptionType.Link,
            linkTarget: "_blank",
            siteContent: {} as ISiteContent,
            onRender: this._renderCharmMenuItem,
            getOptionLink: (item: ISiteContent): string => {
                return item.settingsUrl;
            }
        } as ILinkOption,
        {
            key: "Permissions",
            iconProps: {
                iconName: "Permissions"
            },
            name: "Permissions",
            title: "Permissions",
            optionType: MenuOptionType.Link,
            linkTarget: "_blank",
            siteContent: {} as ISiteContent,
            onRender: this._renderCharmMenuItem,
            getOptionLink: (item: ISiteContent): string => {
                return item.permissionsPageUrl;
            }
        } as ILinkOption,
        {
            key: "MakeVisible",
            iconProps: {
                iconName: "RedEye"
            },
            name: "Make Visible",
            title: "Make Visible",
            optionType: MenuOptionType.Action,
            actionName: "setListVisibility",
            visibleIf: (item: ISiteContent): boolean => {
                return item.hidden;
            }
        } as IActionOption,
        {
            key: "MakeHidden",
            iconProps: {
                iconName: "Hide"
            },
            name: "Make Hidden",
            title: "Make Hidden",
            optionType: MenuOptionType.Action,
            actionName: "setListVisibility",
            visibleIf: (item: ISiteContent): boolean => {
                return !item.hidden;
            }
        } as IActionOption,
        {
            key: "ReIndex",
            iconProps: {
                iconName: "Search"
            },
            name: "Re-Index",
            title: "Re-Index",
            optionType: MenuOptionType.Action,
            actionName: "reIndexList",
            visibleIf: (item: ISiteContent): boolean => {
                return !item.noCrawl;
            }
        } as IActionOption
    ];


    // tslint:disable-next-line:max-line-length
    public getMenuOptions(linkTarge: string, item: ISiteContent, actionItemClick: (ev?: React.MouseEvent<HTMLElement>, item?: IActionOption) => void): Array<ILinkOption | IActionOption | IContextualMenuItem> {
        const filteredOpts = this._options.filter((option: ICustomOption) => {
            return !option.visibleIf || option.visibleIf(item);
        });
        return filteredOpts.map((option: ILinkOption | IActionOption | ICustomOption) => {

            switch (option.optionType) {
                case MenuOptionType.Link:
                    return { ...option, siteContent: item, linkTarget: linkTarge };
                case MenuOptionType.Action:
                    return { ...option, onClick: actionItemClick };
                case MenuOptionType.Custom:
                    return { ...option, siteContent: item };
                default:
                    return option;
            }
        });
    }

    private _renderCharmMenuItem(item: ILinkOption) {
        const linkUrl: string = item.getOptionLink(item.siteContent);
        // tslint:disable-next-line:max-line-length
        const iconClass = `ms-Icon ms-Icon--${item.iconProps.iconName} ms-ContextualMenu-icon ms-ContextualMenu-iconColor`;
        return <a target={item.linkTarget} href={linkUrl} title={item.title} className="ms-ContextualMenu-link" key={item.key}>
            <div className="ms-ContextualMenu-linkContent">
                <i className={iconClass} />
                <span className="ms-ContextualMenu-itemText">{item.name}</span>
            </div>
        </a>;
    }

    private _onReIndexClick(ev?: React.MouseEvent<HTMLElement>, item?: IActionOption) {
        SP.SOD.execute("sp.ui.dialog.js", "SP.UI.ModalDialog.showModalDialog", {
            dialogReturnValueCallback: () => { },
            title: "Reindex List",
            url: item.siteContent.reIndexUrl
        });
    }
}

export const spSiteContentMenuHelper = new SpSiteContentMenuHelper();
