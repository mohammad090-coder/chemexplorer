import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Atom, ChevronDown, LogIn, LogOut, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useEffect, useRef, useState } from "react";

const PRIMARY_LINKS = [
  { label: "Home", to: "/" },
  { label: "Periodic Table", to: "/periodic-table" },
  { label: "Reaction Lab", to: "/reaction-lab" },
  { label: "Practice", to: "/practice" },
  { label: "Carbon", to: "/carbon" },
  { label: "Formulas", to: "/formulas" },
];

const MORE_LINKS = [
  { label: "Search", to: "/search" },
  { label: "Virtual Lab", to: "/virtual-lab" },
  { label: "Atom Tracker", to: "/atom-tracker" },
  { label: "Molecules", to: "/molecules" },
  { label: "Reactivity Series", to: "/reactivity-series" },
  { label: "Progress", to: "/progress" },
  { label: "Compare", to: "/compare" },
  { label: "Study Tools", to: "/smart-features" },
  { label: "Favorites", to: "/favorites" },
];

const ALL_LINKS = [...PRIMARY_LINKS, ...MORE_LINKS];

function MoreDropdown({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMoreActive = MORE_LINKS.some((l) => currentPath.startsWith(l.to));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "nav-link-btn relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap",
          isMoreActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
        data-ocid="navbar.more_button"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {isMoreActive && (
          <motion.span
            layoutId="nav-pill"
            className="absolute inset-0 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px) saturate(1.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 12px oklch(var(--accent) / 0.2)",
            }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
          />
        )}
        {/* Hover glow overlay */}
        <span
          className="absolute inset-0 rounded-lg opacity-0 group-hover/morelink:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{
            background: "rgba(255,255,255,0.04)",
            boxShadow: "0 0 10px oklch(var(--accent) / 0.12)",
          }}
        />
        <span className="relative z-10">More</span>
        <ChevronDown
          className={cn(
            "relative z-10 w-3.5 h-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-1.5 w-52 rounded-2xl overflow-hidden z-50"
            style={{
              backdropFilter: "blur(48px) saturate(1.8)",
              backgroundColor: "rgba(10,10,20,0.75)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
            data-ocid="navbar.more_dropdown"
          >
            <div className="p-1.5">
              {MORE_LINKS.map((link) => {
                const isActive = currentPath.startsWith(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    style={{
                      background: isActive
                        ? "rgba(255,255,255,0.08)"
                        : undefined,
                      border: isActive
                        ? "1px solid rgba(255,255,255,0.1)"
                        : undefined,
                    }}
                    data-ocid={`navbar.more_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Navbar = memo(function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();
  const currentPath = location.pathname;
  const { isAuthenticated, isLoading, principal, login, logout } = useAuth();
  const prevPath = useRef(currentPath);

  // Close mobile menu whenever route changes
  useEffect(() => {
    if (prevPath.current !== currentPath) {
      prevPath.current = currentPath;
      setMenuOpen(false);
    }
  }, [currentPath]);

  // Scroll-based blur intensification — passive listener, CSS class toggle only
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Navbar header ─── */}
      <header
        className={cn(
          "sticky top-0 z-40 overflow-hidden transition-all duration-300",
          scrolled ? "navbar-scrolled" : "",
        )}
        style={{
          backdropFilter: "blur(48px) saturate(2)",
          backgroundColor: "rgba(255,255,255,0.055)",
          borderBottom: "none",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Gradient border bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)",
          }}
        />

        {/* Frosted reflection strip at top */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.22) 70%, transparent 100%)",
          }}
        />
        {/* Subtle reflection sheen */}
        <div
          className="absolute top-0 left-0 right-0 h-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
          }}
        />

        {/* Particle shimmer dots — CSS-only, purely decorative */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden
        >
          <div
            className="navbar-shimmer-dot"
            style={{ left: "15%", animationDelay: "0s" }}
          />
          <div
            className="navbar-shimmer-dot"
            style={{ left: "50%", animationDelay: "1.4s" }}
          />
          <div
            className="navbar-shimmer-dot"
            style={{ left: "82%", animationDelay: "2.8s" }}
          />
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none animate-navbar-border-glow"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(var(--primary) / 0.5) 30%, oklch(var(--accent) / 0.5) 70%, transparent 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative z-10">
          {/* Logo — subtle glass pill on hover */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group/logo flex-shrink-0 px-2 py-1.5 -mx-2 rounded-xl transition-all duration-300"
            style={{
              transition:
                "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.05)";
              el.style.backdropFilter = "blur(25px) saturate(1.8)";
              el.style.border = "1px solid rgba(255,255,255,0.1)";
              el.style.transform = "scale(1.02)";
              el.style.boxShadow =
                "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 16px oklch(0.68 0.22 258 / 0.3), 0 0 32px oklch(0.72 0.24 285 / 0.15)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.backdropFilter = "";
              el.style.border = "";
              el.style.transform = "";
              el.style.boxShadow = "";
            }}
            data-ocid="navbar.logo_link"
          >
            <div
              className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary/70 to-accent/70 flex items-center justify-center animate-logo-glow transition-all duration-300 group-hover/logo:scale-110"
              style={{
                transition: "filter 0.25s ease, transform 0.25s ease",
                filter: "drop-shadow(0 0 0px oklch(var(--primary) / 0))",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.filter =
                  "drop-shadow(0 0 8px oklch(var(--primary) / 0.7)) drop-shadow(0 0 20px oklch(var(--accent) / 0.4))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.filter =
                  "drop-shadow(0 0 0px oklch(var(--primary) / 0))";
              }}
            >
              <Atom className="w-5 h-5 text-foreground" />
            </div>
            <span className="font-display font-bold text-lg hidden sm:block">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                Chemistery
              </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.68 0.22 258), oklch(0.72 0.24 285), oklch(0.78 0.18 310))",
                  filter: "drop-shadow(0 0 8px oklch(0.68 0.22 258 / 0.7))",
                }}
              >
                X
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-0.5"
            data-ocid="navbar.desktop_nav"
          >
            {PRIMARY_LINKS.map((link) => {
              const isActive =
                link.to === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap group/navlink nav-link",
                    isActive
                      ? "text-foreground nav-link-active"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  data-ocid={`navbar.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(16px) saturate(1.6)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 12px oklch(var(--accent) / 0.2)",
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.4,
                      }}
                    />
                  )}
                  {/* Hover glow backdrop */}
                  <span
                    className="absolute inset-0 rounded-lg opacity-0 group-hover/navlink:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      boxShadow: "0 0 10px oklch(var(--accent) / 0.1)",
                    }}
                  />
                  <span className="relative z-10 transition-transform duration-150 group-hover/navlink:scale-[1.02] inline-block">
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <MoreDropdown currentPath={currentPath} />
          </nav>

          {/* Auth + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Auth section — desktop only (full version) */}
            <div
              className="hidden md:flex items-center gap-2 px-2 py-1 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 0 8px rgba(255,255,255,0.04)",
              }}
              data-ocid="navbar.auth_section"
            >
              {isAuthenticated ? (
                <>
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(24px) saturate(1.8)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                    data-ocid="navbar.user_badge"
                  >
                    <User className="w-3.5 h-3.5 text-accent" />
                    <span className="text-foreground/80 font-mono text-xs max-w-[80px] truncate">
                      {principal?.slice(0, 8)}…
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="navbar-action-btn px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-all"
                    data-ocid="navbar.logout_button"
                    aria-label="Log out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={login}
                  disabled={isLoading}
                  className="navbar-auth-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-foreground disabled:opacity-50"
                  data-ocid="navbar.login_button"
                >
                  <LogIn className="w-4 h-4" />
                  {isLoading ? "Connecting…" : "Connect"}
                </button>
              )}
            </div>

            {/* Mobile compact auth button — always visible on mobile */}
            <div className="flex md:hidden items-center">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center justify-center w-[34px] h-[34px] rounded-full active:scale-95 transition-transform duration-150"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 0 10px rgba(100,220,200,0.2)",
                  }}
                  aria-label="Profile"
                  data-ocid="navbar.mobile_avatar_button"
                >
                  <User className="w-4 h-4 text-foreground" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={login}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 text-foreground whitespace-nowrap disabled:opacity-50 active:scale-[0.97] transition-transform duration-150"
                  style={{
                    height: "34px",
                    padding: "0 12px",
                    fontSize: "13px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 0 10px rgba(100,220,200,0.2)",
                  }}
                  data-ocid="navbar.mobile_signin_button"
                >
                  <LogIn className="w-3.5 h-3.5 flex-shrink-0" />
                  {isLoading ? "…" : "Sign In"}
                </button>
              )}
            </div>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              className="navbar-hamburger-btn md:hidden p-2 rounded-xl transition-all active:scale-95"
              onClick={() => setMenuOpen((v) => !v)}
              data-ocid="navbar.hamburger_button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen glass overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[999] md:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu panel — slides from top */}
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 right-0 z-[1000] md:hidden"
              style={{
                backdropFilter: "blur(48px) saturate(1.8)",
                backgroundColor: "rgba(8,8,18,0.88)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
              data-ocid="navbar.mobile_menu"
            >
              {/* Header row with close */}
              <div
                className="flex items-center justify-between px-5 h-16"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/70 to-accent/70 flex items-center justify-center">
                    <Atom className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="font-display font-bold text-base">
                    <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                      Chemistery
                    </span>
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, oklch(0.68 0.22 258), oklch(0.78 0.18 310))",
                      }}
                    >
                      X
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="navbar-hamburger-btn p-2 rounded-xl transition-all active:scale-90"
                  aria-label="Close menu"
                  data-ocid="navbar.mobile_close_button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="px-4 py-4 flex flex-col gap-1 max-h-[calc(100svh-4rem-120px)] overflow-y-auto">
                {ALL_LINKS.map((link, i) => {
                  const isActive =
                    link.to === "/"
                      ? currentPath === "/"
                      : currentPath.startsWith(link.to);
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex items-center px-4 rounded-2xl text-sm font-medium transition-all duration-150",
                          "min-h-[56px]",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        style={{
                          background: isActive
                            ? "rgba(255,255,255,0.07)"
                            : undefined,
                          border: isActive
                            ? "1px solid rgba(255,255,255,0.12)"
                            : undefined,
                          backdropFilter: isActive ? "blur(16px)" : undefined,
                        }}
                        data-ocid={`navbar.mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Auth footer */}
              <div
                className="px-4 py-4"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(16px)",
                }}
              >
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full min-h-[52px] px-4 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground transition-all flex items-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    data-ocid="navbar.mobile_logout_button"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out ({principal?.slice(0, 8)}…)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      login();
                      setMenuOpen(false);
                    }}
                    disabled={isLoading}
                    className="navbar-auth-btn w-full min-h-[52px] px-4 rounded-2xl text-sm font-medium text-foreground transition-all flex items-center gap-2 justify-center disabled:opacity-50"
                    data-ocid="navbar.mobile_login_button"
                  >
                    <LogIn className="w-4 h-4" />
                    {isLoading
                      ? "Connecting…"
                      : "Connect with Internet Identity"}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});
