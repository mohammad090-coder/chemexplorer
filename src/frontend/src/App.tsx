import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { PageTransition } from "./components/PageTransition";

// Lazy load page components
const HomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const PeriodicTablePage = lazy(() =>
  import("./pages/PeriodicTablePage").then((m) => ({
    default: m.PeriodicTablePage,
  })),
);
const ElementDetailPage = lazy(() =>
  import("./pages/ElementDetailPage").then((m) => ({
    default: m.ElementDetailPage,
  })),
);
const SearchPage = lazy(() =>
  import("./pages/SearchPage").then((m) => ({ default: m.SearchPage })),
);
const FavoritesPage = lazy(() =>
  import("./pages/FavoritesPage").then((m) => ({ default: m.FavoritesPage })),
);
const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const ComparePage = lazy(() =>
  import("./pages/ComparePage").then((m) => ({ default: m.ComparePage })),
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);

// New feature pages — lazy loaded
const ReactivitySeriesPage = lazy(() =>
  import("./pages/ReactivitySeriesPage").then((m) => ({
    default: m.ReactivitySeriesPage,
  })),
);
const ReactionLabPage = lazy(() =>
  import("./pages/ReactionLabPage").then((m) => ({
    default: m.ReactionLabPage,
  })),
);
const PracticePage = lazy(() =>
  import("./pages/PracticePage").then((m) => ({ default: m.PracticePage })),
);
const CarbonPage = lazy(() =>
  import("./pages/CarbonPage").then((m) => ({ default: m.CarbonPage })),
);

// Advanced feature pages — lazy loaded
const FormulaPage = lazy(() =>
  import("./pages/FormulaPage").then((m) => ({ default: m.FormulaPage })),
);
const AtomTrackerPage = lazy(() =>
  import("./pages/AtomTrackerPage").then((m) => ({
    default: m.AtomTrackerPage,
  })),
);
const VirtualLabPage = lazy(() =>
  import("./pages/VirtualLabPage").then((m) => ({
    default: m.VirtualLabPage,
  })),
);
const MoleculesPage = lazy(() =>
  import("./pages/MoleculesPage").then((m) => ({ default: m.MoleculesPage })),
);
const ProgressPage = lazy(() =>
  import("./pages/ProgressPage").then((m) => ({ default: m.ProgressPage })),
);
const SmartFeaturesPage = lazy(() =>
  import("./pages/SmartFeaturesPage").then((m) => ({
    default: m.SmartFeaturesPage,
  })),
);
const MoleculeBuilderPage = lazy(() =>
  import("./pages/MoleculeBuilderPage").then((m) => ({
    default: m.MoleculeBuilderPage,
  })),
);
const ProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);

// Performance: any <img> tags in pages should use loading="lazy" for off-screen deferral
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        <div className="w-24 h-2 rounded-full bg-muted/40 animate-pulse" />
      </div>
    </div>
  );
}

function RootLayout() {
  const { location } = useRouterState();
  return (
    <Layout>
      <PageTransition routeKey={location.pathname}>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </PageTransition>
    </Layout>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Existing routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});

const periodicTableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/periodic-table",
  component: () => <PeriodicTablePage />,
});

const elementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/element/$symbol",
  component: () => <ElementDetailPage />,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: () => <SearchPage />,
});

const favoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/favorites",
  component: () => <FavoritesPage />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => <DashboardPage />,
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: () => <ComparePage />,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <AboutPage />,
});

// New feature routes
const reactivitySeriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reactivity-series",
  component: () => <ReactivitySeriesPage />,
});

const reactionLabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reaction-lab",
  component: () => <ReactionLabPage />,
});

const practiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/practice",
  component: () => <PracticePage />,
});

const carbonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/carbon",
  component: () => <CarbonPage />,
});

// Advanced feature routes
const formulaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/formulas",
  component: () => <FormulaPage />,
});

const atomTrackerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/atom-tracker",
  component: () => <AtomTrackerPage />,
});

const virtualLabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/virtual-lab",
  component: () => <VirtualLabPage />,
});

const moleculesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/molecules",
  component: () => <MoleculesPage />,
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: () => <ProgressPage />,
});

const smartFeaturesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/smart-features",
  component: () => <SmartFeaturesPage />,
});

const ExamModePage = lazy(() =>
  import("./pages/ExamModePage").then((m) => ({ default: m.ExamModePage })),
);

const examModeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exam-mode",
  component: () => <ExamModePage />,
});

const moleculeBuilderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/molecule-builder",
  component: () => <MoleculeBuilderPage />,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => <ProfilePage />,
});

const LoginPageLazy = lazy(() =>
  import("./pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);

const SignupPageLazy = lazy(() =>
  import("./pages/SignupPage").then((m) => ({ default: m.SignupPage })),
);

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <LoginPageLazy />,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: () => <SignupPageLazy />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  periodicTableRoute,
  elementRoute,
  searchRoute,
  favoritesRoute,
  dashboardRoute,
  compareRoute,
  aboutRoute,
  reactivitySeriesRoute,
  reactionLabRoute,
  practiceRoute,
  carbonRoute,
  formulaRoute,
  atomTrackerRoute,
  virtualLabRoute,
  moleculesRoute,
  progressRoute,
  smartFeaturesRoute,
  examModeRoute,
  moleculeBuilderRoute,
  profileRoute,
  loginRoute,
  signupRoute,
]);

const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
