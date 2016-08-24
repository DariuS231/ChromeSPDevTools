/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
import * as React from 'react';


import { SpSiteContentStyles as styles } from './../common/Styles'

interface SpSiteContentProps {

}
interface SpSiteContentState {

}

export default class SpSiteContent extends React.Component<SpSiteContentProps, SpSiteContentState> {
    ctx: SP.ClientContext;
    web: any;
    siteConetent: any;
    reloadPage: boolean;
    constructor() {
        super();

        this.reloadPage = false;
    }


    private getWebProperties() {
        this.siteConetent = this.web.get_lists();
        this.ctx.load(this.web);
        this.ctx.load(this.siteConetent, 'Include(RootFolder,Title,Id,Hidden,ItemCount,Created,ImageUrl,LastItemModifiedDate)');

        let onSuccess: Function = Function.createDelegate(this, (sender: any, err: any) => {

            let items: Array<any> = [];
            var listEnumerator = this.siteConetent.getEnumerator();

            while (listEnumerator.moveNext()) {
                var oList = listEnumerator.get_current();
                var listId = oList.get_id();
                var listItem = {
                    id:listId,
                    title:oList.get_title(),
                    hidden:oList.get_hidden(),
                    itemCount:oList.get_itemCount(),
                    imageUrl: oList.get_imageUrl(),
                    created: oList.get_created(),
                    lastModified: oList.get_lastItemModifiedDate(),
                    settingsUrl: '/_layouts/15/listedit.aspx?List=' +listId
                }
                
                console.log(listItem);
            }
            items.sort(function (a, b) {
                return a.key.localeCompare(b.key);
            });
        });
        let onError: Function = Function.createDelegate(this, function () { console.log("ERROR"); });
        this.ctx.executeQueryAsync(onSuccess, onError);
    }

    private componentDidMount() {
        this.ctx = SP.ClientContext.get_current();
        this.web = this.ctx.get_web();
        this.getWebProperties();
    }
    public render() {

        return (
            <div>
                <h2>All Site Content</h2>
            </div>);


    }
}