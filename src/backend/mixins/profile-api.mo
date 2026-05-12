import Debug "mo:core/Debug";
import Principal "mo:core/Principal";
import ProfileLib "../lib/profile";
import Types "../types/profile";

mixin (
  profiles : ProfileLib.Profiles,
  stats    : ProfileLib.Stats,
) {
  /// Return the caller's profile, or null if not yet created
  public shared query ({ caller }) func getMyProfile() : async ?Types.Profile {
    Debug.todo()
  };

  /// Create or update the caller's profile
  public shared ({ caller }) func upsertMyProfile(input : Types.ProfileInput) : async Types.Profile {
    Debug.todo()
  };

  /// Return the caller's stats
  public shared query ({ caller }) func getMyStats() : async Types.UserStats {
    Debug.todo()
  };

  /// Increment the caller's activity count (called when performing actions)
  public shared ({ caller }) func recordActivity() : async () {
    Debug.todo()
  };

  /// Update the caller's progress score
  public shared ({ caller }) func updateProgress(score : Nat) : async () {
    Debug.todo()
  };

  /// Get any user's public profile by principal
  public shared query func getPublicProfile(userId : Principal) : async ?Types.Profile {
    Debug.todo()
  };
};
