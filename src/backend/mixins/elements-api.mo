import Map "mo:core/Map";
import ElementsLib "../lib/elements";
import FavoritesLib "../lib/favorites";
import ElementTypes "../types/elements";

mixin (
  elements : ElementsLib.ElementMap,
  favorites : FavoritesLib.FavoritesMap
) {
  public query func getAllElements() : async [ElementTypes.Element] {
    ElementsLib.getAll(elements)
  };

  public query func getElement(symbol : Text) : async ?ElementTypes.Element {
    ElementsLib.getBySymbol(elements, symbol)
  };

  public query func searchElements(searchTerm : Text) : async [ElementTypes.Element] {
    ElementsLib.search(elements, searchTerm)
  };

  public shared ({ caller }) func toggleFavorite(symbol : Text) : async Bool {
    FavoritesLib.toggle(favorites, caller, symbol)
  };

  public shared query ({ caller }) func getFavorites() : async [Text] {
    FavoritesLib.get(favorites, caller)
  };
};
