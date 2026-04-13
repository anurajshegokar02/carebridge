import { r as reactExports, j as jsxRuntimeExports, i as ShieldCheck, a as Badge, f as formatDate, d as Button } from "./index-Duo5bLAA.js";
import { S as Skeleton } from "./skeleton-CCEOQ3Tw.js";
import { a as useAlerts, j as useResolveAlert } from "./useBackend-CmVVZSZL.js";
import { T as TriangleAlert } from "./triangle-alert-RuTA9BYn.js";
import { m as motion, A as AnimatePresence } from "./proxy-BdXCs-hx.js";
import { C as CircleCheck } from "./circle-check-BOWPMmp8.js";
import { M as MapPin } from "./map-pin-B2MWk6de.js";
import { C as Clock } from "./clock-CuF1mXjM.js";
function AlertTypeBadge({ alertType }) {
  const type = alertType.toLowerCase();
  if (type.includes("bp") || type.includes("blood"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200", children: "BP High" });
  if (type.includes("glucose") || type.includes("sugar"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200", children: "Glucose" });
  if (type.includes("spo2") || type.includes("oxygen"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200", children: "SpO2 Low" });
  if (type.includes("heart") || type.includes("hr"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200", children: "Heart Rate" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200", children: alertType });
}
function AlertSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-4 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-64" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-lg" })
  ] }) });
}
function ActiveAlerts({
  onAlertCountChange
}) {
  const { data: alerts = [], isLoading } = useAlerts();
  const resolveAlert = useResolveAlert();
  reactExports.useEffect(() => {
    onAlertCountChange(alerts.length);
  }, [alerts.length, onAlertCountChange]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "active-alerts-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Active Alerts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Unresolved health alerts requiring attention" })
      ] }),
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${alerts.length > 0 ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-teal-50 text-teal-700 border-teal-200"}`,
          "data-ocid": "alert-count-badge",
          children: alerts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
            alerts.length,
            " Active",
            " ",
            alerts.length === 1 ? "Alert" : "Alerts"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
            "All Clear"
          ] })
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "alerts-loading", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertSkeleton, {}, i)) }),
    !isLoading && alerts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-teal-300 bg-teal-50/40",
        "data-ocid": "alerts-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8 text-teal-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-teal-800 font-display", children: "No active alerts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-teal-600 mt-1", children: "All patients are stable — great work!" })
        ]
      }
    ),
    !isLoading && alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "alerts-list", children: alerts.map((item, index) => {
      const isResolving = resolveAlert.isPending && resolveAlert.variables === item.alert.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 16, height: 0, marginBottom: 0 },
          transition: { duration: 0.25, delay: index * 0.05 },
          className: "rounded-xl border border-orange-200 bg-orange-50/60 shadow-sm overflow-hidden",
          "data-ocid": `alert-banner-${item.alert.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-gradient-to-r from-orange-400 to-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-9 w-9 rounded-full bg-orange-100 border border-orange-200 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-orange-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground truncate", children: item.patientName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "font-mono text-xs bg-card border-border shrink-0",
                      "data-ocid": `patient-code-${item.alert.id}`,
                      children: item.patientCode
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTypeBadge, { alertType: item.alert.alertType })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-orange-800 mt-1 font-medium leading-snug", children: item.alert.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 shrink-0" }),
                    item.village
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 shrink-0" }),
                    formatDate(item.alert.createdAt)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  disabled: isResolving || resolveAlert.isPending,
                  onClick: () => resolveAlert.mutate(item.alert.id),
                  className: "shrink-0 border-orange-300 text-orange-700 hover:bg-orange-100 hover:border-orange-400 transition-colors duration-150",
                  "data-ocid": `resolve-btn-${item.alert.id}`,
                  children: isResolving ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "svg",
                      {
                        className: "animate-spin h-3.5 w-3.5",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "circle",
                            {
                              className: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              strokeWidth: "4"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              className: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            }
                          )
                        ]
                      }
                    ),
                    "Resolving…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
                    "Resolve"
                  ] })
                }
              )
            ] }) })
          ]
        },
        item.alert.id
      );
    }) }) })
  ] });
}
export {
  ActiveAlerts as default
};
