import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Circle,
  ClipboardList,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type React from "react";
import { useAlerts, useStats } from "../hooks/useBackend";
import { formatDate } from "../lib/utils";
import type { PageName } from "../types";

interface DashboardProps {
  onNavigate: (page: PageName) => void;
}

// ── Stat Card ──────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number | undefined;
  icon: React.ReactNode;
  accent: string;
  bgAccent: string;
  isLoading: boolean;
  delay: string;
}

function StatCard({
  label,
  value,
  icon,
  accent,
  bgAccent,
  isLoading,
  delay,
}: StatCardProps) {
  return (
    <Card
      className="relative overflow-hidden border-border shadow-sm hover:shadow-md transition-smooth"
      style={{ animation: `fadeIn 0.4s ease-out ${delay} both` }}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-body leading-tight">
              {label}
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-1" />
            ) : (
              <p
                className={`text-3xl font-bold font-display tracking-tight ${accent}`}
              >
                {value ?? 0}
              </p>
            )}
          </div>
          <div className={`rounded-xl p-3 ${bgAccent}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Workflow Timeline ──────────────────────────────────────────────────────────

const workflowSteps = [
  { label: "Patient Registered", state: "done" },
  { label: "Vital Signs Recorded", state: "done" },
  { label: "Doctor Review Pending", state: "active" },
  { label: "Advice Given", state: "pending" },
  { label: "Follow-up Scheduled", state: "pending" },
] as const;

function WorkflowTimeline() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-base font-semibold text-foreground">
          Care Workflow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-0">
          {workflowSteps.map((step, i) => {
            const isLast = i === workflowSteps.length - 1;
            return (
              <li key={step.label} className="flex gap-3">
                {/* Dot + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 ${
                      step.state === "done"
                        ? "bg-teal-500"
                        : step.state === "active"
                          ? "bg-amber-400 ring-2 ring-amber-200"
                          : "bg-muted-foreground/25"
                    }`}
                  />
                  {!isLast && (
                    <div
                      className={`w-0.5 flex-1 my-0.5 ${
                        step.state === "done" ? "bg-teal-300" : "bg-border"
                      }`}
                      style={{ minHeight: "1.25rem" }}
                    />
                  )}
                </div>
                {/* Label */}
                <div className="pb-4 flex items-start gap-2">
                  <span
                    className={`text-sm leading-tight pt-0.5 ${
                      step.state === "done"
                        ? "text-teal-700 font-medium"
                        : step.state === "active"
                          ? "text-amber-700 font-semibold"
                          : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                  {step.state === "done" && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" />
                  )}
                  {step.state === "active" && (
                    <Circle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}

// ── Alert type label ───────────────────────────────────────────────────────────

function alertTypeLabel(type: string): string {
  switch (type) {
    case "high_bp":
      return "High BP";
    case "high_glucose":
      return "High Glucose";
    case "low_spo2":
      return "Low SpO2";
    case "abnormal_hr":
      return "Abnormal HR";
    default:
      return type.replace(/_/g, " ");
  }
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();

  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    pageRef.current?.classList.add("page-enter");
  }, []);

  const statCards = [
    {
      label: "Total Patients",
      value: stats?.totalPatients,
      icon: <Users className="w-5 h-5 text-teal-600" />,
      accent: "text-teal-700",
      bgAccent: "bg-teal-50",
      delay: "0ms",
    },
    {
      label: "Records Today",
      value: stats?.recordsToday,
      icon: <ClipboardList className="w-5 h-5 text-blue-600" />,
      accent: "text-blue-700",
      bgAccent: "bg-blue-50",
      delay: "60ms",
    },
    {
      label: "Pending Review",
      value: stats?.pendingReview,
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      accent: "text-amber-700",
      bgAccent: "bg-amber-50",
      delay: "120ms",
    },
    {
      label: "Active Alerts",
      value: stats?.activeAlerts,
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      accent: "text-red-700",
      bgAccent: "bg-red-50",
      delay: "180ms",
    },
  ];

  return (
    <div ref={pageRef} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Community health monitoring overview
        </p>
      </div>

      {/* Stat Cards */}
      <div
        className="grid grid-cols-2 gap-4 xl:grid-cols-4"
        data-ocid="dashboard-stats"
      >
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} isLoading={statsLoading} />
        ))}
      </div>

      {/* Main Grid: Alerts + Workflow */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Alerts Table */}
        <div className="lg:col-span-2" data-ocid="dashboard-alerts-table">
          <Card className="border-border shadow-sm h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                  <Bell className="w-4 h-4 text-red-500" />
                  Active Alerts
                  {(stats?.activeAlerts ?? 0) > 0 && (
                    <Badge className="bg-red-100 text-red-700 border border-red-200 text-xs px-1.5 py-0 font-mono">
                      {stats?.activeAlerts}
                    </Badge>
                  )}
                </CardTitle>
                <button
                  type="button"
                  onClick={() => onNavigate("alerts")}
                  className="text-xs text-teal-600 hover:text-teal-800 font-medium transition-colors"
                  data-ocid="dashboard-view-all-alerts"
                >
                  View all
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {alertsLoading ? (
                <div className="space-y-2 p-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-14 w-full rounded-md" />
                  ))}
                </div>
              ) : !alerts || alerts.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-12 text-center px-6"
                  data-ocid="dashboard-alerts-empty"
                >
                  <CheckCircle2 className="w-10 h-10 text-teal-400 mb-3" />
                  <p className="font-semibold text-foreground text-sm">
                    All clear
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No active alerts at this time
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                          Patient
                        </th>
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                          Alert
                        </th>
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide hidden sm:table-cell">
                          Village
                        </th>
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {alerts.map(
                        ({ alert, patientName, patientCode, village }) => (
                          <tr
                            key={alert.id}
                            className="hover:bg-muted/30 transition-colors"
                            data-ocid={`dashboard-alert-row-${alert.id}`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex flex-col min-w-0">
                                <span className="font-medium text-foreground truncate leading-tight">
                                  {patientName}
                                </span>
                                <span className="text-xs text-muted-foreground font-mono">
                                  {patientCode}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                <span className="text-red-700 font-medium text-xs leading-tight">
                                  {alertTypeLabel(alert.alertType)}
                                </span>
                              </span>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                {alert.message}
                              </p>
                            </td>
                            <td className="px-4 py-3 hidden sm:table-cell">
                              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                                <MapPin className="w-3 h-3 shrink-0" />
                                {village}
                              </span>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap">
                              {formatDate(alert.createdAt)}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Workflow Timeline */}
        <div data-ocid="dashboard-workflow">
          <WorkflowTimeline />
        </div>
      </div>
    </div>
  );
}
