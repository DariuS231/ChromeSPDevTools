import { ISharePointSiteInfo } from "../../common/interfaces";
import { Favourites } from "../helpers/favourites";
import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import ApiBase from "./../../common/apiBase";
import { SpSiteContentConstants as constants } from "./../constants/spSiteContentConstants";

declare var spInfo: ISharePointSiteInfo;

export default class SpSiteContentApi extends ApiBase {
    public getLists(): Promise<ISiteContent[]> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const siteContent = web.get_lists();

            ctx.load(web);
            ctx.load(siteContent, `Include(${constants.selectFields.join(",")})`);

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                let items: ISiteContent[] = [];
                const listEnumerator: any = siteContent.getEnumerator();
                while (listEnumerator.moveNext()) {
                    const listItem: ISiteContent = this.parseListItem(listEnumerator.get_current());
                    items = items.concat(listItem);
                }
                items.sort((a, b) => a.title.localeCompare(b.title));
                resolve(items);
            };
            const onError = this.getErrorResolver(reject, constants.ERROR_MESSAGE_RESOLVER_GETTING_LISTS);
            ctx.executeQueryAsync(onSuccess, onError);
        });
    }
    public setListVisibility(item: ISiteContent): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const list: SP.List = web.get_lists().getById(item.id);

            list.set_hidden(!item.hidden);

            list.update();
            web.update();
            ctx.load(list);
            ctx.load(web);

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => { resolve(true); };
            const onError = this.getErrorResolver(reject, constants.ERROR_MESSAGE_RESOLVER_SETTING_VISIBILITY);
            ctx.executeQueryAsync(onSuccess, onError);
        });
    }

    public setAttachments(item: ISiteContent): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const list: SP.List = web.get_lists().getById(item.id);

            list.set_enableAttachments(!item.enableAttachments);

            list.update();
            web.update();
            ctx.load(list);
            ctx.load(web);

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => { resolve(true); };
            const onError = this.getErrorResolver(reject, constants.ERROR_MESSAGE_RESOLVER_SETTING_ATTACHMENTS);
            ctx.executeQueryAsync(onSuccess, onError);
        });
    }

    public setNoCrawl(item: ISiteContent): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const list: SP.List = web.get_lists().getById(item.id);

            list.set_noCrawl(!item.noCrawl);

            list.update();
            web.update();
            ctx.load(list);
            ctx.load(web);

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => { resolve(true); };
            const onError = this.getErrorResolver(reject, constants.ERROR_MESSAGE_RESOLVER_SETTING_NO_CRAWL);
            ctx.executeQueryAsync(onSuccess, onError);
        });
    }

    public recycleList(item: ISiteContent): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const list: SP.List = web.get_lists().getById(item.id);

            list.recycle();

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => { resolve(true); };
            const onError = this.getErrorResolver(reject, constants.ERROR_MESSAGE_RESOLVER_DELETING_LIST);
            ctx.executeQueryAsync(onSuccess, onError);
        });
    }
    public reIndex(item: ISiteContent): Promise<SP.UI.DialogResult> {
        return new Promise((resolve, reject) => {
            SP.SOD.execute("sp.ui.dialog.js", "SP.UI.ModalDialog.showModalDialog", {
                dialogReturnValueCallback: (dialogResult: SP.UI.DialogResult) => {
                    resolve(dialogResult);
                },
                title: "Reindex List",
                url: item.reIndexUrl
            });
        });
    }
    private parseListItem(oList: SP.List) {
        const listId: string = oList.get_id().toString();
        let parentUrl = oList.get_parentWebUrl();
        if (parentUrl === "/") { parentUrl = spInfo.webFullUrl; }

        // tslint:disable-next-line:max-line-length
        const permissionPageUrl = `${parentUrl}${constants.permissionsPageUrlOpen}${listId}${constants.permissionsPageUrlMiddle}${listId}${constants.permissionsPageUrlClose}`;

        return {
            baseTemplate: oList.get_baseTemplate(),
            baseType: oList.get_baseType(),
            created: oList.get_created(),
            description: oList.get_description(),
            enableAttachments: oList.get_enableAttachments(),
            hidden: oList.get_hidden(),
            id: listId,
            imageUrl: oList.get_imageUrl(),
            isFavourite: Favourites.Favourites.indexOf(listId) >= 0,
            itemCount: oList.get_itemCount(),
            lastModified: oList.get_lastItemModifiedDate(),
            listUrl: oList.get_rootFolder().get_serverRelativeUrl(),
            newFormUrl: oList.get_defaultNewFormUrl(),
            noCrawl: oList.get_noCrawl(),
            permissionsPageUrl: permissionPageUrl,
            reIndexUrl: `${parentUrl}/_layouts/15/ReindexListDialog.aspx?List={${listId}}`,
            settingsUrl: `${parentUrl}${constants.settingsRelativeUrl}${listId}`,
            title: oList.get_title(),
            userCanAddItems: oList.get_effectiveBasePermissions().has(SP.PermissionKind.addListItems),
            userCanManageList: oList.get_effectiveBasePermissions().has(SP.PermissionKind.manageLists)
        };
    }

}
