declare var reject: any;

export default class ApiBase {

    public requestErrorEventHandler(sender: any, err: SP.ClientRequestFailedEventArgs): void {
        reject(err.get_message());
    }

    public checkUserPermissions(permKind: SP.PermissionKind): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            const web = ctx.get_web();

            if (typeof web.doesUserHavePermissions !== "function") {
                reject('Cannot check permissions against a non-securable object.')
            } else {
                const ob: SP.BasePermissions = new SP.BasePermissions();
                ob.set(permKind);
                const per: any = web.doesUserHavePermissions(ob);

                const onSuccess = (sender: any, args: SP.ClientRequestSucceededEventArgs) => {
                    var hasPermissions = per.get_value();
                    resolve(hasPermissions);
                };
                ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler);
            }
        });

    }
}