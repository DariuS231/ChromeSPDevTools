/// <reference path="../interfaces/spSiteContentInterfaces.ts"/>

import ApiBase from './../../common/apiBase';
import { SpSiteContentConstants as constants } from './../constants/spSiteContentConstants';

export default class SpSiteContentApi extends ApiBase {
    public getLists(): Promise<Array<ISiteContent>> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const siteConetent = web.get_lists();
            
            ctx.load(web);
            ctx.load(siteConetent, `Include(${constants.selectFields.join(',')})`);

            const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                const items: Array<ISiteContent> = [], listEnumerator: any = siteConetent.getEnumerator();

                while (listEnumerator.moveNext()) {
                    let oList: any = listEnumerator.get_current();
                    let listId: any = oList.get_id();
                    const paretnUrl = oList.get_parentWebUrl();
                    let listItem: ISiteContent = {
                        id: listId,
                        title: oList.get_title(),
                        description: oList.get_description(),
                        hidden: oList.get_hidden(),
                        itemCount: oList.get_itemCount(),
                        imageUrl: oList.get_imageUrl(),
                        created: oList.get_created(),
                        lastModified: oList.get_lastItemModifiedDate(),
                        listUrl: oList.get_rootFolder().get_serverRelativeUrl(),
                        settingsUrl: paretnUrl + constants.settingsRelativeUrl + listId,
                        newFormUrl: oList.get_defaultNewFormUrl(),
                        permissionsPageUrl: paretnUrl + constants.permissionsPageUrlOpen + listId + constants.permissionsPageUrlMiddle + listId + constants.permissionsPageUrlClose,
                    }
                    items.push(listItem);
                }
                items.sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                });
                resolve(items);
            };
            ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
        });
    }
}