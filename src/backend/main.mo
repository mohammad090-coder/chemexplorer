import ElementsLib "lib/elements";
import FavoritesLib "lib/favorites";
import ProfileLib "lib/profile";
import ElementsApi "mixins/elements-api";
import ReactionsApi "mixins/reactions-api";
import ProfileApi "mixins/profile-api";

actor {
  let elements = ElementsLib.init();
  let favorites = FavoritesLib.init();
  let profiles = ProfileLib.initProfiles();
  let stats    = ProfileLib.initStats();

  include ElementsApi(elements, favorites);
  include ReactionsApi();
  include ProfileApi(profiles, stats);
};
