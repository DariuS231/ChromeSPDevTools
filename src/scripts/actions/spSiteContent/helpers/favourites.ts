
import { FavouritesBase } from "../../common/favouriteBase";

class FavouritesClass extends FavouritesBase {
    constructor() {
        super("favourtites_SP_SiteContent");
    }
}

export const Favourites = new FavouritesClass();
