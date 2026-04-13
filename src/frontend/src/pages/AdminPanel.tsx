import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useStats, useUsers } from "../hooks/useBackend";
import { formatDate, getRoleBadgeColor } from "../lib/utils";
import type { PageName } from "../types";

interface AdminPanelProps {
  onNavigate: (page: PageName) => void;
}

export default function AdminPanel({ onNavigate }: AdminPanelProps) {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: users, isLoading: usersLoading } = useUsers();

  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    pageRef.current?.classList.add("page-enter");
  }, []);

  const summaryCards = [
    {
      label: "Total Users",
      value: users?.length,
      icon: <Shield className="w-5 h-5 text-indigo-600" />,
      accent: "text-indigo-700",
      bg: "bg-indigo-50",
      isLoading: usersLoading,
    },
    {
      label: "Total Patients",
      value: stats?.totalPatients,
      icon: <Users className="w-5 h-5 text-teal-600" />,
      accent: "text-teal-700",
      bg: "bg-teal-50",
      isLoading: statsLoading,
    },
    {
      label: "Active Alerts",
      value: stats?.activeAlerts,
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      accent: "text-red-700",
      bg: "bg-red-50",
      isLoading: statsLoading,
    },
    {
      label: "Pending Reviews",
      value: stats?.pendingReview,
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      accent: "text-amber-700",
      bg: "bg-amber-50",
      isLoading: statsLoading,
    },
  ];

  return (
    <div ref={pageRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#0f172a" }}
        >
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            System overview and user management
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        className="grid grid-cols-2 gap-4 xl:grid-cols-4"
        data-ocid="admin-panel-stats"
      >
        {summaryCards.map((card, i) => (
          <Card
            key={card.label}
            className="border-border shadow-sm hover:shadow-md transition-smooth"
            style={{ animation: `fadeIn 0.4s ease-out ${i * 60}ms both` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground leading-tight">
                    {card.label}
                  </p>
                  {card.isLoading ? (
                    <Skeleton className="h-8 w-14 mt-1" />
                  ) : (
                    <p
                      className={`text-3xl font-bold font-display tracking-tight ${card.accent}`}
                    >
                      {card.value ?? 0}
                    </p>
                  )}
                </div>
                <div className={`rounded-xl p-3 ${card.bg}`}>{card.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3" data-ocid="admin-panel-actions">
        <Button
          onClick={() => onNavigate("users")}
          className="gap-2"
          style={{ backgroundColor: "#0f172a" }}
          data-ocid="btn-manage-users"
        >
          <Settings className="w-4 h-4" />
          Manage Users
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => onNavigate("patients")}
          className="gap-2 border-border"
          data-ocid="btn-view-all-patients-admin"
        >
          <Users className="w-4 h-4" />
          View All Patients
        </Button>
      </div>

      {/* User Summary Table */}
      <Card
        className="border-border shadow-sm"
        data-ocid="admin-panel-user-table"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-base font-semibold text-foreground flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: "#0d9488" }} />
              System Users
            </CardTitle>
            <button
              type="button"
              onClick={() => onNavigate("users")}
              className="text-xs font-medium transition-colors"
              style={{ color: "#0d9488" }}
              data-ocid="admin-panel-view-all-users"
            >
              Manage users
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {usersLoading ? (
            <div className="space-y-2 p-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : !users || users.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-10 text-center px-6"
              data-ocid="admin-panel-users-empty"
            >
              <Shield className="w-8 h-8 text-muted-foreground/40 mb-2" />
              <p className="font-semibold text-foreground text-sm">
                No users yet
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add users from the Manage Users page
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Name
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide hidden sm:table-cell">
                      Email
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Role
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-muted/30 transition-colors"
                      data-ocid={`admin-panel-user-row-${user.id}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                            style={{ backgroundColor: "#0d9488" }}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-foreground truncate">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-xs text-muted-foreground truncate max-w-[180px]">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`text-[10px] capitalize border ${getRoleBadgeColor(user.role)}`}
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
