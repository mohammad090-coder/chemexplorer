import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && !!identity;
  const isLoading = loginStatus === "logging-in";
  const principal = identity?.getPrincipal().toText();

  return {
    isAuthenticated,
    isLoading,
    principal,
    login,
    logout: clear,
    loginStatus,
  };
}
