import ApiBase from './../../common/apiBase';
import { ICustomAction } from '../interfaces/spCustomActionsInterfaces'
import { constants } from './../constants/constants'

export default class SpCustomActionsApi extends ApiBase {
    public decodeSpCharacters(strToDecode: string): string {
        strToDecode = strToDecode.replace(constants.CUSTOM_ACTION_REST_PREFIX, constants.EMPTY_STRING);
        var matchesArray = strToDecode.match(constants.CUSTOM_ACTION_REST_DECODE_REGEX);
        if (!!matchesArray) {
            matchesArray.forEach(function (str) {
                var decoded = decodeURIComponent(str.replace(constants.CUSTOM_ACTION_REST_UNDERSCORE_REGEX, constants.EMPTY_STRING).replace(constants.CUSTOM_ACTION_REST_UNDERSCORE_PREFIX_REGEX, constants.PERCET_STRING));
                strToDecode = strToDecode.replace(str, decoded);
            });
        }
        return strToDecode;
    }
    public getCustomActions(): Promise<Array<ICustomAction>> {
        return new Promise((resolve, reject) => {
            this.getRequest(`${_spPageContextInfo.webAbsoluteUrl}${constants.CUSTOM_ACTION_REST_REQUEST_URL}`).then((response:any) =>{
                let props: Array<ICustomAction> = [];
                let rawData = response.data;
                for (let prop in rawData) {
                    let propVal: any = rawData[prop];
                    if (typeof (propVal) === constants.STRING_STRING) {
                        // props.push({
                        //     key: this.decodeSpCharacters(prop),
                        //     value: propVal.replace(constants.CUSTOM_ACTION_REST_DOUBLEQUOTES_REGEX, constants.CUSTOM_ACTION_REST_DOUBLEQUOTES)
                        // });
                    }
                }
                resolve(props);
            }).catch((error:any) =>{
                reject(error);
            });
        });
    }

    public deleteCustomAction(property: ICustomAction): Promise<ICustomAction> {
        return this.setCustomAction(Object.assign({}, property, { value: null }));
    }

    public createCustomAction(property: ICustomAction): Promise<ICustomAction> {
        return this.setCustomAction(property);
    }

    public updateCustomAction(property: ICustomAction): Promise<ICustomAction> {
        return this.setCustomAction(property);
    }

    private setCustomAction(property: ICustomAction): Promise<ICustomAction> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();
            //const allCustomActions = web.get_allCustomActions();

            //allCustomActions.set_item(property.key, property.value);

            web.update();

            ctx.executeQueryAsync((sender: any, err: any) => {
                resolve(property);
            }, this.requestErrorEventHandler.bind(this));
        });
    }
}