import { ISharePointSiteInfo } from "./../common/interfaces";
import { constants } from "./constants";

declare var spInfo: ISharePointSiteInfo;

export default class Utils {
    public static capitalize(srt: string): string {
        return srt.charAt(0).toUpperCase() + srt.slice(1);
    }
    public static ensureSPObject(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof SP === constants.TYPE_OF_UNDEFINED || typeof SP.SOD === constants.TYPE_OF_UNDEFINED
                || typeof SP.SOD.executeFunc === constants.TYPE_OF_UNDEFINED) {
                this.loadSPScripts().then(() => resolve());
            } else {
                SP.SOD.executeFunc(constants.URL_SP, constants.SP_TYPE_CLIENTCONTEXT, () => resolve());
            }
        });
    }
    public static isGuidValid(guid: string, omitEmpty: boolean = true): boolean {
        return ((omitEmpty && !guid) || (!omitEmpty && !!guid)) || constants.GUID_REGEX.test(guid);
    }
    private static async loadSPScripts(): Promise<any> {
        const scriptBase: string = `${spInfo.webFullUrl}${constants.URL_LAYOUTS}`;
        await this.loadScript(scriptBase + constants.URL_INIT, constants.GLOBAL_NAME_INIT);
        await this.loadScript(scriptBase + constants.URL_SP_MS_AJAX, constants.GLOBAL_NAME_SP_MS_AJAX);
        await this.loadScript(scriptBase + constants.URL_SP_RUNTIME, constants.GLOBAL_NAME_SP_RUNTIME);
        await this.loadScript(scriptBase + constants.URL_SP, constants.GLOBAL_NAME_SP);
    }
    private static loadScript(url: string, globalName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!!window[globalName]) {
                resolve();
            }
            const head = document.getElementsByTagName(constants.HTML_TAG_HEAD)[0];
            const script = document.createElement(constants.HTML_TAG_SCRIPT) as HTMLScriptElement;
            script.type = constants.SCRIPT_TAG_TYPE;
            script.src = url;

            script.onload = () => {
                resolve();
            };
            head.appendChild(script);
        });
    }
}
