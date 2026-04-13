import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useAlerts, useResolveAlert } from "../hooks/useBackend";
import { formatDate } from "../lib/utils";

interface ActiveAlertsProps {
  onAlertCountChange: (count: number) => void;
}

function AlertTypeBadge({ alertType }: { alertType: string }) {
  const type = alertType.toLowerCase();
  if (type.includes("bp") || type.includes("blood"))
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
        BP High
      </span>
    );
  if (type.includes("glucose") || type.includes("sugar"))
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
        Glucose
      </span>
    );
  if (type.includes("spo2") || type.includes("oxygen"))
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
        SpO2 Low
      </span>
    );
  if (type.includes("heart") || type.includes("hr"))
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
        Heart Rate
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
      {alertType}
    </span>
  );
}

function AlertSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Skeleton className="h-8 w-8 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-64" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export default function ActiveAlerts({
  onAlertCountChange,
}: ActiveAlertsProps) {
  const { data: alerts = [], isLoading } = useAlerts();
  const resolveAlert = useResolveAlert();

  useEffect(() => {
    onAlertCountChange(alerts.length);
  }, [alerts.length, onAlertCountChange]);

  return (
    <div className="space-y-6" data-ocid="active-alerts-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            Active Alerts
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Unresolved health alerts requiring attention
          </p>
        </div>
        {!isLoading && (
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
              alerts.length > 0
                ? "bg-orange-50 text-orange-700 border-orange-200"
                : "bg-teal-50 text-teal-700 border-teal-200"
            }`}
            data-ocid="alert-count-badge"
          >
            {alerts.length > 0 ? (
              <>
                <AlertTriangle className="h-4 w-4" />
                {alerts.length} Active{" "}
                {alerts.length === 1 ? "Alert" : "Alerts"}
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                All Clear
              </>
            )}
          </div>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-3" data-ocid="alerts-loading">
          {[1, 2, 3].map((i) => (
            <AlertSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && alerts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-teal-300 bg-teal-50/40"
          data-ocid="alerts-empty-state"
        >
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-teal-600" />
          </div>
          <h3 className="text-lg font-semibold text-teal-800 font-display">
            No active alerts
          </h3>
          <p className="text-sm text-teal-600 mt-1">
            All patients are stable — great work!
          </p>
        </motion.div>
      )}

      {/* Alert list */}
      {!isLoading && alerts.length > 0 && (
        <AnimatePresence initial={false}>
          <div className="space-y-3" data-ocid="alerts-list">
            {alerts.map((item, index) => {
              const isResolving =
                resolveAlert.isPending &&
                resolveAlert.variables === item.alert.id;

              return (
                <motion.div
                  key={item.alert.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="rounded-xl border border-orange-200 bg-orange-50/60 shadow-sm overflow-hidden"
                  data-ocid={`alert-banner-${item.alert.id}`}
                >
                  {/* Orange top accent stripe */}
                  <div className="h-1 w-full bg-gradient-to-r from-orange-400 to-amber-400" />

                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-orange-100 border border-orange-200 shrink-0 mt-0.5">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Patient identity row */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground truncate">
                            {item.patientName}
                          </span>
                          <Badge
                            variant="outline"
                            className="font-mono text-xs bg-card border-border shrink-0"
                            data-ocid={`patient-code-${item.alert.id}`}
                          >
                            {item.patientCode}
                          </Badge>
                          <AlertTypeBadge alertType={item.alert.alertType} />
                        </div>

                        {/* Alert message */}
                        <p className="text-sm text-orange-800 mt-1 font-medium leading-snug">
                          {item.alert.message}
                        </p>

                        {/* Meta row */}
                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {item.village}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 shrink-0" />
                            {formatDate(item.alert.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Resolve button */}
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isResolving || resolveAlert.isPending}
                        onClick={() => resolveAlert.mutate(item.alert.id)}
                        className="shrink-0 border-orange-300 text-orange-700 hover:bg-orange-100 hover:border-orange-400 transition-colors duration-150"
                        data-ocid={`resolve-btn-${item.alert.id}`}
                      >
                        {isResolving ? (
                          <span className="flex items-center gap-1.5">
                            <svg
                              className="animate-spin h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            Resolving…
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Resolve
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
