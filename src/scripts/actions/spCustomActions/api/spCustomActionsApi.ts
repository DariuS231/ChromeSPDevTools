import { customActionLocationHelper } from "../helpers/customActionLocation";
import { ICustomAction } from "../interfaces/spCustomActionsInterfaces";
import ApiBase from "./../../common/apiBase";
import { constants } from "./../constants/constants";
import { CustomActionType } from "./../constants/enums";

export default class SpCustomActionsApi extends ApiBase {

    public getCustomActions(caType: CustomActionType): Promise<ICustomAction[]> {
        return new Promise((resolve, reject) => {
            // tslint:disable-next-line:max-line-length
            const reqUrl = `${_spPageContextInfo.webAbsoluteUrl}/_api/${CustomActionType[caType]}${constants.CUSTOM_ACTION_REST_REQUEST_URL}`;
            this.getRequest(reqUrl).then((response: any) => {
                const cusctomActions: ICustomAction[] = [];

                const caArray = response.data.value.filter((item: any) => {
                    return customActionLocationHelper.supportedCustomActions.indexOf(item.Location) >= 0;
                });

                const caArrayLength = caArray.length;
                for (let i = 0; i < caArrayLength; i++) {
                    const ca: any = caArray[i];
                    const scriptSrc: string = ca.ScriptSrc;
                    const scriptBlock: string = ca.ScriptBlock;
                    const url: string = ca.Url;

                    cusctomActions.push({
                        description: ca.Description,
                        group: ca.Group,
                        id: ca.Id,
                        imageUrl: ca.ImageUrl,
                        location: ca.Location,
                        name: ca.Name,
                        registrationType: ca.RegistrationType,
                        sequence: ca.Sequence,
                        scriptBlock,
                        scriptSrc,
                        title: ca.Title,
                        url
                    });
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
        });
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
            ca.set_location(caObj.location);
            ca.set_scriptSrc(caObj.scriptSrc);
            ca.set_scriptBlock(caObj.scriptBlock);
            ca.set_url(caObj.url);
            ca.set_imageUrl(caObj.imageUrl);

            ca.update();
            ctx.load(ca);
            ctx.executeQueryAsync((sender: any, err: any) => {
                resolve({ ...caObj, id: ca.get_id().toString() });
            }, this.requestErrorEventHandler.bind(this));
        });
    }
}
