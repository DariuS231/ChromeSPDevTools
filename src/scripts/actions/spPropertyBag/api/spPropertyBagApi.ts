import ApiBase from './../../common/apiBase';
import { ItemMode } from './../constants/enums'
import { IProperty } from '../interfaces/spPropertyBagInterfaces'

export default class SpPropertyBagApi extends ApiBase {
    public getProperties(): Promise<Array<IProperty>> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const allProperties = web.get_allProperties();
            
            ctx.load(web);
            ctx.load(allProperties);

            let onSuccess = (sender: any, err: any) => {
                let propsKeyVal: any = allProperties.get_fieldValues();

                let items: Array<IProperty> = [];
                for (let p in propsKeyVal) {
                    if (propsKeyVal.hasOwnProperty(p)) {
                        let propVal: any = propsKeyVal[p];
                        let type: string = typeof (propVal);
                        if (type === "string") {
                            items.push({ 
                                key: p, 
                                value: propVal.replace(/"/g, '&quot;'),
                                itemMode: ItemMode.VIEW
                            });
                        }
                    }
                }
                items.sort(function (a, b) {
                    return a.key.localeCompare(b.key);
                });
                resolve(items);
            };
            ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
        });
    }
}