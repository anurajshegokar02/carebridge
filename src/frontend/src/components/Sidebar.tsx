import {
  Activity,
  Bell,
  Heart,
  HeartPulse,
  LayoutDashboard,
  ShieldCheck,
  Stethoscope,
  UserPlus,
  Users,
} from "lucide-react";
import type React from "react";
import { cn } from "../lib/utils";
import type { PageName, User } from "../types";

interface NavItem {
  id: PageName;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: User["role"][];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "doctor", "volunteer"],
  },
  {
    id: "register",
    label: "Register Patient",
    icon: UserPlus,
    roles: ["admin", "volunteer"],
  },
  {
    id: "patients",
    label: "Patient List",
    icon: Users,
    roles: ["admin", "doctor", "volunteer"],
  },
  {
    id: "vitals",
    label: "Enter Vitals",
    icon: Activity,
    roles: ["admin", "volunteer"],
  },
  {
    id: "review",
    label: "Doctor Review",
    icon: Stethoscope,
    roles: ["admin", "doctor"],
  },
  {
    id: "alerts",
    label: "Active Alerts",
    icon: Bell,
    roles: ["admin", "doctor", "volunteer"],
  },
  {
    id: "users",
    label: "Manage Users",
    icon: ShieldCheck,
    roles: ["admin"],
  },
  {
    id: "my-records",
    label: "My Health Records",
    icon: HeartPulse,
    roles: ["patient"],
  },
];

interface SidebarProps {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
  currentUser: User | null;
  alertCount: number;
}

export function Sidebar({
  currentPage,
  onNavigate,
  currentUser,
  alertCount,
}: SidebarProps) {
  const userRole = currentUser?.role ?? "volunteer";

  const visibleItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(userRole as User["role"]),
  );

  return (
    <aside
      className="fixed left-0 top-0 h-full w-60 flex flex-col z-30"
      style={{ backgroundColor: "#0f172a" }}
      data-ocid="sidebar-nav"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#0d9488" }}
        >
          <Heart className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1
            className="text-white font-semibold text-base leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CareBridge
          </h1>
          <p className="text-white/40 text-[10px] uppercase tracking-widest leading-tight">
            Health Monitor
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {visibleItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          const isAlerts = item.id === "alerts";

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onNavigate(item.id)}
              data-ocid={`nav-${item.id}`}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left group relative",
                isActive
                  ? "text-teal-300 bg-teal-500/15 border border-teal-500/20"
                  : "text-white/60 hover:text-white/90 hover:bg-white/8",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0 transition-colors",
                  isActive
                    ? "text-teal-400"
                    : "text-white/40 group-hover:text-white/70",
                )}
              />
              <span className="flex-1 truncate">{item.label}</span>
              {isAlerts && alertCount > 0 && (
                <span className="flex-shrink-0 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {alertCount > 99 ? "99+" : alertCount}
                </span>
              )}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-teal-400 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User info footer */}
      {currentUser && (
        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
              style={{ backgroundColor: "#0d9488" }}
            >
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white/90 text-xs font-medium truncate">
                {currentUser.name}
              </p>
              <p className="text-white/40 text-[10px] capitalize">
                {currentUser.role}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
