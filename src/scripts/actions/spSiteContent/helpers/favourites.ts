
import { AppCache } from "../../common/cache";

class FavouritesClass {
    private _favouriteArray: string[] = null;

    public get Favourites(): string[]{
        if (this._favouriteArray === null) {
            this._favouriteArray = AppCache.get<string[]>("favourtites_SP_SiteContent") || [];
        }
        return this._favouriteArray;
    }

    public addToFavourites(guid: string) {
        if (this.Favourites.indexOf(guid) === -1) {
            this.Favourites.push(guid);
            AppCache.set("favourtites_SP_SiteContent", this.Favourites);
        }
    }
    public removeFromFavourites(guid: string) {
        const index = this.Favourites.indexOf(guid);
        if (index >= -1) {
            this.Favourites.splice(index, 1);
            AppCache.set("favourtites_SP_SiteContent", this.Favourites);
        }
    }
}

export const Favourites = new FavouritesClass();
