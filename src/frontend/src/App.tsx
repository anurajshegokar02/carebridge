import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createActor } from "./backend";
import { Layout } from "./components/Layout";
import { toNumber } from "./lib/utils";
import Login from "./pages/Login";
import type { PageName, User } from "./types";

// Lazy-load pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const RegisterPatient = React.lazy(() => import("./pages/RegisterPatient"));
const PatientList = React.lazy(() => import("./pages/PatientList"));
const EnterVitals = React.lazy(() => import("./pages/EnterVitals"));
const DoctorReview = React.lazy(() => import("./pages/DoctorReview"));
const ActiveAlerts = React.lazy(() => import("./pages/ActiveAlerts"));
const ManageUsers = React.lazy(() => import("./pages/ManageUsers"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const { identity, loginStatus, clear } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = React.useState<PageName>("dashboard");
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [userLoading, setUserLoading] = React.useState(false);
  const [alertCount, setAlertCount] = React.useState(0);
  const [seedDone, setSeedDone] = React.useState(false);

  const isAuthenticated = loginStatus === "success" && !!identity;

  // Fetch current user once actor is ready and authenticated
  React.useEffect(() => {
    if (!actor || actorFetching || !isAuthenticated) return;

    let cancelled = false;

    const init = async () => {
      setUserLoading(true);
      try {
        // Seed demo data once per session
        if (!seedDone) {
          try {
            await actor.seedDemoData();
          } catch {
            /* ignore */
          }
          setSeedDone(true);
        }

        const u = await actor.getCurrentUser();
        if (!cancelled && u) {
          setCurrentUser({
            id: toNumber(u.id),
            principal: u.principal.toString(),
            name: u.name,
            email: u.email,
            role: u.role as unknown as User["role"],
            createdAt: toNumber(u.createdAt),
          });
        }
      } catch {
        // user may not be registered yet
      } finally {
        if (!cancelled) setUserLoading(false);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [actor, actorFetching, isAuthenticated, seedDone]);

  // Poll alert count
  React.useEffect(() => {
    if (!actor || !isAuthenticated) return;
    const fetchAlerts = async () => {
      try {
        const alerts = await actor.getAlerts();
        setAlertCount(alerts.length);
      } catch {
        /* ignore */
      }
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30_000);
    return () => clearInterval(interval);
  }, [actor, isAuthenticated]);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    setCurrentUser(null);
    setCurrentPage("dashboard");
    setSeedDone(false);
    setAlertCount(0);
  };

  // Show loading while auth is resolving
  if (loginStatus === "logging-in" || (isAuthenticated && userLoading)) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
        <p className="text-white/50 text-sm">Loading CareBridge...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => {}} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      case "register":
        return <RegisterPatient />;
      case "patients":
        return <PatientList />;
      case "vitals":
        return <EnterVitals />;
      case "review":
        return <DoctorReview />;
      case "alerts":
        return <ActiveAlerts onAlertCountChange={setAlertCount} />;
      case "users":
        return <ManageUsers />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      currentUser={currentUser}
      alertCount={alertCount}
      onLogout={handleLogout}
    >
      <React.Suspense fallback={<PageLoader />}>{renderPage()}</React.Suspense>
    </Layout>
  );
}
