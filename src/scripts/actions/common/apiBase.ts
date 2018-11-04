import * as axios from "axios";
import { ISharePointSiteInfo } from "./../common/interfaces";
import { constants } from "./constants";

declare var spInfo: ISharePointSiteInfo;

export default class ApiBase {

    public getWebUrl(): Promise<string> {
        return new Promise((resolve: (value?: string | PromiseLike<string>)
            => void, reject: (reason?: any) => void) => {
                resolve(spInfo.webFullUrl);
        });
    }
    public getRequest(url: string) {
        return axios.get(url, {
            headers: {
                "accept": constants.AXIOS_HEADER_ACCEPT,
                "Cache-Control": "no-cache"
            }
        });
    }

    public checkUserPermissions(permKind: SP.PermissionKind): Promise<boolean> {
        return new Promise((resolve: (value?: boolean | PromiseLike<boolean>)
            => void, reject: (reason?: any) => void) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();

            if (typeof web.doesUserHavePermissions !== constants.TYPE_OF_FUNCTION) {
                reject(constants.MESSAGE_CANT_CHECK_PERMISSIONS);
            } else {
                const ob: SP.BasePermissions = new SP.BasePermissions();
                ob.set(permKind);
                const per: any = web.doesUserHavePermissions(ob);

                const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                    resolve(per.get_value());
                };
                ctx.executeQueryAsync(
                    onSuccess,
                    this.getErrorResolver(reject, constants.MESSAGE_CHECKING_CURRENT_USER_PERMISSIONS)
                );
            }
        });

    }
    protected getErrorResolver(reject: (reason?: any) => void, actionText: string)
        : (sender: any, err: SP.ClientRequestFailedEventArgs) => void {
        return (sender: any, err: SP.ClientRequestFailedEventArgs): void => {
            const errorMsg: string = err.get_message();
            const errorTrace: string = err.get_stackTrace();
            // tslint:disable-next-line:no-console
            console.log(`An error occurred while ${actionText}\nMessage: ${errorMsg}\nError Trace: ${errorTrace}`);
            reject(errorMsg);
        }
    }


}
