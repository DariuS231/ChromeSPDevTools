import * as axios from "axios";
import { AppCache } from "./cache";
import { constants } from "./constants";

export default class ApiBase {

    public getWebUrl(): Promise<string> {
        return new Promise((resolve: (value?: string | PromiseLike<string>)
            => void, reject: (reason?: any) => void) => {
            const cacheKey: string = `${window.location.href}_ChromeSPDevTools_url`;
            let url: string = AppCache.get<string>(cacheKey);
            if (!!url) {
                resolve(url);
            } else {
                const ctx: SP.ClientContext = SP.ClientContext.get_current();
                const web: SP.Web = ctx.get_web();
                ctx.load(web);

                ctx.executeQueryAsync(() => {
                    url = web.get_url();
                    AppCache.set(cacheKey, url);
                    resolve(url);
                }, this.getErrorResolver(reject, constants.MESSAGE_GETTING_WEB_URL));
            }
        });
    }
    public getRequest(url: string) {
        return axios.get(url, {
            headers: { accept: constants.AXIOS_HEADER_ACCEPT }
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
