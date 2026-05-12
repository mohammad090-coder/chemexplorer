module {
  public type MetalReaction = {
    reactionType : Text;
    partner : Text;
    equation : Text;
    observation : Text;
  };

  public type ReactivityMetal = {
    symbol : Text;
    name : Text;
    rank : Nat;
    reactions : [MetalReaction];
    interestingFacts : [Text];
  };

  public type ChemicalReactant = {
    symbol : Text;
    name : Text;
    coefficient : Nat;
  };

  public type ChemicalProduct = {
    symbol : Text;
    name : Text;
    formula : Text;
    coefficient : Nat;
  };

  public type ChemicalReaction = {
    id : Text;
    name : Text;
    reactants : [ChemicalReactant];
    products : [ChemicalProduct];
    balancedEquation : Text;
    reactionType : Text;
    energyChange : Text;
    description : Text;
    observations : [Text];
    category : Text;
    namedReaction : Text;
  };
};
