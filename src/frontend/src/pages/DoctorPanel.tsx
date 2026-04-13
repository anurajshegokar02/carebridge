import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle2,
  ClipboardList,
  Clock,
  MapPin,
  Stethoscope,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useAlerts, useRecords, useStats } from "../hooks/useBackend";
import { formatDate } from "../lib/utils";
import type { PageName } from "../types";

interface DoctorPanelProps {
  onNavigate: (page: PageName) => void;
}

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

function statusColor(reviewed: boolean) {
  return reviewed
    ? "bg-teal-50 text-teal-700 border-teal-200"
    : "bg-amber-50 text-amber-700 border-amber-200";
}

export default function DoctorPanel({ onNavigate }: DoctorPanelProps) {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();
  const { data: records, isLoading: recordsLoading } = useRecords(false);

  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    pageRef.current?.classList.add("page-enter");
  }, []);

  const pendingRecords = (records ?? []).slice(0, 5);
  const activeAlerts = (alerts ?? [])
    .filter((a) => !a.alert.resolved)
    .slice(0, 5);

  const summaryCards = [
    {
      label: "Pending Reviews",
      value: stats?.pendingReview,
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      accent: "text-amber-700",
      bg: "bg-amber-50",
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
      label: "Total Patients",
      value: stats?.totalPatients,
      icon: <Users className="w-5 h-5 text-teal-600" />,
      accent: "text-teal-700",
      bg: "bg-teal-50",
      isLoading: statsLoading,
    },
  ];

  return (
    <div ref={pageRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#0d9488" }}
        >
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
            Doctor Panel
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your clinical workflow at a glance
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        data-ocid="doctor-panel-stats"
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
      <div className="flex flex-wrap gap-3" data-ocid="doctor-panel-actions">
        <Button
          onClick={() => onNavigate("review")}
          className="gap-2"
          style={{ backgroundColor: "#0d9488" }}
          data-ocid="btn-go-to-review"
        >
          <ClipboardList className="w-4 h-4" />
          Go to Review Queue
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => onNavigate("patients")}
          className="gap-2 border-border"
          data-ocid="btn-view-all-patients"
        >
          <Users className="w-4 h-4" />
          View All Patients
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Records Awaiting Review */}
        <Card
          className="border-border shadow-sm"
          data-ocid="doctor-panel-pending-records"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-amber-500" />
                Records Awaiting Review
                {(stats?.pendingReview ?? 0) > 0 && (
                  <Badge className="bg-amber-100 text-amber-700 border border-amber-200 text-xs px-1.5 py-0 font-mono">
                    {stats?.pendingReview}
                  </Badge>
                )}
              </CardTitle>
              <button
                type="button"
                onClick={() => onNavigate("review")}
                className="text-xs font-medium transition-colors"
                style={{ color: "#0d9488" }}
                data-ocid="doctor-panel-view-all-records"
              >
                View all
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recordsLoading ? (
              <div className="space-y-2 p-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            ) : pendingRecords.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-10 text-center px-6"
                data-ocid="doctor-panel-records-empty"
              >
                <CheckCircle2 className="w-8 h-8 text-teal-400 mb-2" />
                <p className="font-semibold text-foreground text-sm">
                  All caught up
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  No pending records to review
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {pendingRecords.map(
                  ({ record, patientName, patientCode, village }) => (
                    <li
                      key={record.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
                      data-ocid={`doctor-panel-record-${record.id}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground text-sm truncate">
                            {patientName}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-mono flex-shrink-0">
                            {patientCode}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          <span className="text-xs text-muted-foreground truncate">
                            {village}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ·
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {record.checkDate}
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={`text-[10px] ml-2 flex-shrink-0 border ${statusColor(record.reviewed)}`}
                      >
                        {record.reviewed ? "Reviewed" : "Pending"}
                      </Badge>
                    </li>
                  ),
                )}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card
          className="border-border shadow-sm"
          data-ocid="doctor-panel-alerts"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-500" />
                Active Alerts
                {activeAlerts.length > 0 && (
                  <Badge className="bg-red-100 text-red-700 border border-red-200 text-xs px-1.5 py-0 font-mono">
                    {activeAlerts.length}
                  </Badge>
                )}
              </CardTitle>
              <button
                type="button"
                onClick={() => onNavigate("alerts")}
                className="text-xs font-medium transition-colors"
                style={{ color: "#0d9488" }}
                data-ocid="doctor-panel-view-all-alerts"
              >
                View all
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {alertsLoading ? (
              <div className="space-y-2 p-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            ) : activeAlerts.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-10 text-center px-6"
                data-ocid="doctor-panel-alerts-empty"
              >
                <CheckCircle2 className="w-8 h-8 text-teal-400 mb-2" />
                <p className="font-semibold text-foreground text-sm">
                  All clear
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  No active alerts at this time
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {activeAlerts.map(({ alert, patientName, patientCode }) => (
                  <li
                    key={alert.id}
                    className="px-4 py-3 hover:bg-muted/30 transition-colors"
                    data-ocid={`doctor-panel-alert-${alert.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground text-sm truncate">
                            {patientName}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-mono">
                            {patientCode}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {alert.message}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-end gap-1">
                        <span className="inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="text-red-700 font-medium text-xs">
                            {alertTypeLabel(alert.alertType)}
                          </span>
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {formatDate(alert.createdAt)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
