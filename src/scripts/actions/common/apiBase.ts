import * as axios from "axios";
import { constants } from "./constants";

export default class ApiBase {
    protected getErroResolver(reject: (reason?: any) => void, actionText: string): (sender: any, err: SP.ClientRequestFailedEventArgs) => void {
        return (sender: any, err: SP.ClientRequestFailedEventArgs): void => {
            const errorMsg: string = err.get_message();
            const errorTrace: string = err.get_stackTrace();
            console.log("An error occured while " + actionText + "\nMessage: " + errorMsg + "\nError Trace: " + errorTrace);
            reject(errorMsg);
        }
    }

    public getRequest(url: string) {
        return axios.get(url, {
            headers: { accept: constants.AXIOS_HEADER_ACCEPT }
        });
    }

    public checkUserPermissions(permKind: SP.PermissionKind): Promise<boolean> {
        return new Promise((resolve: (value?: {} | PromiseLike<{}>) => void, reject: (reason?: any) => void) => {
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
                ctx.executeQueryAsync(onSuccess, this.getErroResolver(reject, constants.MESSAGE_CHECKING_CURRENT_USER_PERMISSIONS));
            }
        });

    }
}
