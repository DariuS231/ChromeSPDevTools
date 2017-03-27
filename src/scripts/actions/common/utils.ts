import { constants } from "./constants";

export default class Utils {
    public static capitalize(srt: string): string {
        return srt.charAt(0).toUpperCase() + srt.slice(1);
    }
    public static formatString(...objs: string[]): string {
        const args: string = Array.prototype.slice.call(arguments, 1);
        const srt: string = Array.prototype.slice.call(arguments, 0, 1);

        return (srt.length <= 0 ) ? "" : srt[0].replace(/{(\d+)}/g, (match: any, number: number) => {
            return typeof args[number] !== "undefined"
                ? args[number]
                : match
                ;
        });
    }
    public static loadScript(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
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
    public static ensureSPObject(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof SP === constants.TYPE_OF_UNDEFINED || typeof SP.SOD === constants.TYPE_OF_UNDEFINED
                || typeof SP.SOD.executeFunc === constants.TYPE_OF_UNDEFINED) {
                let baseUrl: string = _spPageContextInfo.webServerRelativeUrl;
                if (baseUrl === constants.URL_SLASH) {
                    baseUrl = location.origin;
                }
                const scriptbase = baseUrl + constants.URL_LAYOUTS;

                this.loadScript(scriptbase + constants.URL_SP_RUNTIME).then(() => {
                    this.loadScript(scriptbase + constants.URL_SP).then(() => {
                        resolve();
                    });
                });

            } else {
                SP.SOD.executeFunc(constants.URL_SP, constants.SP_TYPE_CLIENTCONTEXT, () => {
                    resolve();
                });
            }
        });
    }

}
