import ApiBase from './../../common/apiBase';
import { IFeature } from '../interfaces/spFeaturesInterfaces';
import { constants } from './../constants/constants';
import { FeatureScope } from '../constants/enums';

export default class SpFeaturesApi extends ApiBase {

    public getFeatures(scope: FeatureScope): Promise<Array<IFeature>> {
        return new Promise((resolve, reject) => {
            const url = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/ManageFeatures.aspx' + (scope === FeatureScope.Site ? '?Scope=Site' : '');

            this.getRequest(url).then((response: any) => {
                let items: Array<IFeature> = [];

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");
                const featuresElements = xmlDoc.querySelectorAll('.ms-ButtonHeightWidth');
                for (let i = 0, l = featuresElements.length; i < l; i++) {
                    const container = featuresElements[i].parentElement.parentElement.parentElement;
                    items.push({
                        id: container.querySelectorAll('.ms-vb2[id]')[0].getAttribute('id'),
                        name: container.querySelector('h3').textContent,
                        description: container.querySelectorAll('.ms-vb2')[1].textContent,
                        scope: scope,
                        activated: (container.querySelectorAll('input.ms-ButtonHeightWidth')[0]).getAttribute('value') === 'Deactivate',
                        logo: container.querySelectorAll('img')[0].getAttribute('src')
                    });
                }
                resolve(items);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public activateFeature(feature: IFeature): Promise<IFeature> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            const ctx = SP.ClientContext.get_current();
            if (feature.scope === FeatureScope.Site) {
                ctx.get_site().get_features().add(new SP.Guid(feature.id), true, SP.FeatureDefinitionScope.none);
            }
            else {
                ctx.get_web().get_features().add(new SP.Guid(feature.id), true, SP.FeatureDefinitionScope.none);
            }
            const onSuccess = (sender: any, err: any) => {
                resolve(Object.assign({}, feature, { activated: true }));
            };
            const onError = (sender: any, err: any) => {
                if (feature.scope === FeatureScope.Site) {
                    ctx.get_site().get_features().add(new SP.Guid(feature.id), true, SP.FeatureDefinitionScope.site);
                }
                else {
                    ctx.get_web().get_features().add(new SP.Guid(feature.id), true, SP.FeatureDefinitionScope.site);
                }
                ctx.executeQueryAsync(onSuccess, this.requestErrorEventHandler.bind(this));
            }
            ctx.executeQueryAsync(onSuccess, onError);
        });
    }

    public deActivateFeature(feature: IFeature): Promise<IFeature> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            const ctx = SP.ClientContext.get_current();

            if (feature.scope === FeatureScope.Site) {
                ctx.get_site().get_features().remove(new SP.Guid(feature.id), true);
            }
            else {
                ctx.get_web().get_features().remove(new SP.Guid(feature.id), true);
            }

            ctx.executeQueryAsync((sender: any, err: any) => {
                resolve(Object.assign({}, feature, { activated: false }));
            }, this.requestErrorEventHandler.bind(this));
        });
    }


}