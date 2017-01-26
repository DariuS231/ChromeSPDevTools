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

                const caArray = response.data.value.filter((item: any) => {
                    return ["ScriptLink", "Microsoft.SharePoint.StandardMenu"].indexOf(item.Location) >= 0 ;
                });

                const caArrayLength = caArray.length;
                for (let i = 0; i < caArrayLength; i++) {
                    const ca: any = caArray[i];
                    console.log(ca);
                    const scriptSrc: string = ca.ScriptSrc;
                    const scriptBlock: string = ca.ScriptBlock;
                    const url: string = ca.Url;
                    let locationInternal: string = '';
                    if (scriptSrc !== null && typeof scriptSrc != 'undefined') {
                        locationInternal = 'ScriptLink';
                    } else if (scriptBlock !== null && typeof scriptBlock != 'undefined') {
                        locationInternal = 'ScriptBlock';
                    } else {
                        locationInternal = 'StandardMenu';
                    }

                    cusctomActions.push({
                        id: ca.Id,
                        name: ca.Name,
                        description: ca.Description,
                        group:ca.Group,
                        title: ca.Title,
                        registrationType: ca.RegistrationType,
                        scriptSrc: scriptSrc,
                        scriptBlock: scriptBlock,
                        location: ca.Location,
                        imageUrl: ca.ImageUrl,
                        url: url,
                        locationInternal: locationInternal,
                        sequence: ca.Sequence
                    })
                }
                resolve(cusctomActions);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public deleteCustomAction(caObj: ICustomAction, caType: CustomActionType): Promise<ICustomAction> {
        return new Promise((resolve, reject) => {
            const caGuid: SP.Guid = new SP.Guid(caObj.id);
            const ctx: SP.ClientContext = SP.ClientContext.get_current();
            const ca: SP.UserCustomAction = (caType === CustomActionType.Web)
                ? ctx.get_web().get_userCustomActions().getById(caGuid)
                : ctx.get_site().get_userCustomActions().getById(caGuid);

            ca.deleteObject();
            ctx.executeQueryAsync((sender: any, err: any) => {
                resolve(caObj);
            }, this.requestErrorEventHandler.bind(this));
        })
    }

    public createCustomAction(ca: ICustomAction, caType: CustomActionType): Promise<ICustomAction> {
        return this.setCustomAction(ca, caType, true);
    }

    public updateCustomAction(ca: ICustomAction, caType: CustomActionType): Promise<ICustomAction> {
        return this.setCustomAction(ca, caType, false);
    }

    private setCustomAction(caObj: ICustomAction, caType: CustomActionType, isNewCa: boolean): Promise<ICustomAction> {
        return new Promise((resolve, reject) => {

            const ctx: SP.ClientContext = SP.ClientContext.get_current();
            const partenObj = (caType === CustomActionType.Web)
                ? ctx.get_web()
                : ctx.get_site();

            let ca: SP.UserCustomAction;
            if (isNewCa) {
                ca = partenObj.get_userCustomActions().add();
            } else {
                const caGuid: SP.Guid = new SP.Guid(caObj.id);
                ca = partenObj.get_userCustomActions().getById(caGuid);
            }

            ca.set_title(caObj.title);
            ca.set_name(caObj.name);
            ca.set_description(caObj.description);
            ca.set_sequence(caObj.sequence);
            ca.set_group(caObj.group);

            switch (caObj.locationInternal) {
                case 'ScriptLink':
                    ca.set_location('ScriptLink');
                    ca.set_scriptSrc(caObj.scriptSrc);
                    ca.set_scriptBlock('');
                    ca.set_url('');
                    break;
                case 'ScriptBlock':
                    ca.set_location('ScriptLink');
                    ca.set_scriptBlock(caObj.scriptBlock);
                    ca.set_scriptSrc('');
                    ca.set_url('');
                    break;
                case 'StandardMenu':
                    ca.set_location('Microsoft.SharePoint.StandardMenu');
                    ca.set_url(caObj.url);
                    ca.set_scriptSrc('');
                    ca.set_scriptBlock('');
                    break;

            }

            ca.update();
            ctx.load(ca);
            ctx.executeQueryAsync((sender: any, err: any) => {
                resolve(Object.assign({}, caObj, { id: ca.get_id().toString() }));
            }, this.requestErrorEventHandler.bind(this));
        });
    }
}