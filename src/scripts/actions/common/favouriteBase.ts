
import { AppCache } from "./cache";

export class FavouritesBase {
    private _favouriteArray: string[] = null;
    private _favouriteCacheKey: string;

    constructor(cacheKey: string) {
        this._favouriteCacheKey = cacheKey;
    }
    public get Favourites(): string[]{
        if (this._favouriteArray === null) {
            this._favouriteArray = AppCache.get<string[]>(this._favouriteCacheKey) || [];
        }
        return this._favouriteArray;
    }

    public addToFavourites(guid: string) {
        if (this.Favourites.indexOf(guid) === -1) {
            this.Favourites.push(guid);
            AppCache.set(this._favouriteCacheKey, this.Favourites);
        }
    }
    public removeFromFavourites(guid: string) {
        const index = this.Favourites.indexOf(guid);
        if (index >= -1) {
            this.Favourites.splice(index, 1);
            AppCache.set(this._favouriteCacheKey, this.Favourites);
        }
    }
}