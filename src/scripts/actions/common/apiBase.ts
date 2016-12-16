declare var reject: any;

export default class ApiBase {
    ctx: SP.ClientContext;
    web: SP.Web;
    site: SP.Site;
    constructor() {
        this.ctx = SP.ClientContext.get_current();
        this.web = this.ctx.get_web();
        this.site = this.ctx.get_site();
    }

    public requestErrorEventHandler(sender: any, err: SP.ClientRequestFailedEventArgs): void {
        reject(err.get_message());
    }

    public checkUserPermissions(permKind: SP.PermissionKind): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (typeof this.web.doesUserHavePermissions !== "function") {
                reject('Cannot check permissions against a non-securable object.')
            } else {
                const ob: SP.BasePermissions = new SP.BasePermissions();
                ob.set(permKind);
                const per: any = this.web.doesUserHavePermissions(ob);

                const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                    var hasPermissions = per.get_value();
                    resolve(hasPermissions);
                };
                this.ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
            }
        });

    }
}