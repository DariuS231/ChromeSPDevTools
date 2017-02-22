import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import { MenuOptionType } from "../constants/enums";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";

export interface ICustomOption extends IContextualMenuItem {
    optionType: MenuOptionType;
    linkTarget: string;
    siteContent: ISiteContent;
    getOptionLink?: (item: ISiteContent) => string;
    visibleIf?: (item: ISiteContent) => boolean;
}
class SpSiteContentMenuHelper {
    protected _options: ICustomOption[] = [
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
            visibleIf: (item: ISiteContent): boolean => {
                return !!item.newFormUrl;
            }
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
            getOptionLink: (item: ISiteContent): string => {
                return item.settingsUrl;
            }
        },
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
            getOptionLink: (item: ISiteContent): string => {
                return item.permissionsPageUrl;
            }
        },
        {
            key: "MakeVisible",
            iconProps: {
                iconName: "RedEye"
            },
            name: "Make Visible",
            title: "Make Visible",
            optionType: MenuOptionType.Link,
            linkTarget: "_blank",
            siteContent: {} as ISiteContent,
            getOptionLink: (item: ISiteContent): string => {
                return item.permissionsPageUrl;
            },
            visibleIf: (item: ISiteContent): boolean => {
                return item.hidden;
            }
        },
        {
            key: "MakeHidden",
            iconProps: {
                iconName: "Hide"
            },
            name: "Make Hidden",
            title: "Make Hidden",
            optionType: MenuOptionType.Link,
            linkTarget: "_blank",
            siteContent: {} as ISiteContent,
            getOptionLink: (item: ISiteContent): string => {
                return item.permissionsPageUrl;
            },
            visibleIf: (item: ISiteContent): boolean => {
                return !item.hidden;
            }
        }
    ];

    public getMenuOptions(linkTarge: string, item: ISiteContent): ICustomOption[] {
        const filteredOpts = this._options.filter((option: ICustomOption) => {
            return !option.visibleIf || option.visibleIf(item);
        })
        return filteredOpts.map((option: ICustomOption) => {
            return {
                key: option.key,
                iconProps: option.iconProps,
                name: option.name,
                title: option.title,
                onRender: this._renderCharmMenuItem,
                linkTarget: linkTarge,
                siteContent: item,
                getOptionLink: option.getOptionLink
            } as ICustomOption;
        });
    }

    private _renderCharmMenuItem(item: ICustomOption) {
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
}

export const spSiteContentMenuHelper = new SpSiteContentMenuHelper();
