import { ISiteContent } from "../interfaces/spSiteContentInterfaces";
import ApiBase from "./../../common/apiBase";
import { SpSiteContentConstants as constants } from "./../constants/spSiteContentConstants";

export default class SpSiteContentApi extends ApiBase {
    public getLists(): Promise<ISiteContent[]> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const siteConetent = web.get_lists();

            ctx.load(web);
            ctx.load(siteConetent, `Include(${constants.selectFields.join(",")})`);

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                const items: ISiteContent[] = [];
                const listEnumerator: any = siteConetent.getEnumerator();

                while (listEnumerator.moveNext()) {
                    const oList: any = listEnumerator.get_current();
                    const listId: any = oList.get_id();
                    const paretnUrl = oList.get_parentWebUrl();
                    const permissionPageUrl = paretnUrl +
                        constants.permissionsPageUrlOpen +
                        listId +
                        constants.permissionsPageUrlMiddle +
                        listId +
                        constants.permissionsPageUrlClose;
                    const listItem: ISiteContent = {
                        created: oList.get_created(),
                        description: oList.get_description(),
                        hidden: oList.get_hidden(),
                        id: listId,
                        imageUrl: oList.get_imageUrl(),
                        itemCount: oList.get_itemCount(),
                        lastModified: oList.get_lastItemModifiedDate(),
                        listUrl: oList.get_rootFolder().get_serverRelativeUrl(),
                        newFormUrl: oList.get_defaultNewFormUrl(),
                        permissionsPageUrl: permissionPageUrl,
                        settingsUrl: paretnUrl + constants.settingsRelativeUrl + listId,
                        title: oList.get_title()
                    };
                    items.push(listItem);
                }
                items.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });
                resolve(items);
            };
            ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
        });
    }
}
