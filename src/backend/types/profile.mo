import Common "common";

module {
  public type UserId = Principal;
  public type Timestamp = Common.Timestamp;

  /// Public-facing profile (shared type — no var fields)
  public type Profile = {
    userId      : UserId;
    username    : Text;
    displayName : Text;
    bio         : Text;
    joinDate    : Timestamp;
    avatarUrl   : ?Text;
  };

  /// Mutable internal profile stored in state
  public type ProfileInternal = {
    userId          : UserId;
    var username    : Text;
    var displayName : Text;
    var bio         : Text;
    joinDate        : Timestamp;
    var avatarUrl   : ?Text;
  };

  /// User stats (shared type)
  public type UserStats = {
    activityCount   : Nat;
    savedItemsCount : Nat;
    progressScore   : Nat;
  };

  /// Mutable internal stats stored in state
  public type UserStatsInternal = {
    userId              : UserId;
    var activityCount   : Nat;
    var savedItemsCount : Nat;
    var progressScore   : Nat;
  };

  /// Input type for profile creation / update
  public type ProfileInput = {
    username    : Text;
    displayName : Text;
    bio         : Text;
    avatarUrl   : ?Text;
  };
};
