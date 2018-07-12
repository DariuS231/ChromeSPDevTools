import { FeatureScope } from "../constants/enums";
import { IFeature } from "../interfaces/spFeaturesInterfaces";
import ApiBase from "./../../common/apiBase";
import { constants } from "./../constants/constants";

export default class SpFeaturesApi extends ApiBase {

    public async getFeatures(scope: FeatureScope): Promise<IFeature[]> {

        const webUrl: string = await this.getWebUrl();
        const url = webUrl + `/_layouts/ManageFeatures.aspx${(scope === FeatureScope.Site ? "?Scope=Site" : "")}`;

        const response: any = await this.getRequest(url);
        const items: IFeature[] = [];

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const featuresElements = xmlDoc.querySelectorAll(".ms-ButtonHeightWidth");
        const featuresCt = featuresElements.length;
        for (let i = 0; i < featuresCt; i++) {
            const container = featuresElements[i].parentElement.parentElement.parentElement;
            const activateBtn = container.querySelectorAll("input.ms-ButtonHeightWidth")[0];
            const activated = activateBtn.getAttribute("value") === "Deactivate";
            items.push({
                activated,
                description: container.querySelectorAll(".ms-vb2")[1].textContent,
                id: container.querySelectorAll(".ms-vb2[id]")[0].getAttribute("id"),
                logo: container.querySelectorAll("img")[0].getAttribute("src"),
                name: container.querySelector("h3").textContent,
                scope
            });
        }
        return items;

    }

    public activateFeature(feature: IFeature): Promise<IFeature> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            if (feature.scope === FeatureScope.Site) {
                ctx.get_site().get_features().add(new SP.Guid(feature.id), true, SP.FeatureDefinitionScope.none);
            } else {
                ctx.get_web().get_features().add(new SP.Guid(feature.id), true, SP.FeatureDefinitionScope.none);
            }
            const onSuccess = (sender: any, err: any) => {
                resolve({ ...feature, activated: true });
            };
            const onError = (sender: any, err: any) => {
                if (feature.scope === FeatureScope.Site) {
                    ctx.get_site().get_features().add(new SP.Guid(feature.id), true, SP.FeatureDefinitionScope.site);
                } else {
                    ctx.get_web().get_features().add(new SP.Guid(feature.id), true, SP.FeatureDefinitionScope.site);
                }
                ctx.executeQueryAsync(
                    onSuccess,
                    this.getErrorResolver(reject, constants.ERROR_MESSAGE_RESOLVER_ACTIVATING_FEATURE)
                );
            };
            ctx.executeQueryAsync(onSuccess, onError);
        });
    }

    public deActivateFeature(feature: IFeature): Promise<IFeature> {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();

            if (feature.scope === FeatureScope.Site) {
                ctx.get_site().get_features().remove(new SP.Guid(feature.id), true);
            } else {
                ctx.get_web().get_features().remove(new SP.Guid(feature.id), true);
            }

            ctx.executeQueryAsync((sender: any, err: any) => {
                resolve({ ...feature, activated: false });
            }, this.getErrorResolver(reject, constants.ERROR_MESSAGE_RESOLVER_DEACTIVATING_FEATURE));
        });
    }
}
