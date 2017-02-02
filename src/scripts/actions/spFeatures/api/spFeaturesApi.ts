import ApiBase from './../../common/apiBase';
import { IFeature } from '../interfaces/spFeaturesInterfaces';
import { constants } from './../constants/constants'

export default class SpFeaturesApi extends ApiBase {
    
    public getFeatures(): Promise<Array<IFeature>> {
        return new Promise((resolve, reject) => {
            this.getRequest(``).then((response:any) =>{
                
                resolve();
            }).catch((error:any) =>{
                reject(error);
            });
        });
    }

    public activateFeature(property: IFeature): Promise<IFeature> {
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

    public deActivateFeature(property: IFeature): Promise<IFeature> {
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