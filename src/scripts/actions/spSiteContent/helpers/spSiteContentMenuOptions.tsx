import { IContextualMenuItem, IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import utils from "../../common/utils";
import { MenuOptionType } from "../constants/enums";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";

type PropertyFunction = (item: ISiteContent) => ICustomOption | ICustomItemOption | IActionOption | ILinkOption;

interface IModalDialogData {
    dialogTitle: string;
    dialogText: string;
}
interface ICustomSubMenu extends IContextualMenuProps {
    items: Array<ICustomOption | ICustomItemOption | IActionOption | ILinkOption | any>;
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
    protected _options: Array<ILinkOption | IActionOption | ICustomOption | PropertyFunction> = [
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
        (renderItem: ISiteContent): ILinkOption => {
            return {
                key: "Permissions",
                iconProps: {
                    iconName: "Permissions"
                },
                name: "Permissions",
                title: utils.formatString("Permissions: {0}", renderItem.title),
                optionType: MenuOptionType.Link,
                linkTarget: "_blank",
                siteContent: {} as ISiteContent,
                onRender: this._renderCharmMenuItem,
                getOptionLink: (item: ISiteContent): string => {
                    return item.userCanManageList && item.permissionsPageUrl;
                }
            } as ILinkOption;
        },
        {
            key: "Advanced Seetings",
            optionType: MenuOptionType.Parent,
            name: "Advanced Seetings",
            iconProps: {
                iconName: "DeveloperTools"
            },
            subMenuProps: {
                items: [
                    (renderItem: ISiteContent): IActionOption => {
                        const dialogTitle = utils.formatString("Make {0}?", (renderItem.hidden ? "visible" : "hidden"));
                        const dialogText = utils.formatString("Are you sure you want to make the {0} List {1}?",
                            renderItem.title,
                            (renderItem.hidden ? "visible" : "hidden"));
                        const iconName = renderItem.hidden ? "RedEye" : "Hide";
                        const optionTitle = utils.formatString("Make {0}", (renderItem.hidden ? "visible" : "hidden"));
                        return {
                            dialogData: {
                                dialogTitle,
                                dialogText
                            },
                            key: "MakeVisibility",
                            iconProps: {
                                iconName
                            },
                            name: optionTitle,
                            title: optionTitle,
                            optionType: MenuOptionType.Action,
                            actionName: "setListVisibility",
                            visibleIf: (item: ISiteContent): boolean => {
                                return item.userCanManageList;
                            }
                        } as IActionOption;
                    },
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
                            return item.userCanManageList && !item.noCrawl
                                && window.location.hostname.indexOf(".sharepoint.com") > 0;
                        }
                    } as IActionOption,
                    (renderItem: ISiteContent): IActionOption => {
                        const dialogTitle = utils.formatString("{0} attachments?",
                            (renderItem.enableAttachments ? "Disable" : "Enable"));
                        const dialogText = utils.formatString("Are you sure you {0} want to allow users to attach files to items in the {1} list?",
                            (renderItem.enableAttachments ? "don't" : ""),
                            renderItem.title);
                        const optionTitle = utils.formatString("{0} attachments",
                            (renderItem.enableAttachments ? "Disable" : "Enable"));

                        return {
                            dialogData: {
                                dialogTitle,
                                dialogText
                            },
                            key: "SetAttachments",
                            iconProps: {
                                iconName: "Attach"
                            },
                            name: optionTitle,
                            title: optionTitle,
                            optionType: MenuOptionType.Action,
                            actionName: "setListAttachments",
                            visibleIf: (item: ISiteContent): boolean => {
                                return item.userCanManageList && item.baseType === 0;
                            }
                        } as IActionOption;
                    },
                    (renderItem: ISiteContent): IActionOption => {

                        const dialogTitle = utils.formatString("{0} items in search?",
                            (renderItem.noCrawl ? "Show" : "Hide"));
                        const dialogText = utils.formatString("Are you sure you want {0} items from the {1} list in search result pages?",
                            (renderItem.noCrawl ? "show" : "hide"),
                            renderItem.title);
                        const optionTitle = utils.formatString("{0} items in search",
                            (renderItem.noCrawl ? "Show" : "Hide"));
                        return {
                            dialogData: {
                                dialogTitle,
                                dialogText
                            },
                            key: "SetCrawl",
                            iconProps: {
                                iconName: "StackIndicator"
                            },
                            name: optionTitle,
                            title: optionTitle,
                            optionType: MenuOptionType.Action,
                            actionName: "setListNoCrawl",
                            visibleIf: (item: ISiteContent): boolean => {
                                return item.userCanManageList;
                            }
                        } as IActionOption;
                    }
                ]
            }
        },
        (renderItem: ISiteContent): IActionOption => {
            const dialogText = utils.formatString("Are you sure you want to send the {0} List to the recicly bin?",
                renderItem.title);
            return {
                dialogData: {
                    dialogTitle: "Delete List?",
                    dialogText
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
            } as IActionOption;
        }
    ];

    // tslint:disable-next-line:max-line-length
    public getMenuOptions(linkTarge: string, item: ISiteContent, actionItemClick: (ev?: React.MouseEvent<HTMLElement>, item?: IActionOption) => void): Array<ILinkOption | IActionOption | ICustomOption> {
        return this.parseAndFilterOptions(this._options, linkTarge, item, actionItemClick);
    }

    // tslint:disable-next-line:max-line-length
    private parseAndFilterOptions(options: Array<ICustomOption | ICustomItemOption | IActionOption | ILinkOption | PropertyFunction>, linkTarge: string, item: ISiteContent, actionItemClick: (ev?: React.MouseEvent<HTMLElement>, item?: IActionOption) => void)
        : Array<ICustomOption | ICustomItemOption | IActionOption | ILinkOption> {
        const newArray: Array<ICustomOption | ICustomItemOption | IActionOption | ILinkOption> = [];

        options.forEach(option => {
            let parsedOption: ICustomOption | ICustomItemOption | IActionOption | ILinkOption;

            if (typeof option === "function") {
                parsedOption = (option as PropertyFunction)(item);
            } else {
                parsedOption = option as ICustomOption | ICustomItemOption | IActionOption | ILinkOption;
            }

            if (!parsedOption.visibleIf || parsedOption.visibleIf(item)) {
                switch (parsedOption.optionType) {
                    case MenuOptionType.Link:
                        parsedOption = { ...parsedOption, siteContent: item, linkTarget: linkTarge };
                        break;
                    case MenuOptionType.Action:
                        parsedOption = { ...parsedOption, onClick: actionItemClick, siteContent: item };
                        break;
                    case MenuOptionType.Custom:
                        parsedOption = { ...parsedOption, siteContent: item };
                        break;
                    default:
                        parsedOption = parsedOption;
                        break;
                }
                if (typeof parsedOption.subMenuProps !== "undefined") {
                    const newSuMenuProps = {
                        items: this.parseAndFilterOptions(parsedOption.subMenuProps.items, linkTarge, item, actionItemClick)
                    };
                    parsedOption = {
                        ...parsedOption,
                        subMenuProps: newSuMenuProps
                    };
                }
                newArray.push(parsedOption);
            }
        });
        return newArray;
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
