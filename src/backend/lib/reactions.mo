// This module re-exports the reactions API from reactivity lib for backward compatibility.
import ReactivityLib "reactivity";
import Types "../types/reactivity";

module {
  public type ChemicalReaction = Types.ChemicalReaction;

  public func getAll() : [ChemicalReaction] {
    ReactivityLib.getAllReactions()
  };

  public func getById(id : Text) : ?ChemicalReaction {
    ReactivityLib.getReactionById(id)
  };

  public func search(term : Text) : [ChemicalReaction] {
    ReactivityLib.searchReactions(term)
  };

  public func getByCategory(category : Text) : [ChemicalReaction] {
    ReactivityLib.getReactionsByCategory(category)
  };

  public func getByType(rtype : Text) : [ChemicalReaction] {
    ReactivityLib.getReactionsByType(rtype)
  };
};
