import ReactivityLib "../lib/reactivity";
import QuizLib "../lib/quiz";
import ReactivityTypes "../types/reactivity";
import QuizTypes "../types/quiz";

mixin () {
  public query func getReactivitySeries() : async [ReactivityTypes.ReactivityMetal] {
    ReactivityLib.getAllMetals()
  };

  public query func getReactivityMetal(symbol : Text) : async ?ReactivityTypes.ReactivityMetal {
    ReactivityLib.getMetalBySymbol(symbol)
  };

  public query func getReactions() : async [ReactivityTypes.ChemicalReaction] {
    ReactivityLib.getAllReactions()
  };

  public query func getReaction(id : Text) : async ?ReactivityTypes.ChemicalReaction {
    ReactivityLib.getReactionById(id)
  };

  public query func searchReactions(term : Text) : async [ReactivityTypes.ChemicalReaction] {
    ReactivityLib.searchReactions(term)
  };

  public query func getReactionsByCategory(category : Text) : async [ReactivityTypes.ChemicalReaction] {
    ReactivityLib.getReactionsByCategory(category)
  };

  public query func getReactionsByType(rtype : Text) : async [ReactivityTypes.ChemicalReaction] {
    ReactivityLib.getReactionsByType(rtype)
  };

  public query func getQuizQuestions(difficulty : Text, topic : Text) : async [QuizTypes.QuizQuestion] {
    QuizLib.getByDifficultyAndTopic(difficulty, topic)
  };

  public query func getQuizQuestion(id : Text) : async ?QuizTypes.QuizQuestion {
    QuizLib.getQuestionById(id)
  };
};
