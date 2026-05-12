import Debug "mo:core/Debug";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Types "../types/profile";

module {
  // ── State types ──────────────────────────────────────────────────────────
  public type Profiles = Map.Map<Types.UserId, Types.ProfileInternal>;
  public type Stats    = Map.Map<Types.UserId, Types.UserStatsInternal>;

  // ── Factories ────────────────────────────────────────────────────────────
  public func initProfiles() : Profiles { Map.empty() };
  public func initStats()    : Stats    { Map.empty() };

  // ── Profile helpers ──────────────────────────────────────────────────────
  public func toPublic(self : Types.ProfileInternal) : Types.Profile {
    Debug.todo()
  };

  public func getProfile(profiles : Profiles, userId : Types.UserId) : ?Types.Profile {
    Debug.todo()
  };

  public func upsertProfile(
    profiles : Profiles,
    userId   : Types.UserId,
    input    : Types.ProfileInput,
  ) : Types.Profile {
    Debug.todo()
  };

  // ── Stats helpers ─────────────────────────────────────────────────────────
  public func toPublicStats(self : Types.UserStatsInternal) : Types.UserStats {
    Debug.todo()
  };

  public func getStats(stats : Stats, userId : Types.UserId) : Types.UserStats {
    Debug.todo()
  };

  public func incrementActivity(stats : Stats, userId : Types.UserId) {
    Debug.todo()
  };

  public func incrementSavedItems(stats : Stats, userId : Types.UserId) {
    Debug.todo()
  };

  public func updateProgressScore(stats : Stats, userId : Types.UserId, score : Nat) {
    Debug.todo()
  };
};
