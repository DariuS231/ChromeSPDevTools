import { constants } from "./constants";

export default class Utils {
    public static capitalize(srt: string): string {
        return srt.charAt(0).toUpperCase() + srt.slice(1);
    }
    public static formatString(...objs: string[]): string {
        const args: string = Array.prototype.slice.call(arguments, 1);
        const srt: string = Array.prototype.slice.call(arguments, 0, 1);

        return (srt.length <= 0) ? "" : srt[0].replace(/{(\d+)}/g, (match: any, number: number) => {
            return typeof args[number] !== constants.TYPE_OF_UNDEFINED
                ? args[number]
                : match
                ;
        });
    }
    public static loadScript(url: string, globalName: string): Promise<any> {
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
    public static ensureSPObject(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof SP === constants.TYPE_OF_UNDEFINED || typeof SP.SOD === constants.TYPE_OF_UNDEFINED
                || typeof SP.SOD.executeFunc === constants.TYPE_OF_UNDEFINED) {
                const scriptBase: string = location.origin + constants.URL_LAYOUTS;

                this.loadScript(scriptBase + constants.URL_INIT, constants.GLOBAL_NAME_INIT).then(() => {
                    this.loadScript(scriptBase + constants.URL_SP_MS_AJAX, constants.GLOBAL_NAME_SP_MS_AJAX).then(() => {
                        this.loadScript(scriptBase + constants.URL_SP_RUNTIME, constants.GLOBAL_NAME_SP_RUNTIME).then(() => {
                            this.loadScript(scriptBase + constants.URL_SP, constants.GLOBAL_NAME_SP).then(() => {
                                resolve();
                            });
                        });
                    });
                });

            } else {
                SP.SOD.executeFunc(constants.URL_SP, constants.SP_TYPE_CLIENTCONTEXT, () => {
                    resolve();
                });
            }
        });
    }
    public static isGuidValid(guid: string, omitEmpty: boolean = true): boolean {
        return ((omitEmpty && !guid) || (!omitEmpty && !!guid)) || constants.GUID_REGEX.test(guid);
    }

}
