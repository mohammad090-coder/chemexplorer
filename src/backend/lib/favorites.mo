import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

module {
  public type FavoritesMap = Map.Map<Principal, [Text]>;

  public func init() : FavoritesMap {
    Map.empty<Principal, [Text]>()
  };

  public func toggle(favorites : FavoritesMap, caller : Principal, symbol : Text) : Bool {
    let current = switch (favorites.get(caller)) {
      case (?arr) arr;
      case null [];
    };
    let upperSymbol = symbol.toUpper();
    let alreadyFav = current.find<Text>(func(s) { s == upperSymbol }) != null;
    if (alreadyFav) {
      let updated = current.filter(func(s) { s != upperSymbol });
      favorites.add(caller, updated);
      false
    } else {
      let updated = current.concat([upperSymbol]);
      favorites.add(caller, updated);
      true
    }
  };

  public func get(favorites : FavoritesMap, caller : Principal) : [Text] {
    switch (favorites.get(caller)) {
      case (?arr) arr;
      case null [];
    }
  };
};
