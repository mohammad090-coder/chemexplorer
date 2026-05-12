module {
  public type Element = {
    symbol : Text;
    name : Text;
    atomicNumber : Nat;
    atomicMass : Float;
    category : Text;
    group : Nat;
    period : Nat;
    block : Text;
    state : Text;
    density : Float;
    meltingPoint : Float;
    boilingPoint : Float;
    electronegativity : Float;
    ionizationEnergy : Float;
    atomicRadius : Float;
    electronConfiguration : Text;
    description : Text;
    uses : [Text];
    facts : [Text];
    colorHex : Text;
  };
};
