import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createActor } from "./backend";
import { Layout } from "./components/Layout";
import { toNumber } from "./lib/utils";
import type { PageName, User } from "./types";

// Lazy-load pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const RegisterPatient = React.lazy(() => import("./pages/RegisterPatient"));
const PatientList = React.lazy(() => import("./pages/PatientList"));
const EnterVitals = React.lazy(() => import("./pages/EnterVitals"));
const DoctorReview = React.lazy(() => import("./pages/DoctorReview"));
const ActiveAlerts = React.lazy(() => import("./pages/ActiveAlerts"));
const ManageUsers = React.lazy(() => import("./pages/ManageUsers"));
const MyRecords = React.lazy(() => import("./pages/MyRecords"));
const DoctorPanel = React.lazy(() => import("./pages/DoctorPanel"));
const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));
const VisitorPanel = React.lazy(() => import("./pages/VisitorPanel"));

// Pages allowed per role
const ROLE_ALLOWED_PAGES: Record<User["role"], PageName[]> = {
  admin: [
    "admin-panel",
    "dashboard",
    "register",
    "patients",
    "vitals",
    "review",
    "alerts",
    "users",
  ],
  doctor: ["doctor-panel", "dashboard", "patients", "review", "alerts"],
  volunteer: ["dashboard", "register", "patients", "vitals", "alerts"],
  patient: ["my-records"],
  visitor: ["visitor-panel"],
};

function defaultPageForRole(role: User["role"]): PageName {
  if (role === "patient") return "my-records";
  if (role === "doctor") return "doctor-panel";
  if (role === "admin") return "admin-panel";
  if (role === "visitor") return "visitor-panel";
  return "dashboard";
}

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

  // Guarded navigate — patients can only go to my-records
  const handleNavigate = React.useCallback(
    (page: PageName) => {
      const role = (currentUser?.role ?? "visitor") as User["role"];
      const allowed = ROLE_ALLOWED_PAGES[role] ?? [];
      if (!allowed.includes(page)) return;
      setCurrentPage(page);
    },
    [currentUser],
  );

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
          const role = u.role as unknown as User["role"];
          const mapped: User = {
            id: toNumber(u.id),
            principal: u.principal.toString(),
            name: u.name,
            email: u.email,
            role,
            createdAt: toNumber(u.createdAt),
          };
          setCurrentUser(mapped);
          // Auto-navigate based on role
          setCurrentPage(defaultPageForRole(role));
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

  // Poll alert count (skip for patients — they have their own alert view)
  React.useEffect(() => {
    if (!actor || !isAuthenticated || currentUser?.role === "patient") return;
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
  }, [actor, isAuthenticated, currentUser?.role]);

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
    return (
      <React.Suspense fallback={<PageLoader />}>
        <VisitorPanel />
      </React.Suspense>
    );
  }

  // Patient ID for the patient self-view (from user.patientId if present)
  const patientId = currentUser?.patientId ?? null;

  const renderPage = () => {
    const role = (currentUser?.role ?? "visitor") as User["role"];
    const allowed = ROLE_ALLOWED_PAGES[role] ?? [];

    // Guard: if current page is not allowed for this role, show the default
    const safePage = allowed.includes(currentPage)
      ? currentPage
      : defaultPageForRole(role);

    switch (safePage) {
      case "doctor-panel":
        return <DoctorPanel onNavigate={handleNavigate} />;
      case "admin-panel":
        return <AdminPanel onNavigate={handleNavigate} />;
      case "visitor-panel":
        return <VisitorPanel />;
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
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
      case "my-records":
        return <MyRecords patientId={patientId} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  // Visitor-panel is full-page — no sidebar/layout chrome
  if (currentUser?.role === "visitor" || currentPage === "visitor-panel") {
    return (
      <React.Suspense fallback={<PageLoader />}>
        <VisitorPanel />
      </React.Suspense>
    );
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      currentUser={currentUser}
      alertCount={alertCount}
      onLogout={handleLogout}
    >
      <React.Suspense fallback={<PageLoader />}>{renderPage()}</React.Suspense>
    </Layout>
  );
}
