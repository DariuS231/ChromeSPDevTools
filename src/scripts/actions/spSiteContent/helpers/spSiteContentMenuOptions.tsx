import { IContextualMenuItem, IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import utils from "../../common/utils";
import { MenuOptionType } from "../constants/enums";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";

type PropertyFunction = (item: ISiteContent) => ICustomOption | ICustomItemOption | IActionOption | ILinkOption;
type siteCtOption = ICustomOption | ICustomItemOption | IActionOption | ILinkOption | PropertyFunction;
type siteCtMenuOption = ICustomOption | ICustomItemOption | IActionOption | ILinkOption | any;
type actionItemClick = (ev?: React.MouseEvent<HTMLElement>, item?: IActionOption) => void;

interface IModalDialogData {
    dialogTitle: string;
    dialogText: string;
}
interface ICustomSubMenu extends IContextualMenuProps {
    items: siteCtMenuOption[];
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
    protected _options: siteCtOption[] = [
        {
            key: "New Item",
            iconProps: { iconName: "Add" },
            name: "New Item",
            title: "New Item",
            optionType: MenuOptionType.Link,
            linkTarget: "_blank",
            siteContent: {} as ISiteContent,
            getOptionLink: (item: ISiteContent): string => item.newFormUrl,
            onRender: this._renderCharmMenuItem,
            visibleIf: (item: ISiteContent): boolean => item.userCanAddItems && !!item.newFormUrl
        } as ILinkOption,
        {
            key: "divider_1",
            optionType: MenuOptionType.Divider,
            name: "-",
        },
        {
            key: "Settings",
            iconProps: { iconName: "Settings" },
            name: "Settings",
            title: "Settings",
            optionType: MenuOptionType.Link,
            linkTarget: "_blank",
            siteContent: {} as ISiteContent,
            onRender: this._renderCharmMenuItem,
            getOptionLink: (item: ISiteContent): string => item.userCanManageList && item.settingsUrl
        } as ILinkOption,
        (renderItem: ISiteContent): ILinkOption => {
            return {
                key: "Permissions",
                iconProps: { iconName: "Permissions" },
                name: "Permissions",
                title: `Permissions: ${renderItem.title}`,
                optionType: MenuOptionType.Link,
                linkTarget: "_blank",
                siteContent: {} as ISiteContent,
                onRender: this._renderCharmMenuItem,
                getOptionLink: (item: ISiteContent): string => item.userCanManageList && item.permissionsPageUrl
            } as ILinkOption;
        },
        {
            key: "Advanced Settings",
            optionType: MenuOptionType.Parent,
            name: "Advanced Settings",
            iconProps: { iconName: "DeveloperTools" },
            subMenuProps: {
                items: [
                    (renderItem: ISiteContent): IActionOption => {
                        const dialogTitle = `Make ${(renderItem.hidden ? "visible" : "hidden")}?`;
                        const dialogText = `Are you sure you want to make the ${renderItem.title}
                         List ${(renderItem.hidden ? "visible" : "hidden")}?`;
                        const iconName = renderItem.hidden ? "RedEye" : "Hide";
                        const optionTitle = `Make ${(renderItem.hidden ? "visible" : "hidden")}`;
                        return {
                            dialogData: { dialogTitle, dialogText },
                            key: "MakeVisibility",
                            iconProps: { iconName },
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
                        iconProps: { iconName: "Search" },
                        name: "Re-Index",
                        title: "Re-Index",
                        optionType: MenuOptionType.Action,
                        actionName: "reIndexList",
                        // tslint:disable-next-line:max-line-length
                        visibleIf: (item: ISiteContent): boolean => item.userCanManageList && !item.noCrawl && window.location.hostname.indexOf(".sharepoint.com") > 0
                    } as IActionOption,
                    (renderItem: ISiteContent): IActionOption => {
                        const dialogTitle = `${(renderItem.enableAttachments ? "Disable" : "Enable")} attachments?`;
                        const dialogText = `Are you sure you ${(renderItem.enableAttachments ? "don't" : "")}
                         want to allow users to attach files to items in the ${renderItem.title} list?`;
                        const optionTitle = `${(renderItem.enableAttachments ? "Disable" : "Enable")} attachments`;

                        return {
                            dialogData: { dialogTitle, dialogText },
                            key: "SetAttachments",
                            iconProps: { iconName: "Attach" },
                            name: optionTitle,
                            title: optionTitle,
                            optionType: MenuOptionType.Action,
                            actionName: "setListAttachments",
                            visibleIf: (item: ISiteContent): boolean => item.userCanManageList && item.baseType === 0
                        } as IActionOption;
                    },
                    (renderItem: ISiteContent): IActionOption => {

                        const dialogTitle = `${(renderItem.noCrawl ? "Show" : "Hide")} items in search?`;
                        const dialogText = `Are you sure you want ${(renderItem.noCrawl ? "show" : "hide")}
                         items from the ${renderItem.title} list in search result pages?`;
                        const optionTitle = `${(renderItem.noCrawl ? "Show" : "Hide")} items in search`;
                        return {
                            dialogData: { dialogTitle, dialogText },
                            key: "SetCrawl",
                            iconProps: { iconName: "StackIndicator" },
                            name: optionTitle,
                            title: optionTitle,
                            optionType: MenuOptionType.Action,
                            actionName: "setListNoCrawl",
                            visibleIf: (item: ISiteContent): boolean => item.userCanManageList
                        } as IActionOption;
                    }
                ]
            }
        },
        (renderItem: ISiteContent): IActionOption => {
            const dialogText = `Are you sure you want to send the ${renderItem.title} List to the recycle bin?`;
            return {
                dialogData: { dialogTitle: "Delete List?", dialogText },
                key: "Delete",
                iconProps: { iconName: "Delete", style: { color: "red" } },
                name: "Delete",
                title: "Delete",
                optionType: MenuOptionType.Action,
                actionName: "recycleList",
                visibleIf: (item: ISiteContent): boolean => item.userCanManageList
            } as IActionOption;
        }
    ];

    // tslint:disable-next-line:max-line-length
    public getMenuOptions(linkTarget: string, item: ISiteContent, actionItemClick: actionItemClick): siteCtMenuOption[] {
        return this.parseAndFilterOptions(this._options, linkTarget, item, actionItemClick);
    }

    // tslint:disable-next-line:max-line-length
    private parseAndFilterOptions(options: siteCtOption[], linkTarget: string, item: ISiteContent, actionItemClick: actionItemClick): siteCtMenuOption[] {
        const newArray: siteCtMenuOption[] = [];

        options.forEach((option: siteCtOption) => {
            let parsedOption: siteCtMenuOption;

            if (typeof option === "function") {
                parsedOption = (option as PropertyFunction)(item);
            } else {
                parsedOption = option as siteCtMenuOption;
            }

            if (!parsedOption.visibleIf || parsedOption.visibleIf(item)) {
                switch (parsedOption.optionType) {
                    case MenuOptionType.Link:
                        parsedOption = { ...parsedOption, siteContent: item, linkTarget };
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
                        items: this.parseAndFilterOptions(parsedOption.subMenuProps.items,
                            linkTarget, item, actionItemClick)
                    };
                    parsedOption = { ...parsedOption, subMenuProps: newSuMenuProps };
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
        return (
            <a target={item.linkTarget} href={linkUrl} title={item.title} className="ms-ContextualMenu-link"
                key={item.key}>
                <div className="ms-ContextualMenu-linkContent">
                    <i className={iconClass} />
                    <span className="ms-ContextualMenu-itemText">{item.name}</span>
                </div>
            </a>);
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
