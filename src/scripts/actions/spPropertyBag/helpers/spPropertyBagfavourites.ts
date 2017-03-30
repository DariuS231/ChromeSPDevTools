
import { FavouritesBase } from "../../common/favouriteBase";

class FavouritesClass extends FavouritesBase {
    constructor() {
        super("favourtites_SP_PropertyBag");
    }
}

export const Favourites = new FavouritesClass();
