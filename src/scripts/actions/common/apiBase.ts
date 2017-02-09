import * as axios from "axios";

export default class ApiBase {
    protected reject: (reason?: any) => void;

    constructor() {
        this.requestErrorEventHandler = this.requestErrorEventHandler.bind(this);
    }

    public requestErrorEventHandler(sender: any, err: SP.ClientRequestFailedEventArgs): void {
        this.reject(err.get_message());
    }

    public getRequest(url: string) {
        return axios.get(url, {
            headers: { accept: "application/json;odata=verbose" }
        });
    }

    public checkUserPermissions(permKind: SP.PermissionKind): Promise<boolean> {
        return new Promise((resolve: (value?: {} | PromiseLike<{}>) => void, reject: (reason?: any) => void) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();

            if (typeof web.doesUserHavePermissions !== "function") {
                this.reject("Cannot check permissions against a non-securable object.");
            } else {
                const ob: SP.BasePermissions = new SP.BasePermissions();
                ob.set(permKind);
                const per: any = web.doesUserHavePermissions(ob);

                const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                    resolve(per.get_value());
                };
                ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
            }
        });

    }
}
