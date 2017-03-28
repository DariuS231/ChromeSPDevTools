
class Cache {
    private _keyPrefix: string = "spChromeDevTool_";
    private _isSupportedStorage: boolean = null;

    public get isSupportedStorage(): boolean {
        if (this._isSupportedStorage === null) {
            this._isSupportedStorage = this.checkIfStorageisSupported();
        }
        return this._isSupportedStorage;
    }
    public clear(key: string): void {
        const completeKey: string = this.addKeyPrefix(key);
        this.CacheObject.removeItem(completeKey);
    }

    public get(key: string): any {
        const completeKey: string = this.addKeyPrefix(key);
        if (this.isSupportedStorage) {
            const cachedDataStr = this.CacheObject.getItem(completeKey);

            if (typeof cachedDataStr === "string") {
                const cacheDataObj = JSON.parse(cachedDataStr);
                if (cacheDataObj.expiryTime > (new Date())) {
                    return cacheDataObj.data;
                }
            }
        }
        return null;
    }

    public set(key: string, valueObj: any, expireMinutes?: number) {
        const completeKey: string = this.addKeyPrefix(key);
        let didSetInCache = false;
        if (this.isSupportedStorage && valueObj !== undefined) {
            const nowDt = new Date();
            const expiryTime: number = (typeof expireMinutes !== "undefined")
                ? nowDt.setMinutes(nowDt.getMinutes() + expireMinutes)
                : 8640000000000000;
            const cacheDataObj: any = { data: valueObj, expiryTime };
            this.CacheObject.setItem(completeKey, JSON.stringify(cacheDataObj));

            didSetInCache = true;

        }
        return didSetInCache;
    }

    private addKeyPrefix(key: string): string {
        const undrscr = "_";
        return this._keyPrefix + _spPageContextInfo.webAbsoluteUrl.replace(/:\/\/|\/|\./g, undrscr) + undrscr + key;
    }

    private get CacheObject(): Storage {
        return window.localStorage;
    }
    private checkIfStorageisSupported() {
        const cacheObj = this.CacheObject;
        const supportsStorage = cacheObj && JSON
            && typeof JSON.parse === "function"
            && typeof JSON.stringify === "function";
        if (supportsStorage) {
            try {
                const testKey = this._keyPrefix + "testingCache";
                cacheObj.setItem(testKey, "1");
                cacheObj.removeItem(testKey);
                return true;
            } catch (ex) {
                console.log("Local Storage not supported by the browser.");
            }
        }
        return false;
    }
}

export const AppCache: Cache = new Cache();
