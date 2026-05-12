import { ParticleBackground } from "@/components/ParticleBackground";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { Atom, Eye, EyeOff, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Login page ────────────────────────────────────────────────────────────────
// Renders the shared AuthCard in "login" mode.
// Clicking "Sign Up" tab navigates to /signup (no hard reload, just a route change).
export function LoginPage() {
  return <AuthCard mode="login" />;
}

// ── Types ─────────────────────────────────────────────────────────────────────
type AuthMode = "login" | "signup";
type FieldState = "idle" | "valid" | "invalid";

function getPasswordStrength(pw: string): "weak" | "medium" | "strong" {
  if (pw.length === 0) return "weak";
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  if (pw.length >= 8 && hasUpper && hasNumber && hasSpecial) return "strong";
  if (pw.length >= 6 && (hasUpper || hasNumber)) return "medium";
  return "weak";
}

const strengthConfig = {
  weak: { width: "33%", color: "#f97316", label: "Weak" },
  medium: { width: "66%", color: "#eab308", label: "Medium" },
  strong: { width: "100%", color: "#22c55e", label: "Strong" },
};

// ── FieldFeedback ─────────────────────────────────────────────────────────────
function FieldFeedback({
  state,
  message,
}: { state: FieldState; message: string }) {
  if (state === "idle") return null;
  return (
    <div
      className="auth-field-feedback"
      data-valid={state === "valid"}
      style={{
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      <span className="auth-feedback-dot" data-valid={state === "valid"} />
      <span>{message}</span>
    </div>
  );
}

// ── AuthCard — shared glass card ──────────────────────────────────────────────
export function AuthCard({ mode: initialMode }: { mode: AuthMode }) {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated } = useAuth();

  // Internal mode — synced with route but allows crossfade
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [transitioning, setTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  // Signup fields
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [signupRipple, setSignupRipple] = useState(false);

  // Field validation
  const [nameState, setNameState] = useState<FieldState>("idle");
  const [seState, setSeState] = useState<FieldState>("idle");
  const [spState, setSpState] = useState<FieldState>("idle");
  const [confirmState, setConfirmState] = useState<FieldState>("idle");

  const strength = getPasswordStrength(signupPassword);
  const strengthInfo = strengthConfig[strength];

  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Entry animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Auth redirect
  useEffect(() => {
    if (isAuthenticated) navigate({ to: "/" });
  }, [isAuthenticated, navigate]);

  // Sync mode with prop (if navigated to directly)
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  function switchMode(next: AuthMode) {
    if (next === mode || transitioning) return;
    setTransitioning(true);
    // Navigate to the correct route so URL stays accurate
    navigate({ to: next === "login" ? "/login" : "/signup" });
    // After crossfade-out, swap mode, then fade back in
    transitionRef.current = setTimeout(() => {
      setMode(next);
      setTransitioning(false);
    }, 220);
  }

  // Cleanup timers
  useEffect(
    () => () => {
      if (transitionRef.current) clearTimeout(transitionRef.current);
    },
    [],
  );

  const handleLoginSubmit = () => {
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 600);
  };

  const handleSignupSubmit = () => {
    setSignupRipple(true);
    setTimeout(() => setSignupRipple(false), 600);
    const nameOk = name.trim().length >= 2;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail);
    const pwOk = signupPassword.length >= 6;
    const confirmOk = confirm === signupPassword && confirm.length > 0;
    setNameState(nameOk ? "valid" : "invalid");
    setSeState(emailOk ? "valid" : "invalid");
    setSpState(pwOk ? "valid" : "invalid");
    setConfirmState(confirmOk ? "valid" : "invalid");
    if (nameOk && emailOk && pwOk && confirmOk) navigate({ to: "/login" });
  };

  const formOpacity = transitioning ? 0 : 1;
  const formTranslate = transitioning ? "translateY(8px)" : "translateY(0)";

  return (
    <div className="login-fullscreen">
      <div className="login-bg-gradient" />
      <ParticleBackground />

      {/* Centered glass panel */}
      <div
        className="login-panel-wrap"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? "scale(1) translateY(0)"
            : "scale(0.95) translateY(20px)",
          transition:
            "opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div className="auth-glass-panel">
          {/* Inner highlight reflection */}
          <div className="login-panel-shine" />

          {/* Logo */}
          <div className="login-logo" data-ocid="auth.logo">
            <div className="login-logo-icon">
              <Atom size={20} strokeWidth={1.5} />
            </div>
            <span className="login-logo-text">ChemisteryX</span>
          </div>

          {/* Premium sliding tab toggle */}
          <AuthTabToggle mode={mode} onSwitch={switchMode} />

          {/* Form content — crossfades on mode switch */}
          <div
            style={{
              opacity: formOpacity,
              transform: formTranslate,
              transition: transitioning
                ? "opacity 0.2s ease, transform 0.2s ease"
                : "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            {mode === "login" ? (
              <LoginForm
                mounted={mounted}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                rippleActive={rippleActive}
                onSubmit={handleLoginSubmit}
                onIILogin={login}
                isLoading={isLoading}
                onSwitchMode={() => switchMode("signup")}
              />
            ) : (
              <SignupForm
                mounted={mounted}
                name={name}
                setName={setName}
                email={signupEmail}
                setEmail={setSignupEmail}
                password={signupPassword}
                setPassword={setSignupPassword}
                confirm={confirm}
                setConfirm={setConfirm}
                showPw={showPw}
                setShowPw={setShowPw}
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
                rippleActive={signupRipple}
                nameState={nameState}
                emailState={seState}
                passwordState={spState}
                confirmState={confirmState}
                _strength={strength}
                strengthInfo={strengthInfo}
                onBlurName={() =>
                  setNameState(name.trim().length >= 2 ? "valid" : "invalid")
                }
                onBlurEmail={() =>
                  setSeState(
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)
                      ? "valid"
                      : "invalid",
                  )
                }
                onBlurPassword={() =>
                  setSpState(signupPassword.length >= 6 ? "valid" : "invalid")
                }
                onBlurConfirm={() =>
                  setConfirmState(
                    confirm === signupPassword && confirm.length > 0
                      ? "valid"
                      : "invalid",
                  )
                }
                onSubmit={handleSignupSubmit}
                onIISignup={login}
                isLoading={isLoading}
                onSwitchMode={() => switchMode("login")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AuthTabToggle — sliding pill segmented control ────────────────────────────
function AuthTabToggle({
  mode,
  onSwitch,
}: { mode: AuthMode; onSwitch: (m: AuthMode) => void }) {
  const isLogin = mode === "login";
  return (
    <div className="auth-tab-container" data-ocid="auth.mode_toggle">
      {/* Sliding pill background */}
      <div
        className="auth-tab-pill"
        style={{ transform: isLogin ? "translateX(0%)" : "translateX(100%)" }}
      />
      <button
        type="button"
        className="auth-tab-btn"
        data-active={isLogin}
        onClick={() => onSwitch("login")}
        data-ocid="auth.login_tab"
      >
        Sign In
      </button>
      <button
        type="button"
        className="auth-tab-btn"
        data-active={!isLogin}
        onClick={() => onSwitch("signup")}
        data-ocid="auth.signup_tab"
      >
        Sign Up
      </button>
    </div>
  );
}

// ── LoginForm ─────────────────────────────────────────────────────────────────
function LoginForm({
  mounted,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rippleActive,
  onSubmit,
  onIILogin,
  isLoading,
  onSwitchMode,
}: {
  mounted: boolean;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  rippleActive: boolean;
  onSubmit: () => void;
  onIILogin: () => void;
  isLoading: boolean;
  onSwitchMode: () => void;
}) {
  const stagger = (i: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.45s ${0.05 + i * 0.07}s ease, transform 0.45s ${0.05 + i * 0.07}s ease`,
  });

  return (
    <div className="auth-form">
      {/* Heading */}
      <div className="auth-heading-group" style={stagger(0)}>
        <h1 className="auth-form-title">Welcome back</h1>
        <p className="auth-form-subtitle">
          Sign in to your ChemisteryX account
        </p>
      </div>

      {/* Email */}
      <div className="auth-field-group" style={stagger(1)}>
        <label className="auth-label" htmlFor="login-email">
          Email or Username
        </label>
        <div className="auth-input-wrap">
          <input
            id="login-email"
            type="text"
            className="auth-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            data-ocid="login.input"
          />
        </div>
      </div>

      {/* Password */}
      <div className="auth-field-group" style={stagger(2)}>
        <label className="auth-label" htmlFor="login-password">
          Password
        </label>
        <div className="auth-input-wrap auth-input-wrap-pw">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            className="auth-input auth-input-pw"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            data-ocid="login.password_input"
          />
          <button
            type="button"
            className="auth-pw-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            data-ocid="login.pw_toggle"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <div style={stagger(3)}>
        <button
          type="button"
          className={`auth-btn-primary${rippleActive ? " auth-btn-ripple" : ""}`}
          onClick={onSubmit}
          data-ocid="login.submit_button"
        >
          <span className="auth-btn-sweep" />
          <span className="relative z-10">Sign In</span>
        </button>
      </div>

      {/* Divider */}
      <div
        className="auth-divider"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.45s 0.35s ease",
        }}
      >
        <div className="auth-divider-line" />
        <span className="auth-divider-text">or</span>
        <div className="auth-divider-line" />
      </div>

      {/* Internet Identity */}
      <div style={stagger(5)}>
        <button
          type="button"
          className="auth-btn-ii"
          onClick={onIILogin}
          disabled={isLoading}
          data-ocid="login.ii_button"
        >
          <Zap size={15} strokeWidth={2} className="text-yellow-300" />
          <span>
            {isLoading ? "Connecting..." : "Continue with Internet Identity"}
          </span>
        </button>
      </div>

      {/* Switch link */}
      <p
        className="auth-switch-text"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.45s 0.5s ease",
        }}
      >
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="auth-link"
          onClick={(e) => {
            e.preventDefault();
            onSwitchMode();
          }}
          data-ocid="login.signup_link"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}

// ── SignupForm ────────────────────────────────────────────────────────────────
function SignupForm({
  mounted,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirm,
  setConfirm,
  showPw,
  setShowPw,
  showConfirm,
  setShowConfirm,
  rippleActive,
  nameState,
  emailState,
  passwordState,
  confirmState,
  _strength,
  strengthInfo,
  onBlurName,
  onBlurEmail,
  onBlurPassword,
  onBlurConfirm,
  onSubmit,
  onIISignup,
  isLoading,
  onSwitchMode,
}: {
  mounted: boolean;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirm: string;
  setConfirm: (v: string) => void;
  showPw: boolean;
  setShowPw: (v: boolean) => void;
  showConfirm: boolean;
  setShowConfirm: (v: boolean) => void;
  rippleActive: boolean;
  nameState: FieldState;
  emailState: FieldState;
  passwordState: FieldState;
  confirmState: FieldState;
  _strength: "weak" | "medium" | "strong";
  strengthInfo: { width: string; color: string; label: string };
  onBlurName: () => void;
  onBlurEmail: () => void;
  onBlurPassword: () => void;
  onBlurConfirm: () => void;
  onSubmit: () => void;
  onIISignup: () => void;
  isLoading: boolean;
  onSwitchMode: () => void;
}) {
  const stagger = (i: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.4s ${i * 0.06}s ease, transform 0.4s ${i * 0.06}s ease`,
  });

  return (
    <div className="auth-form">
      {/* Heading */}
      <div className="auth-heading-group" style={stagger(0)}>
        <h1 className="auth-form-title">Create account</h1>
        <p className="auth-form-subtitle">Join ChemisteryX today</p>
      </div>

      {/* Name */}
      <div className="auth-field-group" style={stagger(1)}>
        <label className="auth-label" htmlFor="signup-name">
          Full Name
        </label>
        <div
          className={`auth-input-wrap${nameState !== "idle" ? (nameState === "valid" ? " field-valid" : " field-invalid") : ""}`}
        >
          <input
            id="signup-name"
            type="text"
            className="auth-input"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={onBlurName}
            autoComplete="name"
            data-ocid="signup.name_input"
          />
        </div>
        <FieldFeedback
          state={nameState}
          message={
            nameState === "invalid"
              ? "Name must be at least 2 characters"
              : "Looks good!"
          }
        />
      </div>

      {/* Email */}
      <div className="auth-field-group" style={stagger(2)}>
        <label className="auth-label" htmlFor="signup-email">
          Email
        </label>
        <div
          className={`auth-input-wrap${emailState !== "idle" ? (emailState === "valid" ? " field-valid" : " field-invalid") : ""}`}
        >
          <input
            id="signup-email"
            type="email"
            className="auth-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={onBlurEmail}
            autoComplete="email"
            data-ocid="signup.email_input"
          />
        </div>
        <FieldFeedback
          state={emailState}
          message={
            emailState === "invalid"
              ? "Please enter a valid email"
              : "Email looks valid!"
          }
        />
      </div>

      {/* Password */}
      <div className="auth-field-group" style={stagger(3)}>
        <label className="auth-label" htmlFor="signup-password">
          Password
        </label>
        <div
          className={`auth-input-wrap auth-input-wrap-pw${passwordState !== "idle" ? (passwordState === "valid" ? " field-valid" : " field-invalid") : ""}`}
        >
          <input
            id="signup-password"
            type={showPw ? "text" : "password"}
            className="auth-input auth-input-pw"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={onBlurPassword}
            autoComplete="new-password"
            data-ocid="signup.password_input"
          />
          <button
            type="button"
            className="auth-pw-toggle"
            onClick={() => setShowPw(!showPw)}
            aria-label={showPw ? "Hide password" : "Show password"}
            data-ocid="signup.pw_toggle"
          >
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {/* Password strength bar */}
        {password.length > 0 && (
          <div className="auth-pw-strength" data-ocid="signup.strength_bar">
            <div className="auth-pw-track">
              <div
                className="auth-pw-fill"
                style={{
                  width: strengthInfo.width,
                  background: strengthInfo.color,
                  transition:
                    "width 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
                }}
              />
            </div>
            <span
              className="auth-pw-label"
              style={{ color: strengthInfo.color }}
            >
              {strengthInfo.label}
            </span>
          </div>
        )}
        <FieldFeedback
          state={passwordState}
          message={
            passwordState === "invalid"
              ? "Password must be at least 6 characters"
              : "Strong enough!"
          }
        />
      </div>

      {/* Confirm password */}
      <div className="auth-field-group" style={stagger(4)}>
        <label className="auth-label" htmlFor="signup-confirm">
          Confirm Password
        </label>
        <div
          className={`auth-input-wrap auth-input-wrap-pw${confirmState !== "idle" ? (confirmState === "valid" ? " field-valid" : " field-invalid") : ""}`}
        >
          <input
            id="signup-confirm"
            type={showConfirm ? "text" : "password"}
            className="auth-input auth-input-pw"
            placeholder="Repeat your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={onBlurConfirm}
            autoComplete="new-password"
            data-ocid="signup.confirm_input"
          />
          <button
            type="button"
            className="auth-pw-toggle"
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            data-ocid="signup.confirm_toggle"
          >
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        <FieldFeedback
          state={confirmState}
          message={
            confirmState === "invalid"
              ? "Passwords do not match"
              : "Passwords match!"
          }
        />
      </div>

      {/* Submit */}
      <div style={stagger(5)}>
        <button
          type="button"
          className={`auth-btn-primary${rippleActive ? " auth-btn-ripple" : ""}`}
          onClick={onSubmit}
          data-ocid="signup.submit_button"
        >
          <span className="auth-btn-sweep" />
          <span className="relative z-10">Create Account</span>
        </button>
      </div>

      {/* Divider */}
      <div
        className="auth-divider"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s 0.4s ease",
        }}
      >
        <div className="auth-divider-line" />
        <span className="auth-divider-text">or</span>
        <div className="auth-divider-line" />
      </div>

      {/* Internet Identity */}
      <div style={stagger(7)}>
        <button
          type="button"
          className="auth-btn-ii"
          onClick={onIISignup}
          disabled={isLoading}
          data-ocid="signup.ii_button"
        >
          <Zap size={15} strokeWidth={2} className="text-yellow-300" />
          <span>
            {isLoading ? "Connecting..." : "Sign up with Internet Identity"}
          </span>
        </button>
      </div>

      {/* Switch link */}
      <p
        className="auth-switch-text"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s 0.55s ease",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          className="auth-link"
          onClick={(e) => {
            e.preventDefault();
            onSwitchMode();
          }}
          data-ocid="signup.login_link"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
