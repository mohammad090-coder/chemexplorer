import { c as createLucideIcon, u as useNavigate, n as useAuth, r as reactExports, j as jsxRuntimeExports, bQ as ParticleBackground, A as Atom, Z as Zap, f as Link } from "./index-DyyHqAHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
function LoginPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthCard, { mode: "login" });
}
function getPasswordStrength(pw) {
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
  strong: { width: "100%", color: "#22c55e", label: "Strong" }
};
function FieldFeedback({
  state,
  message
}) {
  if (state === "idle") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "auth-field-feedback",
      "data-valid": state === "valid",
      style: {
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 0.25s ease, transform 0.25s ease"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "auth-feedback-dot", "data-valid": state === "valid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message })
      ]
    }
  );
}
function AuthCard({ mode: initialMode }) {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated } = useAuth();
  const [mode, setMode] = reactExports.useState(initialMode);
  const [transitioning, setTransitioning] = reactExports.useState(false);
  const [mounted, setMounted] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [rippleActive, setRippleActive] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [signupEmail, setSignupEmail] = reactExports.useState("");
  const [signupPassword, setSignupPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [signupRipple, setSignupRipple] = reactExports.useState(false);
  const [nameState, setNameState] = reactExports.useState("idle");
  const [seState, setSeState] = reactExports.useState("idle");
  const [spState, setSpState] = reactExports.useState("idle");
  const [confirmState, setConfirmState] = reactExports.useState("idle");
  const strength = getPasswordStrength(signupPassword);
  const strengthInfo = strengthConfig[strength];
  const transitionRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    if (isAuthenticated) navigate({ to: "/" });
  }, [isAuthenticated, navigate]);
  reactExports.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);
  function switchMode(next) {
    if (next === mode || transitioning) return;
    setTransitioning(true);
    navigate({ to: next === "login" ? "/login" : "/signup" });
    transitionRef.current = setTimeout(() => {
      setMode(next);
      setTransitioning(false);
    }, 220);
  }
  reactExports.useEffect(
    () => () => {
      if (transitionRef.current) clearTimeout(transitionRef.current);
    },
    []
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-fullscreen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login-bg-gradient" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "login-panel-wrap",
        style: {
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
          transition: "opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-glass-panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login-panel-shine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-logo", "data-ocid": "auth.logo", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login-logo-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { size: 20, strokeWidth: 1.5 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "login-logo-text", children: "ChemisteryX" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AuthTabToggle, { mode, onSwitch: switchMode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                opacity: formOpacity,
                transform: formTranslate,
                transition: transitioning ? "opacity 0.2s ease, transform 0.2s ease" : "opacity 0.25s ease, transform 0.25s ease"
              },
              children: mode === "login" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                LoginForm,
                {
                  mounted,
                  email,
                  setEmail,
                  password,
                  setPassword,
                  showPassword,
                  setShowPassword,
                  rippleActive,
                  onSubmit: handleLoginSubmit,
                  onIILogin: login,
                  isLoading,
                  onSwitchMode: () => switchMode("signup")
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                SignupForm,
                {
                  mounted,
                  name,
                  setName,
                  email: signupEmail,
                  setEmail: setSignupEmail,
                  password: signupPassword,
                  setPassword: setSignupPassword,
                  confirm,
                  setConfirm,
                  showPw,
                  setShowPw,
                  showConfirm,
                  setShowConfirm,
                  rippleActive: signupRipple,
                  nameState,
                  emailState: seState,
                  passwordState: spState,
                  confirmState,
                  _strength: strength,
                  strengthInfo,
                  onBlurName: () => setNameState(name.trim().length >= 2 ? "valid" : "invalid"),
                  onBlurEmail: () => setSeState(
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail) ? "valid" : "invalid"
                  ),
                  onBlurPassword: () => setSpState(signupPassword.length >= 6 ? "valid" : "invalid"),
                  onBlurConfirm: () => setConfirmState(
                    confirm === signupPassword && confirm.length > 0 ? "valid" : "invalid"
                  ),
                  onSubmit: handleSignupSubmit,
                  onIISignup: login,
                  isLoading,
                  onSwitchMode: () => switchMode("login")
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}
function AuthTabToggle({
  mode,
  onSwitch
}) {
  const isLogin = mode === "login";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-tab-container", "data-ocid": "auth.mode_toggle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "auth-tab-pill",
        style: { transform: isLogin ? "translateX(0%)" : "translateX(100%)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "auth-tab-btn",
        "data-active": isLogin,
        onClick: () => onSwitch("login"),
        "data-ocid": "auth.login_tab",
        children: "Sign In"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "auth-tab-btn",
        "data-active": !isLogin,
        onClick: () => onSwitch("signup"),
        "data-ocid": "auth.signup_tab",
        children: "Sign Up"
      }
    )
  ] });
}
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
  onSwitchMode
}) {
  const stagger = (i) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.45s ${0.05 + i * 0.07}s ease, transform 0.45s ${0.05 + i * 0.07}s ease`
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-heading-group", style: stagger(0), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "auth-form-title", children: "Welcome back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "auth-form-subtitle", children: "Sign in to your ChemisteryX account" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-field-group", style: stagger(1), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "auth-label", htmlFor: "login-email", children: "Email or Username" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-input-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "login-email",
          type: "text",
          className: "auth-input",
          placeholder: "you@example.com",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          autoComplete: "email",
          "data-ocid": "login.input"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-field-group", style: stagger(2), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "auth-label", htmlFor: "login-password", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-input-wrap auth-input-wrap-pw", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "login-password",
            type: showPassword ? "text" : "password",
            className: "auth-input auth-input-pw",
            placeholder: "Your password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            autoComplete: "current-password",
            "data-ocid": "login.password_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "auth-pw-toggle",
            onClick: () => setShowPassword(!showPassword),
            "aria-label": showPassword ? "Hide password" : "Show password",
            "data-ocid": "login.pw_toggle",
            children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: stagger(3), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: `auth-btn-primary${rippleActive ? " auth-btn-ripple" : ""}`,
        onClick: onSubmit,
        "data-ocid": "login.submit_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "auth-btn-sweep" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: "Sign In" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "auth-divider",
        style: {
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.45s 0.35s ease"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-divider-line" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "auth-divider-text", children: "or" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-divider-line" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: stagger(5), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "auth-btn-ii",
        onClick: onIILogin,
        disabled: isLoading,
        "data-ocid": "login.ii_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 15, strokeWidth: 2, className: "text-yellow-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isLoading ? "Connecting..." : "Continue with Internet Identity" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "auth-switch-text",
        style: {
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.45s 0.5s ease"
        },
        children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/signup",
              className: "auth-link",
              onClick: (e) => {
                e.preventDefault();
                onSwitchMode();
              },
              "data-ocid": "login.signup_link",
              children: "Create Account"
            }
          )
        ]
      }
    )
  ] });
}
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
  onSwitchMode
}) {
  const stagger = (i) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.4s ${i * 0.06}s ease, transform 0.4s ${i * 0.06}s ease`
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-heading-group", style: stagger(0), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "auth-form-title", children: "Create account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "auth-form-subtitle", children: "Join ChemisteryX today" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-field-group", style: stagger(1), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "auth-label", htmlFor: "signup-name", children: "Full Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `auth-input-wrap${nameState !== "idle" ? nameState === "valid" ? " field-valid" : " field-invalid" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "signup-name",
              type: "text",
              className: "auth-input",
              placeholder: "Your full name",
              value: name,
              onChange: (e) => setName(e.target.value),
              onBlur: onBlurName,
              autoComplete: "name",
              "data-ocid": "signup.name_input"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FieldFeedback,
        {
          state: nameState,
          message: nameState === "invalid" ? "Name must be at least 2 characters" : "Looks good!"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-field-group", style: stagger(2), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "auth-label", htmlFor: "signup-email", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `auth-input-wrap${emailState !== "idle" ? emailState === "valid" ? " field-valid" : " field-invalid" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "signup-email",
              type: "email",
              className: "auth-input",
              placeholder: "you@example.com",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              onBlur: onBlurEmail,
              autoComplete: "email",
              "data-ocid": "signup.email_input"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FieldFeedback,
        {
          state: emailState,
          message: emailState === "invalid" ? "Please enter a valid email" : "Email looks valid!"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-field-group", style: stagger(3), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "auth-label", htmlFor: "signup-password", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `auth-input-wrap auth-input-wrap-pw${passwordState !== "idle" ? passwordState === "valid" ? " field-valid" : " field-invalid" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "signup-password",
                type: showPw ? "text" : "password",
                className: "auth-input auth-input-pw",
                placeholder: "At least 6 characters",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                onBlur: onBlurPassword,
                autoComplete: "new-password",
                "data-ocid": "signup.password_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "auth-pw-toggle",
                onClick: () => setShowPw(!showPw),
                "aria-label": showPw ? "Hide password" : "Show password",
                "data-ocid": "signup.pw_toggle",
                children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
              }
            )
          ]
        }
      ),
      password.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-pw-strength", "data-ocid": "signup.strength_bar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-pw-track", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "auth-pw-fill",
            style: {
              width: strengthInfo.width,
              background: strengthInfo.color,
              transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease"
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "auth-pw-label",
            style: { color: strengthInfo.color },
            children: strengthInfo.label
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FieldFeedback,
        {
          state: passwordState,
          message: passwordState === "invalid" ? "Password must be at least 6 characters" : "Strong enough!"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-field-group", style: stagger(4), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "auth-label", htmlFor: "signup-confirm", children: "Confirm Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `auth-input-wrap auth-input-wrap-pw${confirmState !== "idle" ? confirmState === "valid" ? " field-valid" : " field-invalid" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "signup-confirm",
                type: showConfirm ? "text" : "password",
                className: "auth-input auth-input-pw",
                placeholder: "Repeat your password",
                value: confirm,
                onChange: (e) => setConfirm(e.target.value),
                onBlur: onBlurConfirm,
                autoComplete: "new-password",
                "data-ocid": "signup.confirm_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "auth-pw-toggle",
                onClick: () => setShowConfirm(!showConfirm),
                "aria-label": showConfirm ? "Hide password" : "Show password",
                "data-ocid": "signup.confirm_toggle",
                children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FieldFeedback,
        {
          state: confirmState,
          message: confirmState === "invalid" ? "Passwords do not match" : "Passwords match!"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: stagger(5), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: `auth-btn-primary${rippleActive ? " auth-btn-ripple" : ""}`,
        onClick: onSubmit,
        "data-ocid": "signup.submit_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "auth-btn-sweep" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: "Create Account" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "auth-divider",
        style: {
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s 0.4s ease"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-divider-line" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "auth-divider-text", children: "or" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-divider-line" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: stagger(7), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "auth-btn-ii",
        onClick: onIISignup,
        disabled: isLoading,
        "data-ocid": "signup.ii_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 15, strokeWidth: 2, className: "text-yellow-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isLoading ? "Connecting..." : "Sign up with Internet Identity" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "auth-switch-text",
        style: {
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s 0.55s ease"
        },
        children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              className: "auth-link",
              onClick: (e) => {
                e.preventDefault();
                onSwitchMode();
              },
              "data-ocid": "signup.login_link",
              children: "Sign In"
            }
          )
        ]
      }
    )
  ] });
}
export {
  AuthCard,
  LoginPage
};
