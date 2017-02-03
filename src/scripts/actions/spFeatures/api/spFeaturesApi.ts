import ApiBase from './../../common/apiBase';
import { IFeature } from '../interfaces/spFeaturesInterfaces';
import { constants } from './../constants/constants';
import { FeatureScope } from '../constants/enums';

export default class SpFeaturesApi extends ApiBase {

    public getFeatures(scope: FeatureScope): Promise<Array<IFeature>> {
        return new Promise((resolve, reject) => {
            const url = `${_spPageContextInfo.webAbsoluteUrl}/_layouts/15/ManageFeatures.aspx${scope === FeatureScope.Site ? '?Scope=Site' : ''}`;

            this.getRequest(url).then((response: any) => {
                let items: Array<IFeature> = [];

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response, "text/xml");

                const featuresElements = xmlDoc.querySelectorAll('.ms-ButtonHeightWidth');
                for (let i = 0, l = featuresElements.length; i < l; i++) {
                    const element = featuresElements[i];
                    const container = element.parentElement.parentElement.parentElement;
                    const name = container.querySelector('h3').textContent;
                }
                // htmlFeatures.find(".ms-ButtonHeightWidth").parent().parent().parent().each(function () {
                //     let featureLine = jQuery(this);
                //     let name: any = featureLine.find("h3:first").text();
                //     let id: any = featureLine.find(".ms-ButtonHeightWidth:first").parent().attr("id");
                //     //temp we put the description in the name
                //     let description: any = name;
                //     let activated: boolean = featureLine.find(".ms-ButtonHeightWidth:first").attr("value") === "Activate" ? true : false;
                //     let toggleButton: boolean = featureLine.find(".ms-ButtonHeightWidth:first").attr("value") === "Activate" ? false : true;
                //     let scope: SP.FeatureDefinitionScope = featureType;
                //     let logo: string = featureLine.find("img").attr("src");
                //     //console.log("feature name:" + name + " - id: " + id + " - activate: " + activated);
                //     items.push({ id: id, name: name, description: name, scope: scope, activated: activated, logo: logo });
                // });
                console.log(xmlDoc);
                resolve();
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

            ctx.executeQueryAsync((sender: any, err: any) => {
                feature.activated = !feature.activated;
                resolve(feature);
            }, this.requestErrorEventHandler.bind(this));
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
                feature.activated = !feature.activated;
                resolve(feature);
            }, this.requestErrorEventHandler.bind(this));
        });
    }


}