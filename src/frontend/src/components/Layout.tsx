import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import React from "react";
import { getRoleBadgeColor } from "../lib/utils";
import type { PageName, User } from "../types";
import { Sidebar } from "./Sidebar";

const PAGE_META: Record<PageName, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Overview of community health activity",
  },
  register: {
    title: "Register Patient",
    subtitle: "Add a new patient to the system",
  },
  patients: {
    title: "Patient List",
    subtitle: "Browse and manage all registered patients",
  },
  vitals: {
    title: "Enter Vitals",
    subtitle: "Record health vitals for a patient visit",
  },
  review: {
    title: "Doctor Review",
    subtitle: "Review and advise on pending health records",
  },
  alerts: {
    title: "Active Alerts",
    subtitle: "Unresolved health alerts requiring attention",
  },
  users: {
    title: "Manage Users",
    subtitle: "Administer system users and roles",
  },
  "my-records": {
    title: "My Health Records",
    subtitle: "View your personal health data and vitals history",
  },
  "doctor-panel": {
    title: "Doctor Panel",
    subtitle: "Your clinical workflow at a glance",
  },
  "admin-panel": {
    title: "Admin Panel",
    subtitle: "System overview and user management",
  },
  "visitor-panel": {
    title: "CareBridge",
    subtitle: "Community health monitoring platform",
  },
};

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
  currentUser: User | null;
  alertCount: number;
  onLogout: () => void;
}

export function Layout({
  children,
  currentPage,
  onNavigate,
  currentUser,
  alertCount,
  onLogout,
}: LayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const meta = PAGE_META[currentPage];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f8fafc" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            onNavigate(page);
            setMobileSidebarOpen(false);
          }}
          currentUser={currentUser}
          alertCount={alertCount}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileSidebarOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close navigation"
          />
          <div className="relative z-50">
            <Sidebar
              currentPage={currentPage}
              onNavigate={(page) => {
                onNavigate(page);
                setMobileSidebarOpen(false);
              }}
              currentUser={currentUser}
              alertCount={alertCount}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-60 min-w-0">
        {/* Topbar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 py-3.5 border-b"
          style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
          data-ocid="topbar"
        >
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h2
                className="text-base font-semibold text-foreground leading-tight truncate"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {meta.title}
              </h2>
              <p className="text-xs text-muted-foreground truncate hidden sm:block">
                {meta.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {currentUser.name}
                </span>
                <Badge
                  variant="outline"
                  className={`text-[10px] capitalize border ${getRoleBadgeColor(currentUser.role)}`}
                >
                  {currentUser.role}
                </Badge>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              data-ocid="btn-logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Logout</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 page-enter" key={currentPage}>
          {children}
        </main>

        {/* Footer */}
        <footer
          className="px-6 py-3 border-t text-center"
          style={{ backgroundColor: "#f1f5f9", borderColor: "#e2e8f0" }}
        >
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
