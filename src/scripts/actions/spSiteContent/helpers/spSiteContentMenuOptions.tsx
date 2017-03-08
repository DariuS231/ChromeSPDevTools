import { IContextualMenuItem, IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import { MenuOptionType } from "../constants/enums";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";

interface IModalDialogData {
    dialogTitle: string;
    dialogText: string;
}
interface ICustomSubMenu extends IContextualMenuProps{
    items: Array<ICustomOption | ICustomItemOption | IActionOption | ILinkOption>;
}

export interface ICustomOption extends IContextualMenuItem {
    optionType: MenuOptionType;
    visibleIf?: (item: ISiteContent) => boolean;
    subMenuProps?: ICustomSubMenu;
}

export interface ICustomItemOption extends ICustomOption {
    dialogData?: IModalDialogData;
    siteContent: ISiteContent;
}

export interface IActionOption extends ICustomItemOption {
    actionName: string;
}

export interface ILinkOption extends ICustomItemOption {
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
                return item.userCanAddItems && !!item.newFormUrl;
            }
        } as ILinkOption,

        {
            key: "divider_1",
            optionType: MenuOptionType.Divider,
            name: "-",
        },
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
                return item.userCanManageList && item.settingsUrl;
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
                return item.userCanManageList && item.permissionsPageUrl;
            }
        } as ILinkOption,
        {
            key: "Advanced Seetings",
            optionType: MenuOptionType.Parent,
            name: "Advanced Seetings",
            iconProps: {
                iconName: "DeveloperTools"
            },
            subMenuProps: {
                items: [
                    {
                        dialogData: {
                            dialogTitle: "Make visible?",
                            dialogText: "Are you sure you want to make the selected List/Library visible?"
                        },
                        key: "MakeVisible",
                        iconProps: {
                            iconName: "RedEye"
                        },
                        name: "Make Visible",
                        title: "Make Visible",
                        optionType: MenuOptionType.Action,
                        actionName: "setListVisibility",
                        visibleIf: (item: ISiteContent): boolean => {
                            return item.userCanManageList && item.hidden;
                        }
                    } as IActionOption,
                    {
                        dialogData: {
                            dialogTitle: "Make hidden?",
                            dialogText: "Are you sure you want to make the selected List/Library hidden?"
                        },
                        key: "MakeHidden",
                        iconProps: {
                            iconName: "Hide"
                        },
                        name: "Make Hidden",
                        title: "Make Hidden",
                        optionType: MenuOptionType.Action,
                        actionName: "setListVisibility",
                        visibleIf: (item: ISiteContent): boolean => {
                            return item.userCanManageList && !item.hidden;
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
                            return item.userCanManageList && !item.noCrawl && window.location.hostname.indexOf(".sharepoint.com") > 0;
                        }
                    } as IActionOption,
                    {
                        dialogData: {
                            dialogTitle: "Disable attachment?",
                            dialogText: "Are you sure you want prevent users from attaching files to items in this list?"
                        },
                        key: "SetAttachments",
                        iconProps: {
                            iconName: "Attach"
                        },
                        name: "Disable attachments",
                        title: "Disable attachments",
                        optionType: MenuOptionType.Action,
                        actionName: "setListAttachments",
                        visibleIf: (item: ISiteContent): boolean => {
                            return item.userCanManageList && item.enableAttachments && item.baseType === 0;
                        }
                    } as IActionOption,
                    {
                        dialogData: {
                            dialogTitle: "Enable attachment?",
                            dialogText: "Are you sure you want allow users to attach files to items in this list?"
                        },
                        key: "SetAttachments",
                        iconProps: {
                            iconName: "Attach"
                        },
                        name: "Enable attachments",
                        title: "Enable attachments",
                        optionType: MenuOptionType.Action,
                        actionName: "setListAttachments",
                        visibleIf: (item: ISiteContent): boolean => {
                            return item.userCanManageList && !item.enableAttachments && item.baseType === 0;
                        }
                    } as IActionOption,
                    {
                        dialogData: {
                            dialogTitle: "Show items in search?",
                            dialogText: "Are you sure you want allow items from this list to appear in search results?"
                        },
                        key: "SetNoCrawl",
                        iconProps: {
                            iconName: "StackIndicator"
                        },
                        name: "Show items in search",
                        title: "Show items in search",
                        optionType: MenuOptionType.Action,
                        actionName: "setListNoCrawl",
                        visibleIf: (item: ISiteContent): boolean => {
                            return item.userCanManageList && item.noCrawl;
                        }
                    } as IActionOption,
                    {
                        dialogData: {
                            dialogTitle: "Remove items in search?",
                            dialogText: "Are you sure you want prevent items from this list to appear in search results?"
                        },
                        key: "SetNoCrawl",
                        iconProps: {
                            iconName: "StackIndicator"
                        },
                        name: "Don't Show items in search",
                        title: "Don't Show items in search",
                        optionType: MenuOptionType.Action,
                        actionName: "setListNoCrawl",
                        visibleIf: (item: ISiteContent): boolean => {
                            return item.userCanManageList && !item.noCrawl;
                        }
                    } as IActionOption,
                ]
            }
        },
        {
            dialogData: {
                dialogTitle: "Remove Item?",
                dialogText: "Are you sure you want to sent th selected List/Library to the recicly bin?"
            },
            key: "Delete",
            iconProps: {
                iconName: "Delete",
                style: {
                    color: "red"
                }
            },
            name: "Delete",
            title: "Delete",
            optionType: MenuOptionType.Action,
            actionName: "recycleList",
            visibleIf: (item: ISiteContent): boolean => {
                return item.userCanManageList;
            }
        } as IActionOption
    ];

    // tslint:disable-next-line:max-line-length
    public getMenuOptions(linkTarge: string, item: ISiteContent, actionItemClick: (ev?: React.MouseEvent<HTMLElement>, item?: IActionOption) => void): Array<ILinkOption | IActionOption | ICustomOption> {
        return this.parseOptions(this._options, linkTarge, item, actionItemClick);
    }

    // tslint:disable-next-line:max-line-length
    private parseOptions(options: Array<ICustomOption | ICustomItemOption | IActionOption | ILinkOption>, linkTarge: string, item: ISiteContent, actionItemClick: (ev?: React.MouseEvent<HTMLElement>, item?: IActionOption) => void)
        : Array<ICustomOption | ICustomItemOption | IActionOption | ILinkOption> {
        const filteredOpts = options.filter((option: ICustomOption) => {
            return !option.visibleIf || option.visibleIf(item);
        });
        return filteredOpts.map((option: ILinkOption | IActionOption | ICustomOption) => {
            let retOption: ILinkOption | IActionOption | ICustomOption;
            switch (option.optionType) {
                case MenuOptionType.Link:
                    retOption = { ...option, siteContent: item, linkTarget: linkTarge };
                    break;
                case MenuOptionType.Action:
                    retOption = { ...option, onClick: actionItemClick, siteContent: item  };
                    break;
                case MenuOptionType.Custom:
                    retOption = { ...option, siteContent: item };
                    break;
                default:
                    retOption = option;
                    break;
            }
            if (typeof retOption.subMenuProps !== "undefined") {
                const newSuMenuProps = {
                    items: this.parseOptions(retOption.subMenuProps.items, linkTarge, item, actionItemClick)
                };
                retOption = {
                    ...option,
                    subMenuProps: newSuMenuProps
                };
            }
            return retOption;
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
