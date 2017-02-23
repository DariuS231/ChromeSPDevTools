import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import ApiBase from "./../../common/apiBase";
import { SpSiteContentConstants as constants } from "./../constants/spSiteContentConstants";

export default class SpSiteContentApi extends ApiBase {
    public getLists(): Promise<ISiteContent[]> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const siteConetent = web.get_lists();

            ctx.load(web);
            ctx.load(siteConetent, `Include(${constants.selectFields.join(",")})`);

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                let items: ISiteContent[] = [];
                const listEnumerator: any = siteConetent.getEnumerator();
                while (listEnumerator.moveNext()) {
                    const oList: SP.List = listEnumerator.get_current();
                    const listId: any = oList.get_id();
                    let paretnUrl = oList.get_parentWebUrl();
                    if (paretnUrl === "/") {
                        paretnUrl = location.origin;
                    }
                    const reindexUrl = paretnUrl + "/_layouts/15/ReindexListDialog.aspx?List={" + listId  + "}";
                    const permissionPageUrl = paretnUrl +
                        constants.permissionsPageUrlOpen +
                        listId +
                        constants.permissionsPageUrlMiddle +
                        listId +
                        constants.permissionsPageUrlClose;
                    const listItem: ISiteContent = {
                        baseTemplate: oList.get_baseTemplate(),
                        baseType: oList.get_baseType(),
                        created: oList.get_created(),
                        description: oList.get_description(),
                        enableAttachments: oList.get_enableAttachments(),
                        hidden: oList.get_hidden(),
                        id: listId,
                        imageUrl: oList.get_imageUrl(),
                        itemCount: oList.get_itemCount(),
                        lastModified: oList.get_lastItemModifiedDate(),
                        listUrl: oList.get_rootFolder().get_serverRelativeUrl(),
                        newFormUrl: oList.get_defaultNewFormUrl(),
                        noCrawl: oList.get_noCrawl(),
                        permissionsPageUrl: permissionPageUrl,
                        reIndexUrl: reindexUrl,
                        settingsUrl: paretnUrl + constants.settingsRelativeUrl + listId,
                        title: oList.get_title()
                    };
                    items = items.concat(listItem);
                }
                items.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });
                resolve(items);
            };
            ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
        });
    }
    public setListVisibility(item: ISiteContent): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const list: SP.List = web.get_lists().getById(item.id);

            list.set_hidden(!item.hidden);

            list.update();
            web.update();

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                resolve(true);
            };
            ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
        });
    }

    public setAttachments(item: ISiteContent): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const list: SP.List = web.get_lists().getById(item.id);

            list.set_enableAttachments(!item.enableAttachments);

            list.update();
            web.update();

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                resolve(true);
            };
            ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
        });
    }

    public setNoCrawl(item: ISiteContent): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const list: SP.List = web.get_lists().getById(item.id);

            list.set_noCrawl(!item.noCrawl);

            list.update();
            web.update();

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                resolve(true);
            };
            ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
        });
    }

    public recycleList(item: ISiteContent): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const list: SP.List = web.get_lists().getById(item.id);

            list.recycle();

            list.update();
            web.update();

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                resolve(true);
            };
            ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
        });
    }
    public reIndex(item: ISiteContent): Promise<SP.UI.DialogResult> {
        return new Promise((resolve, reject) => {
            SP.SOD.execute("sp.ui.dialog.js", "SP.UI.ModalDialog.showModalDialog", {
                dialogReturnValueCallback: (dialogRedult: SP.UI.DialogResult) => {
                    resolve(dialogRedult);
                },
                title: "Reindex List",
                url: item.reIndexUrl
            });
        });
    }
}
