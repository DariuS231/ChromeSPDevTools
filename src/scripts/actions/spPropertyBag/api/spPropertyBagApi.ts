import ApiBase from './../../common/apiBase';
import { IProperty } from '../interfaces/spPropertyBagInterfaces'

export default class SpPropertyBagApi extends ApiBase {
    public decodeSpCharacters(strToDecode: string): string {
        strToDecode = strToDecode.replace('OData_','');
        var matchesArray = strToDecode.match(/_x00([0-9A-F]{2})_/gi);
        if (!!matchesArray) {
            matchesArray.forEach(function (str) {
                var decoded = decodeURIComponent(str.replace(/_/gi, '').replace(/x00/gi, '%'));
                strToDecode = strToDecode.replace(str, decoded);
            });
        }
        return strToDecode;
    }
    public getProperties(): Promise<Array<IProperty>> {
        return new Promise((resolve, reject) => {
            this.getRequest(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/allProperties`).then((response:any) =>{
                let props: Array<IProperty> = [];
                let rawData = response.data;
                for (let prop in rawData) {
                    let propVal: any = rawData[prop];
                    if (typeof (propVal) === "string") {
                        props.push({
                            key: this.decodeSpCharacters(prop),
                            value: propVal.replace(/"/g, '&quot;')
                        });
                    }
                }
                resolve(props);
            }).catch((error:any) =>{
                reject(error);
            });
        });
    }

    public deleteProperty(property: IProperty): Promise<IProperty> {
        return this.setProperty(Object.assign({}, property, { value: null }));
    }

    public createProperty(property: IProperty): Promise<IProperty> {
        return this.setProperty(property);
    }

    public updateProperty(property: IProperty): Promise<IProperty> {
        return this.setProperty(property);
    }

    private setProperty(property: IProperty): Promise<IProperty> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            const allProperties = web.get_allProperties();

            allProperties.set_item(property.key, property.value);

            web.update();

            ctx.executeQueryAsync((sender: any, err: any) => {
                resolve(property);
            }, this.requestErrorEventHandler.bind(this));
        });
    }
}