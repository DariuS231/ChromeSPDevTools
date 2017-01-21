import ApiBase from './../../common/apiBase';
import { ICustomAction } from '../interfaces/spCustomActionsInterfaces'
import { constants } from './../constants/constants';
import { CustomActionType } from './../constants/enums';

export default class SpCustomActionsApi extends ApiBase {

    public getCustomActions(caType: CustomActionType): Promise<Array<ICustomAction>> {
        return new Promise((resolve, reject) => {
            const reqUrl = `${_spPageContextInfo.webAbsoluteUrl}/_api/${CustomActionType[caType]}${constants.CUSTOM_ACTION_REST_REQUEST_URL}`;
            this.getRequest(reqUrl).then((response: any) => {
                let cusctomActions: Array<ICustomAction> = [];
                let caArray = response.data.value;
                const caArrayLength = caArray.length;
                for (let i = 0; i < caArrayLength; i++) {
                    let ca: any = caArray[i];
                    cusctomActions.push({
                        id: ca.Id,
                        name: ca.Name,
                        description: ca.Description,
                        title: ca.Title,
                        registrationType: ca.RegistrationType,
                        scriptSrc: ca.ScriptSrc,
                        scriptBlock: ca.ScriptBlock,
                        location: ca.Location,
                        locationInternal: ca.Location,
                        sequence: ca.Sequence
                    })
                }
                resolve(cusctomActions);
            }).catch((error: any) => {
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
            web.update();

            ctx.executeQueryAsync((sender: any, err: any) => {
                resolve(property);
            }, this.requestErrorEventHandler.bind(this));
        });
    }
}