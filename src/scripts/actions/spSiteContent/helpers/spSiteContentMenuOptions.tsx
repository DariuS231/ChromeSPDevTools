import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import { MenuOptionType } from "../constants/enums";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";

export interface ICustomOption extends IContextualMenuItem {
    optionType: MenuOptionType;
    linkTarget: string;
    siteContent: ISiteContent;
    getOptionLink?: (item: ISiteContent) => string;
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
        }
    ];

    public getMenuOptions(linkTarge: string, item: ISiteContent): ICustomOption[] {
        return this._options.map((option) => {
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
        return <li title={item.title} className="ms-ContextualMenu-item">
            <a target={item.linkTarget} href={linkUrl} title={item.title} className="ms-ContextualMenu-link">
                <div className="ms-ContextualMenu-linkContent">
                    <i className={iconClass} />
                    <span className="ms-ContextualMenu-itemText">{item.name}</span>
                </div>
            </a>
        </li>;
    }
}

export const spSiteContentMenuHelper = new SpSiteContentMenuHelper();
