import { AuthCard } from "./LoginPage";

// SignupPage delegates entirely to AuthCard in signup mode.
// The shared AuthCard handles the smooth tab toggle and all form state.
export function SignupPage() {
  return <AuthCard mode="signup" />;
}
